const User = require('../models/user.model');

/**
 * The problem with this approach is the we will be saving a lot of junk users as
 * we don't verify whether the user is valid or not
 * To validate 
 *  - one of the approach we can take is that by ckecking is the email valid
 *    => By sending the confirmation workflow and then saving the user
 *  - another approach is using it's phone number and follow the similar approach 
 */

exports.signup = async (req, res, next) => {
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

    let newUser = new User({ name, email, password });
    const result = await newUser.save();

    res.status(200).json({
      success: true,
      message: 'User have been saved successfully',
      data: {
        name: result.name,
        email: result.email
      }
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to process the request',
      data: err
    });
  }


};

exports.login = (req, res, next) => {
  res.json({
    data: 'you hit the login api'
  });
};