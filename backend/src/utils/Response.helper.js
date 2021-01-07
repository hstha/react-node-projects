class Response {
  static error(res, { status = 400, message, data = [] }) {
    return res.status(status).json({
      success: false,
      message,
      data
    });
  }

  static success(res, { status = 200, message, data = [] }) {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  }
}

module.exports = Response;