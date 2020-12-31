const { ERROR_MESSAGE } = require("../../app.constant");
const UserModel = require("./user.model");

class User {
	static isUserPresent(email) {
		console.log('[method: isUserPresent]');
		return UserModel.findOne({ email })
			.exec()
			.then((result) => {
				if (result) {
					return result;
				}

				return null;
			})
			.catch((err) => {
				return err;
			});
	}

	static saveUser({ name, email, password }) {
		console.log('[method: saveUser]');
		const newUser = new UserModel({ name, email, password });
		return newUser.save()
			.then((result) => {
				return {
					message: "Your account is registered",
					data: [
						{
							name,
							email,
						},
					],
				};
			}).catch((err) => {
				return err;
			});
	}

	static getAuthenticatedUser({ email, password }) {
		console.log('[method: getAuthenticatedUser]');
		return new Promise((resolve, reject) => {
			User.isUserPresent(email)
				.then((result) => {
					if (!result) {
						reject({
							message: ERROR_MESSAGE.NOT_REGISTERED_USER,
							data: []
						});
					}

					const isAuthenticated = result.authenticate(password);
					if (!isAuthenticated) {
						reject({
							message: ERROR_MESSAGE.AUTHENTICATION_ERROR,
							data: []
						});
					}

					const { _id, name, email, role } = result;

					resolve({ _id, name, email, role });
				})
				.catch(err => {
					reject({
						message: ERROR_MESSAGE.PROCESS_FAILED,
						data: []
					})
				})
		})
	}
}

module.exports = User;
