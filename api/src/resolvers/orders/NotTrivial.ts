import { Resolver, Order } from '../../types'
import { getFields } from '../../utils'

export const user: Resolver<any, Order> = (
  order,
  args,
  { models: { User } },
  info,
) => User.findById(order.user).select(getFields(info))
