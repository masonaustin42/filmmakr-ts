import { Router } from 'express'
import passport from 'passport'
import '../../utils/passportConfig.js'

const authRouter = Router()

authRouter.post(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

authRouter.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  }),
)

authRouter.post('/logout', (req, res) => {
  // logout logic
})

authRouter.post('/register', (req, res) => {
  // register logic
})

export default authRouter
