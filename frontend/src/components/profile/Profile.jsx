import React, { useState } from 'react'
import Layout from '../../core/Layout.hoc'
import formData from './profileForm.data.json';

const Profile = () => {
  const [state, setState] = useState(() => ({
    role: 'subscriber',
    name: 'Heriz',
    email: 'shresthaheriz14@gmail.com',
    password: '123456789'
  }));

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const { role, name } = state;
  const profileForm = (
    <form>
      {
        formData.map(data => {
          const { label, name, type, id, disabled } = data;
          return (
            <div key={id} className="form-group">
              <label htmlFor={name} className='text-muted'>{label}</label>
              <input
                type={type}
                name={name}
                className='form-control'
                value={state[name]}
                disabled={Boolean(disabled)}
                onChange={onChange}
              />
            </div>
          )
        })
      }
      <div>
        <button className='btn btn-primary' type='submit'>Update</button>
      </div>
    </form>
  )
  return (
    <Layout>
      <h1>Profile Page</h1>
      <span>{`Hey ${name} (${role})`}</span>
      <br />
      <span>Update Profile</span>
      {profileForm}
    </Layout>
  )
}

export default Profile;