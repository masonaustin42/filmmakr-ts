import { ErrorRequestHandler } from 'express'
import { MongoServerError } from 'mongodb'
import mongoose from 'mongoose'

export interface ErrorJSON extends Error {
  errors: { [key: string]: string }
  status: number
}

const friendlyErrors = (err: Error) => {
  if (err instanceof mongoose.Error.CastError) {
    return {
      name: 'Bad Request',
      message: 'Invalid ID',
      status: 400,
    } as ErrorJSON
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: { [key: string]: string } = {}
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message
    })
    return {
      name: 'Validation Error',
      errors,
      status: 400,
    } as ErrorJSON
  }
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      return {
        name: 'Unique Constraint Error',

        message: `${Object.keys(err.keyValue)[0]} is already in use`,
        status: 400,
      } as ErrorJSON
    }
  }
  return {
    name: 'Server Error',
    message: 'Internal Server Error',
    status: 500,
  } as ErrorJSON
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
