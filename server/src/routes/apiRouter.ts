import { Router } from 'express'
import { userRouter } from './users/index.js'
import { galleryRouter } from './galleries/index.js'

const apiRouter = Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/galleries', galleryRouter)

export default apiRouter
