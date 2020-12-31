const jwt = require('jsonwebtoken');
class JWT {
  constructor(payload, secretKey, expiresIn) {
    this.secretKey = secretKey;
    this.payload = payload;
    this.expiresIn = expiresIn;
  }

  sign() {
    const { payload, secretKey, expiresIn } = this;
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  }

  static verifyToken(token, secretKey) {
    console.log(jwt.verify(token, secretKey));
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      throw ({
        success: false,
        message: 'Expired link. Signup again',
        data: []
      })
    }
  }
}

module.exports = JWT;