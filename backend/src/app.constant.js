const processEnv = process.env;

exports.PORT = processEnv.PORT;
exports.NODE_ENV = processEnv.NODE_ENV;
exports.CLIENT_URL = processEnv.CLIENT_URL;
exports.DB_URL = processEnv.DB_URL;
exports.EMAIL_API = processEnv.EMAIL_VERIFICATION_API_KEY;
exports.SECRET_KEY = processEnv.JWT_SECRET_KEY;
exports.ACCOUNT_ACTIVATION_KEY = processEnv.JWT_ACCOUNT_ACTIVATION;
exports.RESET_PASSWORD_KEY = processEnv.JWT_RESET_PASSWORD;
exports.EMAIL_TO = processEnv.EMAIL_TO;
exports.EMAIL_FORM = processEnv.EMAIL_FORM;
exports.EMAIL_VALIDATION_TIME = '24h'