const crypto = require('crypto');
const Mongoose = require('mongoose');

//user schema
const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: 32,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    reset_password_link: {
        data: String,
        default: ''
    }
}, { timestamps: true });

// virtual
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

//methods
userSchema.methods = {
    authenticate: function (planText) {
        return this.encryptPassword(planText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) {
            return '';
        }

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (e) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = Mongoose.model('User', userSchema);