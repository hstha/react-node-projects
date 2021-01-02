import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../core/Layout.hoc';
import ServiceAPI from '../../utils/fetch.api';
import { BACKEND_API } from '../../app.constant';

const ActivateAccount = ({ match }) => {
  const [value, setValue] = useState({
    name: '',
    token: '',
    redirect: false
  });

  const { name, token, redirect } = value;

  React.useEffect(() => {
    const token = match.params['token'];
    const { name } = jwt.decode(token);

    setValue({ ...value, name, token });
  }, []);

  const onSubmit = () => {
    ServiceAPI.post(`${BACKEND_API}/activate-account`, { token })
      .then(result => {
        if (!result.success) {
          throw result;
        }

        toast.success(result.message);
      })
      .catch(err => {
        toast.success(err.message);
      })
      .finally(() => {
        setValue({ ...value, redirect: true });
      })
  }

  return (
    <Layout>
      {
        redirect
          ?
          <Redirect to='/' />
          :
          <div className='col-md-6 offset-md-3'>
            <div className="text-center">
              <h1 className='p-5'>Hey {name}, Click button to register your account</h1>
              <button className="btn btn-outline-primary" onClick={onSubmit}>
                Activate Account
            </button>
            </div>
          </div>
      }
    </Layout>
  );
}

export default ActivateAccount;
