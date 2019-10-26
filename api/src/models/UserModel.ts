import { Schema, model } from 'mongoose'
import { User, userRole } from '../types'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: userRole,
    default: 'USER',
  },
})

export default model<User>('User', userSchema)
