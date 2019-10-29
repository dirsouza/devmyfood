import * as UserMutation from './users/Mutation'
import * as ProductQuery from './products/Query'
import * as ProductMutation from './products/Mutation'
import * as OrderQuery from './orders/Query'
import * as OrderMutation from './orders/Mutation'

export default {
  Query: { ...ProductQuery, ...OrderQuery },
  Mutation: { ...ProductMutation, ...UserMutation, ...OrderMutation },
}
