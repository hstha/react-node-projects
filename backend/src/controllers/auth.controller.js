exports.signup = (req, res, next) => {
    res.json({
        data: 'you hit the signup api'
    });
};

exports.login = (req, res, next) => {
    res.json({
        data: 'you hit the login api'
    });
}