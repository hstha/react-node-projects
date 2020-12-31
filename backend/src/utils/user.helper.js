const User = require('../models/user.model');

exports.isUserPresent = function (email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .exec()
      .then(result => {
        if (result) {
          resolve(true);
        }
        resolve(false);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.saveUser = function (newUser) {
  const user = new User({ ...newUser });
  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) {
        reject('Unable to register your account. Please try again');
      }

      resolve({
        message: 'Your account is registered',
        data: [
          {
            name: user.name,
            email: user.email
          }
        ]
      });
    });
  });
};