import { Strategy } from 'passport-local'
import { User } from '../db/schemas/user.js'
import bcrypt from 'bcrypt'

export function initPassportConfig(passport: any, email: string) {
  // Helper function to authenticate user
  const authenticateUser = async (
    email: string,
    password: string,
    done: Function,
  ) => {
    const user = await User.findOne({ email: email })
    if (user === null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (await bcrypt.compare(password, user.passwordHash)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  // Initialize Passport
  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user: any, done: Function) => done(null, user.id))
  passport.deserializeUser(async (id: string, done: Function) => {})
}
