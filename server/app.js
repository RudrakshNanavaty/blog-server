import express from 'express'
import morgan from 'morgan'
import router from './loaders/routes.js'

const app = express()

app.use(morgan('dev'))

router(app)

export default app
