import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navigation = ({ match }) => {
  const isActive = path => {
    if (match.path === path) {
      return true;
    }

    return false;
  }
  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link className={`nav-link ${isActive('/') ? 'active' : 'text-light'}`} to='/'>Home</Link>
      </li>
      <li className='nav-item'>
        <Link className={`nav-link ${isActive('/signup') ? 'active' : 'text-light'}`} to='/signup'>Signup</Link>
      </li>
      <li className='nav-item'>
        <Link className={`nav-link ${isActive('/login') ? 'active' : 'text-light'}`} to='/login'>Login</Link>
      </li>
    </ul>
  )
}

export default withRouter(Navigation);