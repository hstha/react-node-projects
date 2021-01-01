import React, { Fragment } from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      <div className='container'>
        {children}
      </div>
    </Fragment>
  )
}

export default Layout;