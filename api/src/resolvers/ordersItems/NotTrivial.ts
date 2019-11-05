import { Resolver, OrderItem } from '../../types'
import { getFields } from '../../utils'

export const product: Resolver<any, OrderItem> = (
  orderItem,
  args,
  { models: { Product } },
  info,
) => Product.findById(orderItem.product).select(getFields(info))
