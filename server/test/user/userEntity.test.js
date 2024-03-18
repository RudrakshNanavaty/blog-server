import { expect } from 'chai'
import User from '../../components/users/userEntity.js'

describe('User Entity', () => {
	it('should export a User class', () => {
		expect(User).to.be.a('function')
	})

	it('should have properties id, username, email, and password', () => {
		const user = new User({
			id: 1,
			username: 'testuser',
			email: 'test@example.com',
			password: 'password123',
		})

		expect(user).to.have.property('id')
		expect(user).to.have.property('username')
		expect(user).to.have.property('email')
		expect(user).to.have.property('password')
	})

	it('should have a toJSON method that returns everything except password', () => {
		const user = new User({
			id: 1,
			username: 'testuser',
			email: 'test@example.com',
			password: 'password123',
		})

		const json = user.toJSON()

		expect(user).to.have.property('id')
		expect(user).to.have.property('username')
		expect(user).to.have.property('email')
		expect(json).to.not.have.property('password')
	})
})
