import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'

interface ErrorJSON extends Error {
  errors: { [key: string]: string }
  status: number
}

export const formatErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  const newErr = {} as ErrorJSON
  //   Default error values
  newErr.name = err.name || 'Server Error'
  newErr.errors = { message: err.message } || {
    message: 'Internal Server Error',
  }
  newErr.status = err.status || 500
  if (process.env.NODE_ENV === 'development') {
    newErr.stack = err.stack
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors: { [key: string]: string } = {}
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message
    })
    newErr.name = 'Validation Error'
    newErr.errors = errors
    newErr.status = 400
  }

  return res.status(newErr.status || 500).json(newErr)
}
