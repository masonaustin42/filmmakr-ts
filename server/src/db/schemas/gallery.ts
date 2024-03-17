import mongoose from 'mongoose'
import crypto from 'crypto'

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

gallerySchema.pre('save', function (next) {
  if (this.isModified('passwordHash')) {
    if (this.passwordHash === null || this.passwordHash === undefined) {
      this.passwordHash = undefined
    } else {
      this.passwordHash = crypto
        .createHash('sha512')
        .update(this.passwordHash)
        .digest('hex')
    }
  }
  next()
})

export const Gallery = mongoose.model('Gallery', gallerySchema)
