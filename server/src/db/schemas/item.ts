import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
})

export const Item = mongoose.model('Item', itemSchema)
