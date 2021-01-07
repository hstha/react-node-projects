const sgMail = require('@sendgrid/mail');
const { EMAIL_API, CLIENT_URL, EMAIL_FROM } = require('../app.constant');

sgMail.setApiKey(EMAIL_API);

class Email {
  static getAccountActivationMail({ to, token }) {
    return {
      to: to,
      from: EMAIL_FROM, // Change to your verified sender
      subject: 'Account activation',
      text: 'Activation mail',
      html: `
        <h1>Verify your account</h1>
        <a href="${CLIENT_URL}/auth/activate/${token}">${token}</a>
      `,
    }
  }

  static getForgetPasswordMail({ to, token }) {
    return {
      to: to,
      from: EMAIL_FROM, // Change to your verified sender
      subject: 'Reset Password',
      text: 'Reset Password',
      html: `
        <h1>Click here to reset password</h1>
        <a href="${CLIENT_URL}/auth/password/reset/${token}">${token}</a>
      `,
    }
  }

  static send(msg) {
    return (sgMail.send(msg))
  }
}

module.exports = Email;