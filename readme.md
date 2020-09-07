# Directory Structure

The sources of the project follows this structure:

```
/src
  /pages
    /{singlePage}
      /index.tsx
      /styles.tsx
      /types.tsx
      /{subcomponent}
        /index.tsx
        /styles.tsx
        /types.tsx
  /components
    /{component}
      /{component}.tsx
      /{component}.styles.tsx
      /{component}.types.tsx
        /{subcomponent}
```

There are two main branches, `/pages` and `/components`.
```
UPDATE AFTER THIS LINE
```

## /app

This directory contains all the redux modules of the application.

It follows a domain driven structure, where each domain of the application will be represented as a directory,
and all the actions (action types, action creators, and thunks), reducers and selectors (and all their test specs and typings)
for that specific domain will live inside.

A domain may contain child domains or subdomains (domains that are only used by or relevant to their parent domain).
These will follow the same structure as their parent.

The strutures of the application's redux state tree and the `/app` directory tree must be very similar if done right.
This will make debugging more intuitive and onboarding new developers easier.

### Why?!

Usually when a bug is found, or a refactor is needed, it involves all the redux parts in a domain:
changing an action may impact on the reducer, that may also impact on the selectors if the shape of the state is affected,
thus requiring updates on the test specs for the three of them, and the typings as well.

Keeping all the parts together makes refactoring/fixing/updating code easier. Also, at some point some part of a domain
may need to be shared accross projects (ie, the User domain might be shared between apps that use the same authentication system),
it is very straight forward to extract a domain as a separate package when all the parts (and their dependencies)
live under the same directory.

## /components

This directory contains all the React components.

Each component has it's own directory, with a component file, a styles file, and its typings and tests. It ALWAYS has an `index.ts` that exports the component.
A component may also have a `.container.ts` file which basically consist of the `mapState` and `mapDispatch` functions,
and returns the connected HOC.

A component can have child components or subcomponents (components that are only used by or relevant to their parent component).
Tehse will follow the same structure as their parent.

### Why?!

Why don't we have a separate `/components` and `/containers` folders like everyone else?

Why do we need that annoying `index.ts` file??

As the application grows, components grow with them. Sometimes a component needs to be split into smaller components
with different responsabilities. When this happens sometimes a container is better off as a regular component with
child containers instead:

For example, take this components:

```jsx
<Container>
  <ComponentA />
  <ComponentB />
  <ComponentC />
</Container>
```

Say `<Container>` is now mapping +20 props, that passes down to the three children components, that also pass
them down to their children components.

Having so many props and following them down the component tree can make the code difficult to debug and also
makes refactors more painful, so it might be smarter to connect the child components in this case and leave the
parent and a regular component:

```jsx
<Component>
  <ContainerA />
  <ContainerB />
  <ContainerC />
</Component>
```

Now these three containers have a smaller mapped surface than the +20 props parent, and props are not passed downs
several steps.

This is also more performant since now a change in the store might trigger a re-render of a single container,
instead of re-rendering the only parent container with its three children.

Now, since each component has a `.container.ts` file we can just copy the parent's one to each of the children's
directory, and strip out the unnecesary props.

Now it's when that `index.ts` file pays off, on the children components we just point it from the component file,
to the `.container.ts` file, and we do the oposite on the parent component. And everything keeps working as before,
but we have cleaner, more performant code. Easy refactor.

This helps the application to stay healthy and scalable as it grows.

Having the `.container.ts` separated from the component itself makes the component easier to test (we just need to test the un-connected component, no need to mock a redux store). And also makes it easy to mock data and develop components when the redux modules that it uses are not ready yet (you just mock the `mapState` and `mapDispatch` results).

# TypeScript Guidelines

Each component must have a `types.ts` with the following structure:

```tsx
// Component

// these are all the optional props
export interface IDefaultProps {
  width: number;
  height: number;
}

// these are all the required props
export interface IProps extends Partial<IDefaultProps> {
  id: string;
  title: string;
  onClick: () => any;
}

export interface IState {
  // this might not be needed if the component doesn't have internal state
}

export interface IContext {
  // this might not be needed if the component doesn't consume the context
}

// Container

export type StateProps = Pick<IProps, 'title' | 'width' | 'height'>;
export type OwnProps = Pick<IProps, 'id'>;
export type DispatchProps = Pick<IProps, 'onClick'>;
```

Usage
=====

**Component**

```tsx
import React, { PureComponent } from 'react';
import { IProps, IDefaultProps, IState, IContext } from './types';

export default class MyComponent extends PureComponent<IProps, IState> {

  static defaultProps: IDefaultProps {
    width: 600,
    height: 400
  }

  context: IContext // only if needed

  render() {
    const { title, width, height, onClick } = this.props;
    return (
      <div style={{ width, height }} onClick={onClick}>{title}</div>
    );
  }
}

```

**Container**

```tsx
import MyComponent from './MyComponent';
import { getThing } from 'app/thing/selectors';
import { OwnProps, StateProps, DispatchProps } from './types';
import { IStore } from "app/types";

export const mapState = (state: IStore, { id }: OwnProps): StateProps => {
  const thing = getThing(state, id);
  return {
    title: thing.title,
    width: thing.width,
    height: thing.height
  };
};

export const mapDispatch = (dispatch, { id }: OwnProps): DispatchProps => ({
  onClick: () => console.log(`you clicked ${id}`)
});

export default connect(mapState, mapDispatch)(MyComponent);
```

**App**

```tsx
import React, { PureComponent } from 'react';
import MyComponent from 'components/MyComponent';

export default class App extends PureComponent {
  render() {
    return <MyComponent id={5}/>
  }
}
```

## Why?!

Notice that all the properties in `IDefaultProps` are mandatory, and this is intended, so if we add a prop to the component that is optional, that means that it **MUST** have a default value. So once we add a new property to the `IDefaultProps` interface, TypeScript is not going to let us compile until we go to the component and add a default value to it.

Making all the props required in the `IDefaultProps` is not an issue in the final `IProps` interface because we extend `Partial<IDefaultProps>` which turns them all into optional properties, so the final interface will only mark as required the properties extended by `IProps`.

To type the `mapStateToProps` and `mapDispatchToProps` functions in the container we want to export types created by using `Pick`. In some cases (when ALL the component's props come from the state) the `StateProps` will match `IProps`. In this case we can reuse `IProps` instead of creating `StateProps`. Also some components don't have own props or don't map any prop to `dispatch`, in those cases there's no point in exporting `OwnProps` or `DispatchProps`.

To type the internal state and the context we will export interfaces named `IState` and `IContext`.
