class User {

	constructor(user)
	{
		this.id = user.id
		this.username = user.username
		this.email = user.email
		this.password = user.password
	}

	// password not included
	toJSON() {
		return {
			username: this.username,
			email: this.email,
		}
	}
}

export default User
