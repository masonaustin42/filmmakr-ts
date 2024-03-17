import { User } from '../db/schemas/user.js'

export const checkUnique = async (username: string, email: string) => {
  const checkUsername = await User.find({ username: username })
  const checkEmail = await User.find({ email: email })
  type errors = { username?: string; email?: string }
  const errors: errors = {}
  if (checkUsername.length > 0) {
    errors.username = 'Username is already in use'
  }
  if (checkEmail.length > 0) {
    errors.email = 'Email is already in use'
  }
  return errors
}
