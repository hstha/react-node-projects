const jwt = require('jsonwebtoken');
const sendGridMail = require('@sendgrid/mail');

const User = require('../models/user.model');
const { EMAIL_API, ACCOUNT_ACTIVATION_KEY, EMAIL_VALIDATION_TIME, EMAIL_FROM, CLIENT_URL } = require('../app.constant');

sendGridMail.setApiKey(EMAIL_API);

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      res.status(400).json({
        success: false,
        message: 'Email is already taken',
        data: null
      });

      return;
    }

    const token = jwt.sign({ name, email, password }, ACCOUNT_ACTIVATION_KEY, { expiresIn: EMAIL_VALIDATION_TIME });

    const emailData = {
      from: EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <a href="${CLIENT_URL}/auth/activate/${token}">${token}</a>
        <hr />
        <p>This email contains sensetive information</p>
      `
    }

    sendGridMail.send(emailData)
      .then(response => {
        console.log('sign up sent', response);
        res.json({
          success: true,
          message: 'Please verify your email to register'
        });
      })
      .catch(err => {
        return err;
      });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to process the request',
      data: err
    });
  }
}

exports.login = (req, res, next) => {
  res.json({
    data: 'you hit the login api'
  });
};