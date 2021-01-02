
import App from '../../App';
import React from 'react';
import PrivateRoute from './Private.route';
import Login from '../../components/auth/login/Login';
import Signup from '../../components/auth/signup/Signup';
import Profile from '../../components/profile/Profile';
import ActivateAccount from '../../components/auth/Activate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from '../../components/profile/Admin';
import AdminRoute from './Admin.route';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/auth/activate/:token' component={ActivateAccount} />
        <PrivateRoute path='/profile'>
          <Profile />
        </PrivateRoute>
        <AdminRoute path='/admin'>
          <Admin />
        </AdminRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
