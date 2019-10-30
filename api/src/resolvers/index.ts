import * as UserMutation from './users/Mutation'
import * as ProductQuery from './products/Query'
import * as ProductMutation from './products/Mutation'
import * as OrderQuery from './orders/Query'
import * as OrderMutation from './orders/Mutation'
import * as OrderNotTrivial from './orders/NotTrivial'
import * as OrderItemNotTrivial from './ordersItems/NotTrivial'
import ProductOrderByInput from './products/ProductOrderByInput'
import OrderOrderByInput from './orders/OrderOrderByInput'

export default {
  Query: { ...ProductQuery, ...OrderQuery },
  Mutation: { ...ProductMutation, ...UserMutation, ...OrderMutation },
  Order: { ...OrderNotTrivial },
  OrderItem: { ...OrderItemNotTrivial },
  ProductOrderByInput,
  OrderOrderByInput,
}
