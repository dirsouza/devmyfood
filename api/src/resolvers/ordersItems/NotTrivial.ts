import { Resolver, OrderItem } from '../../types'

export const product: Resolver<any, OrderItem> = (
  orderItem,
  args,
  { models: { Product } },
) => Product.findById(orderItem.product)
