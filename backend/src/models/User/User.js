const { ERROR_MESSAGE, NO_USER_PRESENT, SUCCESS_MESSAGE } = require("../../app.constant");
const UserModel = require("./user.model");

class User {
	static getUser(queryObject) {
		console.log('[method: getUser]');

		return UserModel.findOne(queryObject)
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

	static saveUser(user, createmodel = true) {
		console.log('[method: saveUser]');
		let newUser = user;
		if (createmodel) {
			const { name, email, password } = user;
			newUser = new UserModel({ name, email, password });
		}
		return newUser.save()
			.then((result) => {
				return {
					message: "Your account is registered",
					data: [],
				};
			}).catch((err) => {
				return err;
			});
	}

	static getAuthenticatedUser({ email, password }) {
		console.log('[method: getAuthenticatedUser]');
		return new Promise((resolve, reject) => {
			User.getUser({ email })
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

	static updateUser(queryObject, updateObject) {
		return User.getUser(queryObject)
			.then(user => {
				if (!user) {
					return;
				}

				for (const key in updateObject) {
					user[key] = updateObject[key];
				}

				return User.saveUser(user, false);
			})
			.catch(error => {
				return error;
			})
	}
}

module.exports = User;
