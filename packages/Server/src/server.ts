import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { router } from './routes/Router'
import { logger } from './shared'
import path from 'path'
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
)
app.use(cookieParser())

// ------------------------------------------------------- DB
const databaseUrl = process.env.MONGO_DB || ''

try {
	mongoose.connect(databaseUrl)
	mongoose.connection.once('open', () => {
		logger.info('-database: connected successfully')
	})
} catch (error) {
	logger.error(error, 'Error on mongoose connection')
}

// ------------------------------------------------------- routes & frontend hosting

app.use(router)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../../Frontend/build')))
}

// listening
app.listen(PORT, () => {
	logger.info(`-server: listening on port ${PORT}`)
})
