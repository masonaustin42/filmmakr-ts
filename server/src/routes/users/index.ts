import { NextFunction, Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import { User } from '../../db/schemas/user.js'
import expressAsyncHandler from 'express-async-handler'

export const userRouter = Router()

userRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello from user router')
})

userRouter.post(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body

    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash: password,
    })

    await user.save()
    res.send(user)
  }),
)
