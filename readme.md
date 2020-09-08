# Quick Info

# Naming Convention

It's kinda simple:
- for directories naming use `kebab-case` (e.g. `first-page`)
- for React layout files use `PascalCase` (e.g. `UserListLayout.tsx`)
- for anything else use `camelCase` (e.g. `index.tsx`, `styles.tsx`)
> I know that for camelCase is kinda dumb answer but hopefully I'll update it later

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
      /index.tsx
      /styles.tsx
      /types.tsx
        /{subcomponent}
```

There are two main folders for components, `/pages` and `/components`.

## /pages

This directory contains all pages that were divided by url
`https://example.com/firstpage or https://example.com/secondpage`

A page may contain child pages (domains that are only used by or relevant to their parent page).
These will follow the same structure as their parent.

### Why?

Keeping structure like this will allow us to easily find problems on page.
I'm steel not entirely sure about context structure for each page (it will eventually happen). I'll update
structure accordingly to my experience.

## /components

This directory contains all the React shared components.

Each component has it's own directory, with a component file, a styles file, and its typings and tests (not rn btw). It ALWAYS has an `index.tsx` that exports the component.

A component can have child components or subcomponents (components that are only used by or relevant to their parent component).
Tehse will follow the same structure as their parent.

### Why?
Why do we need that annoying `index.tsx` file??

As the application grows, components grow with them. Sometimes a component needs to be split into smaller components
with different responsabilities. When this happens sometimes a container is better off as a regular component with
child containers instead

# TypeScript Guidelines

> Most of the information has been taken from https://github.com/typescript-cheatsheets/react this repo. Check full out!

Here you can find best (in my opinion) practice for using Typescript with React and styled components.

## Typing defaultProps and propTypes

For TypeScript 3.0+, type inference [should work](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html), although [some edge cases are still problematic](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/61). Just type your props like normal, except don't use `React.FC`.

```tsx
type GreetProps = { age: number } & typeof defaultProps;
const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  /*...*/
};
Greet.defaultProps = defaultProps;
```

## Typing for styled components

It's kind like for components:
```tsx
type ButtonProps = {
  primary: boolean;
};

const Button = styled.TouchableOpacity<ButtonProps>`
  opacity: ${(props) => (props.primary ? 0.5 : 1)};
`;
```

it will require you always pass props `(e.g primary)` but you can't do `defaultProps` as in the example above because TypeScript not yet support it.

## Types or Interfaces?

`interface`s are different from `type`s in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

You can read more about the reasoning behind this rule of thumb in [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

## Basic Prop Types Examples

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** any object as long as you dont use its properties (not common) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with defined properties (preferred) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

Notice we have used the TSDoc `/** comment */` style here on each prop.

## Hooks

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031).

**useState**

Type inference works very well most of the time:

```tsx
const [val, toggle] = React.useState(false); // `val` is inferred to be a boolean, `toggle` only takes booleans
```

See also the [Using Inferred Types](#using-inferred-types) section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:

```tsx
const [user, setUser] = React.useState<IUser | null>(null);

// later...
setUser(newUser);
```
