import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Authentication from '../utils/Authentication.helper';

const Navigation = ({ match, history }) => {
  const isActive = path => {
    if (match.path === path) {
      return true;
    }

    return false;
  }

  const user = Authentication.getUser();

  const logout = () => {
    Authentication.remove();
    history.push('/');
  }

  return (
    <nav className='bg-primary'>
      <ul className='nav nav-tabs container'>
        <li className='nav-item'>
          <Link className={`nav-link ${isActive('/') ? 'active' : 'text-light'}`} to='/'>Home</Link>
        </li>
        {
          !user
            ?
            <Fragment>
              <li className='nav-item'>
                <Link className={`nav-link ${isActive('/signup') ? 'active' : 'text-light'}`} to='/signup'>Signup</Link>
              </li>
              <li className='nav-item'>
                <Link className={`nav-link ${isActive('/login') ? 'active' : 'text-light'}`} to='/login'>Login</Link>
              </li>
            </Fragment>
            :
            <Fragment>
              <li className='nav-item'>
                <Link className={`nav-link ${isActive('/profile') ? 'active' : 'text-light'}`} to='/profile'>Profile</Link>
              </li>
              {
                user.role === 'admin' && (
                  <li className='nav-item'>
                    <Link className={`nav-link ${isActive('/admin') ? 'active' : 'text-light'}`} to='/admin'>Admin</Link>
                  </li>
                )
              }
              <li className='nav-item float-right'>
                <span className='nav-link' onClick={logout}>Log Out</span>
              </li>
            </Fragment>
        }
      </ul>
    </nav>
  )
}

export default withRouter(Navigation);