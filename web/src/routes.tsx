import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path={`${process.env.PUBLIC_URL}/`} exact />
      <Route component={CreatePoint} path={`${process.env.PUBLIC_URL}/create`} />
    </BrowserRouter>
  );
}

export default Routes;
