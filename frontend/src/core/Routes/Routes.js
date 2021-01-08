
import React from 'react';
import App from '../../App';
import AdminRoute from './Admin.route';
import PrivateRoute from './Private.route';
import Admin from '../../components/profile/Admin';
import Login from '../../components/auth/login/Login';
import Profile from '../../components/profile/Profile';
import Signup from '../../components/auth/signup/Signup';
import ActivateAccount from '../../components/auth/Activate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ForgetPassword from '../../components/auth/ForgetPassword';
import Email from '../../components/auth/Email';
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/auth/activate/:token' component={ActivateAccount} />
        <Route path='/auth/password/reset/:token' component={ForgetPassword} />
        <Route path='/auth/password/reset' component={Email} />
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
