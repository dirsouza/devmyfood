import { Types, Schema } from 'mongoose'
import { Product } from '.'

export interface OrderItem extends Types.Embedded {
  _id: Schema.Types.ObjectId
  product: Product
  quantity: number
  total: number
  createdAt: string
  updatedAt: string
}
