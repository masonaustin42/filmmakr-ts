import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/conn.js'
import { userRouter } from './routes/users/index.js'
import { formatErrors } from './utils/formatErrors.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

// use routes
app.use('/users', userRouter)

// Error handler

app.use(formatErrors)

app.get('/', (_req, res) => {
  res.send('test from server')
})

// start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
