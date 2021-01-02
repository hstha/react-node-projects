import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Layout from '../../../core/Layout.hoc';
import ServiceAPI from '../../../utils/fetch.api';
import { BACKEND_API } from '../../../app.constant';
import formData from './loginForm.data.json';

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const stateKey = e.target.name;
    const stateValue = e.target.value;
    setValue({ ...value, [stateKey]: stateValue });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    ServiceAPI.post(`${BACKEND_API}/login`, value)
      .then(result => {
        if (!result.success) {
          throw result;
        }

        toast.success(result.message);
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);
      })
  }

  const LogInForm = () => (
    <form onSubmit={onSubmitHandler}>
      {
        formData.map(data => {
          const { id, label, name, type } = data;
          return (
            <div key={id} className="form-group">
              <label htmlFor={data.name} className='text-muted'>{label}</label>
              <input
                type={type}
                name={name}
                className='form-control'
                required={true}
                onChange={onChangeHandler}
                value={value[name]}
              />
            </div>
          )
        })
      }
      <div>
        <button className='btn btn-primary' type='submit'>Sign up</button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1 className='p-5 text-center'>Login</h1>
        <LogInForm />
      </div>
    </Layout>
  );
}

export default Login;
