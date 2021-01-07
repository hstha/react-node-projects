import React from 'react'

const ForgetPassword = ({ match }) => {
  console.log('match ', match.params['token']);

  function submitHandler(e) {
    e.preventDefault();
  }

  const formData = (
    <form onSubmit={submitHandler}>

    </form>
  )

  return null;
}

export default ForgetPassword;