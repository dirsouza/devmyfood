import { Document, Schema, Types } from 'mongoose'
import { User, OrderItem } from '.'

export enum OrderStatus {
  WAITING_PAYMENT,
  IN_QUEUE,
  PREPARING,
  READY,
  ON_THE_WAY,
  DELIVERED,
}

export interface Order extends Document {
  _id: Schema.Types.ObjectId
  user: User
  total: number
  status: OrderStatus
  items: Types.DocumentArray<OrderItem>
  createdAt: string
  updatedAt: string
}
