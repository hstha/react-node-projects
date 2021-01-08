import React, { useState } from 'react'
import Layout from '../../core/Layout.hoc';
import ServiceAPI from '../../utils/fetch.api';
import { BACKEND_API } from '../../app.constant';
import { toast } from 'react-toastify';

const Email = () => {
  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    ServiceAPI.post(`${BACKEND_API}/forget-password`, { email })
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
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          type="email"
          name='email'
          className="form-control"
          required={true}
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Send Reset Link
				</button>
      </div>
    </form>
  );



  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5 text-center">Reset Email</h1>
        {formData}
      </div>
    </Layout>
  );
}

export default Email;