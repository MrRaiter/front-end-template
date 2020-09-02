import React, { lazy, Suspense } from 'react';
import {
  Route, Switch, BrowserRouter,
} from 'react-router-dom';
import WeatherContextProvider from './context/index';
import GlobalStyles from './GlobalStyles';

const FirstPage = lazy(() => import('./pages/first-page'));
const SecondPage = lazy(() => import('./pages/second-page'));

const App = () => (
  <WeatherContextProvider>
    <GlobalStyles />
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route path="/:name" component={SecondPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  </WeatherContextProvider>
);

export default App;
