import { expect } from 'chai'
import sinon from 'sinon'
import User from '../../components/users/userEntity.js'
import UserController from '../../components/users/userController.js'

describe('User Controller', () => {
	let userDBMock, userController
	beforeEach(() => {
		userDBMock = {
			checkUsername: sinon.stub().resolves(false),
			addUser: sinon.stub().resolves({
				id: 1,
				username: 'test',
				email: 'test@example.com',
			}),
			getUserByUsername: sinon.stub().resolves({
				id: 1,
				username: 'test',
				email: 'test@example.com',
				password: 'password',
			}),
			getUserByID: sinon.stub().resolves({
				id: 1,
				username: 'test',
				email: 'test@example.com',
			}),
		}
		// Create a UserController instance with the mocked userDB
		userController = new UserController(userDBMock)
	})

	describe('addUser', () => {
		it('should add a new user and return status 201', async () => {
			const req = {
				body: {
					username: 'test',
					email: 'test@example.com',
					password: 'password',
				},
			}

			const res = {
				status: sinon.stub().returnsThis(),
				send: sinon.stub(),
			}

			await userController.addUser(req, res)

			// checks for user existence
			expect(userDBMock.checkUsername.calledOnceWith('test')).to.be.true
			// calls DB addUser function with a User object
			expect(
				userDBMock.addUser.calledOnceWith(sinon.match.instanceOf(User))
			).to.be.true
			// returns status 201
			expect(res.status.calledOnceWith(201)).to.be.true
			// responds with the added user
			expect(
				res.send.calledOnceWith({
					id: 1,
					username: 'test',
					email: 'test@example.com',
				})
			).to.be.true
		})

		// Add more test cases for addUser method as needed
	})

	describe('getUserByUsername', () => {
		it('should return user information if found', async () => {
			// Mock req and res
			const req = { params: { username: 'test' } }
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
				send: sinon.stub(),
			}

			// Call getUserByUsername method
			await userController.getUserByUsername(req, res)

			// Assertions
			expect(userDBMock.getUserByUsername.calledOnceWith('test')).to.be
				.true
			expect(res.status.calledOnceWith(200)).to.be.true
			expect(res.json.calledOnceWith(sinon.match.instanceOf(User))).to.be
				.true
		})

		// Add more test cases for getUserByUsername method as needed
	})

	// Add tests for other methods of UserController
})
