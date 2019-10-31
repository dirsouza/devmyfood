import { withFilter } from 'graphql-yoga'
import {
  Order,
  Resolver,
  SubscriptionResolver,
  SubscriptionArgs,
  SubscriptionPayload,
} from '../../types'
import { buildSubscribeFn, buildFilterFn } from '../../utils'

const orderSubscribeFn: Resolver<SubscriptionArgs> = (
  _,
  { where: { mutationIn } },
  { pubsub },
) => buildSubscribeFn(mutationIn, 'ORDER', pubsub)

const orderFilterFn: Resolver<SubscriptionArgs, SubscriptionPayload<Order>> = (
  { node: { user } },
  args,
  { authUser },
) => buildFilterFn(user, authUser)

export const order: SubscriptionResolver<Order> = {
  subscribe: withFilter(orderSubscribeFn, orderFilterFn),
  resolve: payload => payload,
}
