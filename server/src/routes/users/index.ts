import { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import { User } from '../../db/schemas/user.js'
import { ErrorJSON } from '../../utils/formatErrors.js'
import expressAsyncHandler from 'express-async-handler'
import { checkUnique } from '../../utils/checkUnique.js'

export const userRouter = Router()

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id }).catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw {
          name: 'Bad Request',
          message: 'Invalid ID',
          status: 400,
        } as ErrorJSON
      } else {
        throw err
      }
    })
    if (!user) {
      throw {
        name: 'User not found',
        message: 'User not found',
        status: 404,
      } as ErrorJSON
    }
    res.send(user)
  }),
)

userRouter.post(
  '/',
  // expressAsyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
    }: {
      firstName: string
      lastName: string
      email: string
      username: string
      password: string
    } = req.body

    const unique = await checkUnique(username, email)
    if (Object.keys(unique).length > 0) {
      throw {
        name: 'Unique Constraint Error',
        errors: unique,
        status: 400,
      } as ErrorJSON
    }

    const user = new User({
      firstName,
      lastName,
      email,
      username,
      passwordHash: password,
    })

    await user.save()
    res.send(user)
  },
  // ),
)

userRouter.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { firstName, lastName, password } = req.body
    const user = await User.findOne({ _id: id }).catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw {
          name: 'Bad Request',
          message: 'Invalid ID',
          status: 400,
        } as ErrorJSON
      } else {
        throw err
      }
    })
    if (!user) {
      throw {
        name: 'User not found',
        message: 'User not found',
        status: 404,
      } as ErrorJSON
    }

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (password) user.passwordHash = password

    await user.save()
    res.send(user)
  }),
)

userRouter.delete(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const deleted = await User.deleteOne({ _id: id }).catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw {
          name: 'Bad Request',
          message: 'Invalid ID',
          status: 400,
        } as ErrorJSON
      } else {
        throw err
      }
    })
    if (deleted.deletedCount === 0) {
      throw {
        name: 'User not found',
        message: 'User not found',
        status: 404,
      } as ErrorJSON
    }

    res.send({ message: 'User deleted' })
  }),
)
