import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link className='text-light nav-link' href='/'>Home</Link>
      </li>
    </ul>
  )
}

export default Navigation;