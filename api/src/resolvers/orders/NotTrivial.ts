import { Resolver, Order } from '../../types'

export const user: Resolver<any, Order> = (order, args, { models: { User } }) =>
  User.findById(order.user)
