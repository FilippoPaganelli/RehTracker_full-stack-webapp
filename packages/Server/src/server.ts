import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { router } from './routes/Router'
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
const uri = process.env.MONGO_DB ?? process.env.ATLAS_DB_URI ?? ''

try {
	mongoose.connect(uri)
} catch (error) {
	console.log(error)
}

mongoose.connection.once('open', () => {
	console.log('-DB: connected successfully')
})

// ------------------------------------------------------- routes

app.use(router)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../../Frontend/build'))
}

// listening
app.listen(PORT, () => {
	console.log(`-server: listening on port ${PORT}`)
})
