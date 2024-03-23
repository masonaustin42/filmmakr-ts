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
    successRedirect: 'http://localhost:5173/',
  }),
)

authRouter.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err)
    res.json({ message: 'Logged out' })
  })
})

authRouter.post('/register', (req, res) => {
  // register logic
})

export default authRouter
