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
    const isNewUser = await User.getUser({ email });
    if (isNewUser) {
      return Response.error(res, {
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
    return Response.error(res, {
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
        return Response.success(res, {
          message: message,
          data: data
        });
      })
      .catch((err) => {
        const { message, data } = err;
        return Response.error(res, {
          status: 401,
          message,
          data
        });
      });
  } catch (err) {
    console.log(err);
    return Response.error(res, {
      status: 403,
      message: ERROR_MESSAGE.FORBIDDEN_ACCESS
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

        return Response.success(res, {
          message: SUCCESS_MESSAGE.SIGN_IN_SUCCESS,
          data: { user, token }
        });
      })
      .catch(err => {
        const { message, data } = err;
        return Response.error(res, {
          message,
          data
        });
      });
  } catch (err) {
    return Response.error(res, {
      message: ERROR_MESSAGE.PROCESS_FAILED
    });
  }

};

exports.forgotPassword = (req, res) => {
  console.log(`[controller: forgotPassword ]`);
  const { email } = req.body;
  User.getUser({ email })
    .then((user) => {
      if (!user) {
        return Response.error(res, {
          status: 404,
          message: ERROR_MESSAGE.NO_USER_PRESENT
        });
      }

      const jwt = new JWT({ _id: user._id }, RESET_PASSWORD_KEY, EMAIL_VALIDATION_TIME);
      const token = jwt.sign();
      user.updateOne({ resetPasswordLink: token })
        .then(user => {
          const msg = Email.getForgetPasswordMail({ to: email, token });

          Email
            .send(msg)
            .then(() => {
              console.log(`message sent`);
              return Response.success(res, {
                message: SUCCESS_MESSAGE.RESET_VERIFY_EMAIL
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
      return Response.error(res, {
        status: 404,
        message: ERROR_MESSAGE.UNKNOWN_ERROR,
        data: err
      });
    })
}

exports.resetPassword = (req, res) => {
  console.log(`[controller: resetPassword ]`);
  const { resetPasswordLink, newPassword } = req.body;
  if (!resetPasswordLink) {
    return Response.error(res, {
      message: ERROR_MESSAGE.UNKNOWN_ERROR
    });
  }

  const { _id } = JWT.verifyToken(resetPasswordLink, RESET_PASSWORD_KEY);
  User.updateUser({ _id }, { password: newPassword, resetPasswordLink: '' })
    .then(() => {
      return Response.success(res, {
        message: SUCCESS_MESSAGE.UPDATED_SUCCESSFULLY,
      });
    })
    .catch(error => {
      return Response.error(req, {
        message: ERROR_MESSAGE.PROCESS_FAILED,
        data: [error]
      });
    })
}
