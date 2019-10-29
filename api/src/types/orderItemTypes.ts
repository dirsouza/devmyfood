import { Types } from 'mongoose'
import { Product } from '.'

export interface OrderItem extends Types.Embedded {
  _id: Types.ObjectId
  product: Product | Types.ObjectId
  quantity: number
  total: number
  createdAt: string
  updatedAt: string
}

export type OrderItemCreateInput = Pick<OrderItem, 'quantity' | 'total'> & {
  product: string
}

export type OrderItemUpdateInput = OrderItemCreateInput & {
  _id: string
}
