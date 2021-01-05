import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BACKEND_API } from '../../../app.constant';

import Layout from '../../../core/Layout.hoc';
import Authentication from '../../../utils/Authentication.helper';
import ServiceAPI from '../../../utils/fetch.api';
import formData from './signupForm.data.json';

const Signup = ({ user }) => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { isLoggedIn } = user;

  const onChangeHandler = (e) => {
    const stateKey = e.target.name;
    const stateValue = e.target.value;
    setValue({ ...value, [stateKey]: stateValue });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    ServiceAPI.post(`${BACKEND_API}/signup`, value)
      .then(result => {
        if (!result.success) {
          throw result;
        }
        setValue({ name: '', email: '', password: '' });
        toast.success(result.message);
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);
      })
  }

  const SignUpForm = () => (
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
  );

  if (isLoggedIn) {
    return <Redirect to='/login' />
  }

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <h1 className='p-5 text-center'>Signup</h1>
        <SignUpForm />
      </div>
    </Layout>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Signup);
