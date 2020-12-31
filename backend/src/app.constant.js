const processEnv = process.env;

exports.PORT = processEnv.PORT;
exports.NODE_ENV = processEnv.NODE_ENV;
exports.CLIENT_URL = processEnv.CLIENT_URL;
exports.DB_URL = processEnv.DB_URL;
exports.EMAIL_API = processEnv.EMAIL_VERIFICATION_API_KEY;
exports.SECRET_KEY = processEnv.JWT_SECRET_KEY;
exports.ACCOUNT_ACTIVATION_KEY = processEnv.JWT_ACCOUNT_ACTIVATION_KEY;
exports.RESET_PASSWORD_KEY = processEnv.JWT_RESET_PASSWORD;
exports.EMAIL_TO = processEnv.EMAIL_TO;
exports.EMAIL_FROM = processEnv.EMAIL_FROM;
exports.EMAIL_VALIDATION_TIME = '24h'

exports.ERROR_MESSAGE = {
  FORBIDDEN_ACCESS: 'Forbidden Access',
  NOT_REGISTERED_USER: 'User is not registered',
  REGISTER_TOKEN_EXPIRED: 'Token has already expired, please sign up again',
  PROCESS_FAILED: 'Failed to process the request, please try again',
  EMAIL_TAKEN: 'Email is already taken',
  AUTHENTICATION_ERROR: `Email and password doesn't match`
}

exports.SUCCESS_MESSAGE = {
  ACCOUNT_CREATED: 'Account registered successfully',
  SIGN_IN_SUCCESS: 'Logged in successfully'
}