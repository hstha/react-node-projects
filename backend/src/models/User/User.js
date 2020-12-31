const UserModel = require("./user.model");

class User {
	static isUserPresent(email) {
		return UserModel.findOne({ email })
			.exec()
			.then((result) => {
				if (result) {
					return true;
				}

				return false;
			})
			.catch((err) => {
				return err;
			});
	}

	static saveUser({ name, email, password }) {
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
}

module.exports = User;
