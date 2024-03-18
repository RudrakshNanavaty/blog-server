import express from 'express'

class UserRouter {
	constructor(userController) {
		this.userController = userController
	}

	getRouter() {
		const router = express.Router()

		// router.route('/').get(this.userController.getUsers)
		router.route('/:username').get(this.userController.getUserByUsername)
		router.route('/:id').get(this.userController.getUserByID)

		router.use(express.urlencoded({ extended: true }))
		router.route('/').get(this.userController.checkUsername)
		router.route('/').post(this.userController.addUser)

		return router
	}
}

export default UserRouter
