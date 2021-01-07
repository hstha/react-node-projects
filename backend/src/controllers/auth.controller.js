const JWT = require("../utils/jwt.helper");
const User = require("../models/User/User");
const Email = require("../utils/email.helpers");
const Response = require("../utils/Response.helper");
const {
  SECRET_KEY,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  RESET_PASSWORD_KEY,
  EMAIL_VALIDATION_TIME,
  ACCOUNT_ACTIVATION_KEY,
} = require("../app.constant");

exports.signup = async (req, res) => {
  console.log('[controller: signup]');
  const { name, email, password } = req.body;
  try {
    const isNewUser = await User.getUser(email);
    if (isNewUser) {
      return Response.error(res, {
        status: 200,
        message: ERROR_MESSAGE.EMAIL_ALREADY_TAKEN
      });
    }
    const jwt = new JWT(
      { name, email, password },
      ACCOUNT_ACTIVATION_KEY,
      EMAIL_VALIDATION_TIME
    );
    const token = jwt.sign();

    const msg = Email.getAccountActivationMail({ to: email, token });

    Email
      .send(msg)
      .then(() => {
        console.log(`message sent`);
        return Response.success(res, {
          message: SUCCESS_MESSAGE.ACCOUNT_ACTIVATION_VERIFY_EMAIL
        });
      })
      .catch((error) => {
        return Response.error(res, {
          message: ERROR_MESSAGE.UNKNOWN_ERROR,
          data: error
        });
      });

  } catch (err) {
    return Response.success(res, {
      status: 404,
      message: ERROR_MESSAGE.PROCESS_FAILED,
      data: [err]
    });
  }
};

exports.activateAccount = (req, res) => {
  console.log('[controller: activateAccount]');
  const { token } = req.body;
  try {
    if (!token) {
      throw Error('No token');
    }

    const resultedToken = JWT.verifyToken(token, ACCOUNT_ACTIVATION_KEY);
    const { name, email, password } = resultedToken;

    if (!name || !email || !password) {
      throw Error('No token values');
    }

    User.saveUser({ name, email, password })
      .then((result) => {
        const { message, data } = result;
        return res.status(200).json({
          success: true,
          message: message,
          data: data,
        });
      })
      .catch((err) => {
        const { message, data } = err;
        return res.status(401).json({
          success: false,
          message: message,
          data: data,
        });
      });

  } catch (err) {
    console.log(err);
    return res.status(403).json({
      success: false,
      message: "Forbidden Access or token is exired",
      data: [],
    });
  }
};

exports.login = async (req, res, next) => {
  console.log('[controller: login]');
  const { email, password } = req.body;
  try {
    User.getAuthenticatedUser({ email, password })
      .then((user) => {
        const { _id } = user;
        const jwt = new JWT(
          { _id },
          SECRET_KEY,
          '7d'
        );
        const token = jwt.sign();

        delete user['_id'];

        return res.status(200).json({
          success: true,
          message: SUCCESS_MESSAGE.SIGN_IN_SUCCESS,
          data: {
            user,
            token
          }
        });
      })
      .catch(err => {
        const { message, data } = err;
        return res.status(400).json({
          success: false,
          message,
          data
        });
      })

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: ERROR_MESSAGE.PROCESS_FAILED,
      data: []
    });
  }

};

exports.forgotPassword = (req, res) => {
  console.log(`[controller: forgotPassword ]`);
  const { email } = req.body;
  User.getUser(email)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: ERROR_MESSAGE.NO_USER_PRESENT,
          data: []
        });
      }

      const token = new JWT({ _id: user._id }, RESET_PASSWORD_KEY, EMAIL_VALIDATION_TIME);

      user.updateOne({ resetPasswordLink: token })
        .then(user => {
          const msg = Email.getForgetPasswordMail({ to: email, token });

          Email
            .send(msg)
            .then(() => {
              console.log(`message sent`);
              return res.status(200).json({
                success: true,
                message: "Please verify you email",
                data: [],
              });
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(error => {
          throw error;
        })

    })
    .catch(err => {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGE.UNKNOWN_ERROR,
        data: err
      });
    })
}

exports.resetPassword = (req, res) => {
  console.log(`[controller: resetPassword ]`);
  const { resetPasswordLink, newPassword, email } = req.body;
  if (!resetPasswordLink) {
    return res.status(400).json({
      success: false,
      message: '',
      data: []
    });
  }

  JWT.verifyToken(resetPasswordLink, RESET_PASSWORD_KEY)
    .then(dcodedData => {
      User.getUser(email)
        .then(user => {
          if (!user) {
            return res.status(400).json({
              success: false,
              message: ERROR_MESSAGE.NO_USER_PRESENT,
              data: []
            });
          }

          user.updateOne({ password: newPassword, resetPasswordLink: '' })
            .then(user => {
              return res.status(200).json({
                success: true,
                message: SUCCESS_MESSAGE.PASSWORD_CHANGED,
                data: []
              });
            })
            .catch(error => {
              return res.status(400).json({
                success: false,
                message: ERROR_MESSAGE.UNKNOWN_ERROR,
                data: []
              });
            })
        })
        .catch(error => {
          return res.status(400).json({
            success: false,
            message: ERROR_MESSAGE.UNKNOWN_ERROR,
            data: []
          });
        });
    })
    .catch(error => {
      return res.status(400).json({
        success: false,
        message: 'Expired link. Try again',
        data: []
      })
    })

  User.updateUser({ email, password });
}
