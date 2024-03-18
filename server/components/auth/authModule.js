import UserModule from '../users/userModule.js'
import AuthController from './authController.js'
import AuthRouter from './authRouter.js'
import TokenHandler from './tokenHandler.js'

const authController = new AuthController(UserModule.userDB)
const authRouter = new AuthRouter(authController)

const tokenHandler = new TokenHandler(UserModule.userDB)

export default {
	tokenHandler,
	router: authRouter.getRouter(),
}
