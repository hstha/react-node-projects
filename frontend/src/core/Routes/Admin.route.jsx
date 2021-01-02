import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Authentication from '../../utils/Authentication.helper';

const renderPrivateRoute = (children, location) => {
  if (Authentication.getUser() && Authentication.getUser().role === 'admin') {
    return children;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: location
          }
        }}
      />)
  }
}

const AdminRoute = ({ children, ...rest }) => (
  <Route {...rest} render={({ location }) => renderPrivateRoute(children, location)} />
);

export default AdminRoute;