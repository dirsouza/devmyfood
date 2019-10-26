import { Model } from 'mongoose'
import { User, Product, Order } from '.'

export interface Models {
  User: Model<User>
  Product: Model<Product>
  Order: Model<Order>
}
