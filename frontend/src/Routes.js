import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import ActivateAccount from './components/auth/Activate';

const Routes = ({ children }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/auth/activate/:token' component={ActivateAccount} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
