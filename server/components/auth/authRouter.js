import express from 'express'

class AuthRouter {
	constructor(authController) {
		this.authController = authController
	}

	getRouter() {
		const router = express.Router()

		router.use(express.urlencoded({ extended: true }))

		router.route('/login').post(this.authController.login)
		router.route('/signup').post(this.authController.signup)

		return router
	}
}

export default AuthRouter
