import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  passwordHash: {
    type: String,
    select: false,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

gallerySchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    if (this.passwordHash === null || this.passwordHash === undefined) {
      this.passwordHash = undefined
    } else {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
    }
  }
  next()
})

gallerySchema.methods.comparePassword = async function (password: string) {
  const hash = await bcrypt.compare(password, this.passwordHash)
  return this.passwordHash === hash
}

export const Gallery = mongoose.model('Gallery', gallerySchema)
