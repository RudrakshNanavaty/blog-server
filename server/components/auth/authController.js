import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../users/userEntity.js'

class AuthController {
	constructor(userDB) {
		this.userDB = userDB
	}

	signup = async (req, res) => {
		try {
			const { username, email, password } = req.body

			if (await this.userDB.checkUsername(username)) {
				return res
					.status(400)
					.json({ message: 'Username already exists' })
			}

			const hashedPassword = await bcrypt.hash(password, 10)

			const newUser = new User(
				await this.userDB.addUser({
					username,
					email,
					password: hashedPassword,
				})
			)

			return res.status(201).json(newUser)
		} catch (error) {
			console.error('Error during signup:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	}

	login = async (req, res) => {
		try {
			const { username, password } = req.body

			const user = new User(await this.userDB.getUserByUsername(username))
			const hashedPassword = password

			if (!user)
				res.status(401).json({
					message: 'Invalid username',
				})

			if (!(await bcrypt.compare(hashedPassword, user.password)))
				res.status(401).json({
					message: 'Incorrect password',
				})

			const token = jwt.sign(
				{ userID: user.id, username: user.username },
				process.env.JWT_TOKEN_KEY,
				{ expiresIn: '1h' }
			)

			res.status(200).json({ message: 'Login successful', token })
		} catch (error) {
			console.error('Error during login:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	}
}

export default AuthController
