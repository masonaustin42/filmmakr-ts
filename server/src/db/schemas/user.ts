import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
})

userSchema.pre('save', function (next) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = crypto
      .createHash('sha512')
      .update(this.passwordHash)
      .digest('hex')
  }
  next()
})

userSchema.methods.comparePassword = function (password: string) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return this.passwordHash === hash
}

export const User = mongoose.model('User', userSchema)
