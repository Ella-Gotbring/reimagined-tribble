const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Datastore = require("nedb-promise")
require("dotenv").config();
const dbUsers = new Datastore
 ({
	filename: "./users.db",
	autoload: true
 });

module.exports = {
 async register(body) {
	
	const passwordHash = await bcrypt.hash(body.password, 10);
	const newUser = {
		username: body.username,
		password: passwordHash
	}
	 return await dbUsers.insert(newUser)
	},

	async auth(body) {
		const password = body.password;
		const user = await dbUsers.findOne({ username: body.username });


		if (!user) {
			return false;
		} else {
			
			const CHECK = await bcrypt.compare(password, user.password);
			
			if (CHECK) {
				const SECRET = process.env.SECRET;

				const payload = {
					userID: user._id
				}

		
				const token = jwt.sign(payload, SECRET)

				return {
					token,
					username: user.username
				}
			} else {
				
				return false;
			}
		};
	},

	async deleteUser(userID) {
		return await dbUsers.remove({ _id: userID })
	}
}