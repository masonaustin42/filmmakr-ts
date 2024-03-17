import { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import { Gallery } from '../../db/schemas/gallery.js'
import { User } from '../../db/schemas/user.js'
import { ErrorJSON } from '../../utils/formatErrors.js'
import expressAsyncHandler from 'express-async-handler'

export const galleryRouter = Router()
