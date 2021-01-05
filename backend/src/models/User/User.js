const { ERROR_MESSAGE, NO_USER_PRESENT } = require("../../app.constant");
const UserModel = require("./user.model");

class User {
	static getUser(email) {
		console.log('[method: getUser]');
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
			User.getUser(email)
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

	// static updateProfile({ _id, name, password, role, email }) {
	// 	return UserModel.findById(_id)
	// 	.then(user => {
	// 		if(!user) {
	// 			throw ('No user present');
	// 		}

	// 		if(user) {
	// 			user.name = name;
	// 		}

	// 		if(password) {
	// 			user.password = password;
	// 		}

	// 		user.updateOne()
	// 	})
	// 	.catch(err => {
	// 		return(NO_USER_PRESENT)
	// 	})
	// }
}

module.exports = User;
