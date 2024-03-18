import UserDB from './userDB.js'
import UserController from './userController.js'
import UserRouter from './userRouter.js'

const userDB = new UserDB()
const userController = new UserController(userDB)
const userRouter = new UserRouter(userController)

export default {
	userDB,
	controller: userController,
	router: userRouter.getRouter(),
}
