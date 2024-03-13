import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/conn.js'
import { userRouter } from './routes/users/index.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

// use routes
app.use('/users', userRouter)

// error handlers
// app.use((_req, _res, next) => {
//   const error = new Error('Not found')
//   return next(error)
// })

// Validation Error handler
app.use((err, _req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = {}
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message
    })
    err.title = 'Validation Error'
    err.errors = errors
    err.status = 400
  }
  console.log('***************************************************************')
  console.log('ERROR: ', err)
  return res.status(err.status || 500).json(err)
})

// General Error handler
// app.use((err, _req, res, _next) => {
//   res.status(err.status || 500)
//   res.json({
//     message: err.message,
//     error: app.get('env') === 'development' ? err : {},
//   })
//   res.send('error')
// })

app.get('/', (req, res) => {
  res.send('test from server')
})

// start the Express server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
