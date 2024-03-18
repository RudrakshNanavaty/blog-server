import User from './userEntity.js'

class UserController {
	constructor(userDB) {
		this.userDB = userDB
	}

	addUser = async (req, res) => {
		try {
			const { username, email, password } = req.body

			// bad request
			if (!username || !email || !password) {
				return res
					.status(400)
					.send('Username, email, and password are required.')
			}

			// already exists
			if (await this.userDB.checkUsername(username))
				return res.status(403).send('User already exists.')

			const addedUser = await this.userDB.addUser(
				new User({ username, email, password })
			)

			return res.status(201).send(addedUser)
		} catch (error) {
			console.error('Error creating user:', error)
			return res.status(500).send('Error creating user.')
		}
	}

	getUserByUsername = async (req, res) => {
		try {
			const { username } = req.params

			const user = new User(await this.userDB.getUserByUsername(username))

			return user
				? res.status(200).json(user)
				: res.status(404).send(`User ${username} not found.`)
		} catch (error) {
			console.error('Error fetching user:', username)
			return res.status(500).send('Error fetching user.')
		}
	}

	getUserByID = async (req, res) => {
		try {
			const { id } = req.params
			const user = new User(await this.userDB.getUserByID(id))
			return user
				? res.status(200).json(user)
				: res.status(404).send(`UserID ${id} not found.`)
		} catch (error) {
			console.error('Error fetching user id:', id)
			return res.status(500).send('Error fetching user.')
		}
	}

	checkUsername = async (req, res) => {
		try {
			const { username } = req.body
			const exists = this.userDB.checkUsername(username)
			return exists
				? res.status(200).send(`User ${username} exists`)
				: res.status(404).send(`User ${username} does not exist`)
		} catch (error) {
			console.log('Error checking user:', error)
			return res
				.status(500)
				.send(`Error checking User '${req.body.username}'.`)
		}
	}
}

export default UserController
