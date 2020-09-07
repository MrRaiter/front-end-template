import React, { lazy, Suspense } from 'react';
import {
  Route, Switch, BrowserRouter,
} from 'react-router-dom';
import UserContextProvider from './context/UserContext';
import GlobalStyles from './GlobalStyles';

// We use React.lazy to improve overall app perfomance
// We divide whole react bundle on sub bundles
// Basically lazy downloads page on demand
const FirstPage = lazy(() => import('./pages/first-page'));
const SecondPage = lazy(() => import('./pages/second-page'));

const App = () => (
  <UserContextProvider>
    <GlobalStyles />
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <Switch>
          <Route path="/user" component={SecondPage} />
          <Route path="/" component={FirstPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  </UserContextProvider>
);

export default App;
