import { Document, Schema } from 'mongoose'

export interface Product extends Document {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  prime: number
  unit: string
}
