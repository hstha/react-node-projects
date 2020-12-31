const jwt = require('jsonwebtoken');
// const sendGridMail = require('@sendgrid/mail');

const { isUserPresent, saveUser } = require('../utils/user.helper');
const { EMAIL_API, ACCOUNT_ACTIVATION_KEY, EMAIL_VALIDATION_TIME, EMAIL_FROM, CLIENT_URL } = require('../app.constant');

// sendGridMail.setApiKey(EMAIL_API);

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isNewUser = await isUserPresent(email);
    if (isNewUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already taken',
        data: null
      });
    }

    const token = jwt.sign({ name, email, password }, ACCOUNT_ACTIVATION_KEY, { expiresIn: EMAIL_VALIDATION_TIME });

    // const emailData = {
    //   from: EMAIL_FROM,
    //   to: email,
    //   subject: `Account activation link`,
    //   html: `
    //     <h1>Please use the following link to activate your account</h1>
    //     <a href="${CLIENT_URL}/auth/activate/${token}">${token}</a>
    //     <hr />
    //     <p>This email contains sensetive information</p>
    //   `
    // }

    // sendGridMail.send(emailData)
    //   .then(response => {
    //     console.log('sign up sent', response);
    //     res.json({
    //       success: true,
    //       message: 'Please verify your email to register'
    //     });
    //   })
    //   .catch(err => {
    //     return err;
    //   });

    return res.status(200).json({
      success: true,
      message: 'Created',
      data: [
        {
          token: token
        }
      ]
    })

  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to process the request',
      data: err
    });
  }
}

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, ACCOUNT_ACTIVATION_KEY, (err, decodedToken) => {
      if (err) {
        console.log('jwt verify in account activation error', err);
        return res.status(401).json({
          success: false,
          message: 'Expired link. Signup again',
          data: []
        });
      }

      const { name, email, password } = jwt.decode(token);

      if (!name || !email || !password) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden Access',
          data: []
        });
      }

      saveUser({ name, email, password })
        .then(result => {
          const { message, data } = result;
          return res.status(200).json({
            success: true,
            message: message,
            data: data
          });
        })
        .catch(err => {
          let message = '', data = []
          if (typeof err === 'string') {
            message = err;
          } else {
            message = err.message;
            data = err.data
          }

          return res.status(401).json({
            success: false,
            message: message,
            data: data
          });
        });
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Forbidden Access',
      data: []
    });
  }
}

exports.login = (req, res, next) => {
  res.json({
    data: 'you hit the login api'
  });
};