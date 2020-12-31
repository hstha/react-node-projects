const User = require("../models/User/User");
const JWT = require("../utils/jwt.helper");
const {
  ACCOUNT_ACTIVATION_KEY,
  EMAIL_VALIDATION_TIME,
} = require("../app.constant");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isNewUser = await User.isUserPresent(email);
    if (isNewUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken",
        data: null,
      });
    }
    const jwt = new JWT(
      { name, email, password },
      ACCOUNT_ACTIVATION_KEY,
      EMAIL_VALIDATION_TIME
    );
    const token = jwt.sign();

    return res.status(200).json({
      success: true,
      message: "Created",
      data: [
        {
          token: token,
        },
      ],
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to process the request",
      data: err,
    });
  }
};

exports.activateAccount = (req, res) => {
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

exports.login = (req, res, next) => {
  res.json({
    data: "you hit the login api",
  });
};
