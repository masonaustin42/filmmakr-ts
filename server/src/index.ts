import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/conn.js'
import apiRouter from './routes/apiRouter.js'
import { formatErrors } from './utils/formatErrors.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

// use routes
app.use('/api', apiRouter)

// Error handler
app.use(formatErrors)

// start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
