import { Schema, model } from 'mongoose'
import { productUnit, Product } from '../types'

const productShema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: productUnit,
    required: true,
  },
})

export default model<Product>('Product', productShema)
