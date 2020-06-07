import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route component={Home} path='/' exact />
      <Route component={CreatePoint} path='/create' />
    </BrowserRouter>
  );
}

export default Routes;
