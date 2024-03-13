import { Router } from 'express'
import mongoose from 'mongoose'

export const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.send('Hello from user router')
})
