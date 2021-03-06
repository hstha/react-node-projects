import React, { useState } from 'react'
import Layout from '../../core/Layout.hoc';
import ServiceAPI from '../../utils/fetch.api';
import { BACKEND_API } from '../../app.constant';
import { toast } from 'react-toastify';

const ForgetPassword = ({ match }) => {
  function submitHandler(e) {
    e.preventDefault();
    const token = match.params['token'];
    const password = e.target.password.value;
    ServiceAPI.put(`${BACKEND_API}/reset-password`, { resetPasswordLink: token, newPassword: password })
      .then(result => {
        if (!result.success) {
          throw result;
        }

        toast.success(result.message);
      })
      .catch(err => {
        toast.error(err.message);
      })
  }

  const formData = (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          Password
        </label>
        <input
          type="password"
          name='password'
          className="form-control"
          required={true}
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Reset Password
				</button>
      </div>
    </form>
  );



  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5 text-center">Reset Password</h1>
        {formData}
      </div>
    </Layout>
  );
}

export default ForgetPassword;