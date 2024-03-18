import pg from 'pg'

class UserDB {
	constructor() {
		// Create a new Pool instance for managing PostgreSQL connections
		this.pool = new pg.Pool({
			user: 'blog-db-admin',
			host: 'blog-database',
			database: 'blog-db',
			password: 'blog-password',
			port: 5432,
		})
	}

	// Method to add a new user to the database
	async addUser(user) {
		const client = await this.pool.connect()
		try {
			// SQL to insert a new user into the 'users' table
			const { rows } = await client.query(
				'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
				[user.username, user.email, user.password]
			)
			// Return the inserted user
			return rows[0]
		} finally {
			client.release()
		}
	}

	// Method to retrieve all users from the database
	async getUsers() {
		const client = await this.pool.connect()
		try {
			// SQL to select all users
			const { rows } = await client.query('SELECT * FROM users')
			return rows
		} finally {
			client.release()
		}
	}

	// Method to retrieve a user by their ID from the database
	async getUserByUsername(username) {
		const client = await this.pool.connect()
		try {
			// SQL to select a user by ID
			const { rows } = await client.query(
				'SELECT * FROM users WHERE username = $1',
				[username]
			)
			return rows[0]
		} finally {
			client.release()
		}
	}

	// Method to retrieve a user by their ID from the database
	async getUserByID(id) {
		const client = await this.pool.connect()
		try {
			// SQL to select a user by ID
			const { rows } = await client.query(
				'SELECT * FROM users WHERE id = $1',
				[id]
			)
			return rows[0]
		} finally {
			client.release()
		}
	}

	async checkUsername(username) {
		console.log('here')
		const client = await this.pool.connect()
		try {
			// SQL to select a user by ID
			const { rows } = await client.query(
				'SELECT EXISTS (SELECT 1 FROM users WHERE username = $1)',
				[username]
			)
			return rows[0].exists
		} finally {
			client.release()
		}
	}
}

export default UserDB
