import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import Navigation from "../container/Navigation";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navigation />
      <div className='container'>
        {children}
      </div>
    </Fragment>
  )
}

export default Layout;