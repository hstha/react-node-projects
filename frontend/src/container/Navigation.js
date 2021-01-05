import { connect } from "react-redux";
import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Authentication from '../utils/Authentication.helper';
import { RESET_USER_STORE } from "../store/actions/types";
import { resetUserStore } from "../store/actions/userActions";

const Navigation = ({ match, history, user, resetUserStore }) => {
  const isActive = path => {
    if (match.path === path) {
      return true;
    }

    return false;
  }

  const { isLoggedIn, role } = user;

  const logout = () => {
    Authentication.remove();
    resetUserStore();
    history.push('/');
  }

  return (
    <nav className='bg-primary'>
      <ul className='nav nav-tabs container'>
        <li className='nav-item'>
          <Link className={`nav-link ${isActive('/') ? 'active' : 'text-light'}`} to='/'>Home</Link>
        </li>
        {
          !isLoggedIn
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
                role === 'admin' && (
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

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = dispatch => ({
  resetUserStore: () => dispatch(resetUserStore())
})

export default connect(mapStateToProps, mapActionToProps)(withRouter(Navigation));