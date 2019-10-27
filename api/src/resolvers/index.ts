import * as ProductQuery from './products/Query'
import * as ProductMutation from './products/Mutation'

export default {
  Query: { ...ProductQuery },
  Mutation: { ...ProductMutation },
}
