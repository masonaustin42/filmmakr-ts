import { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import { Gallery } from '../../db/schemas/gallery.js'
import { User } from '../../db/schemas/user.js'
import { ErrorJSON } from '../../utils/formatErrors.js'
import expressAsyncHandler from 'express-async-handler'

export const galleryRouter = Router()

galleryRouter.get(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const gallery = await Gallery.findOne({ _id: id }).catch((err) => {
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
    if (!gallery) {
      throw {
        name: 'Gallery not found',
        message: 'Gallery not found',
        status: 404,
      } as ErrorJSON
    }
    res.send(gallery)
  }),
)
