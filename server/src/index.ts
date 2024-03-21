import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/conn.js'
import apiRouter from './routes/apiRouter.js'
import { formatErrors } from './utils/formatErrors.js'
import passport from 'passport'
import session from 'express-session'

const PORT = process.env.PORT || 5000

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://accounts.google.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json())

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
)

app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use('/api', apiRouter)

// Error handler
app.use(formatErrors)

// start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
