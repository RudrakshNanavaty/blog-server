import userModule from '../components/users/userModule.js'
import authModule from '../components/auth/authModule.js'

export default app => {
	app.use('/user', userModule.router)
	app.use('/auth', authModule.router)
}
