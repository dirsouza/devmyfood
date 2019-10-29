import { Document, Types } from 'mongoose'
import { User, OrderItem, OrderItemCreateInput, OrderItemUpdateInput } from '.'

export enum OrderStatus {
  WAITING_PAYMENT,
  IN_QUEUE,
  PREPARING,
  READY,
  ON_THE_WAY,
  DELIVERED,
}

export interface Order extends Document {
  _id: Types.ObjectId
  user: User | Types.ObjectId
  total: number
  status: OrderStatus
  items: Types.DocumentArray<OrderItem>
  createdAt: string
  updatedAt: string
}

export interface OrderByIdInput {
  _id: string
}

type OrderCreateInput = Pick<Order, 'status' | 'user'>

interface OrderUpdateInput extends OrderCreateInput {
  itemsToAdd: OrderItemCreateInput[]
  itemsToUpdate: OrderItemUpdateInput[]
  itemsToDelete: string[]
}

export interface OrderCreateArgs {
  data: OrderCreateInput & {
    items: OrderItemCreateInput[]
  }
}

export interface OrderDeleteArgs {
  _id: string
}

export interface OrderUpdateArgs {
  _id: string
  data: OrderUpdateInput
}
