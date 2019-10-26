import { Schema, model } from 'mongoose'
import { orderStatus, Order } from '../types'
import { orderItemSchema } from './orderItemModel'

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: orderStatus,
      default: 'WAITING_PAYMENT',
    },
    items: [orderItemSchema],
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
)

export default model<Order>('Order', orderSchema)
