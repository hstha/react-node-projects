const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();
        if (user) {
            res.status(400).json({
                error: [
                    {
                        msg: 'Email is already taken'
                    }
                ]
            });
        }

        let newUser = new User({ name, email, password });
        const result = await newUser.save();
        console.log(result);
    } catch (err) {
        res.status(404).json({
            error: err
        })
    }


};

exports.login = (req, res, next) => {
    res.json({
        data: 'you hit the login api'
    });
};