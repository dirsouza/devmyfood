import { withFilter } from 'graphql-yoga'
import { Types } from 'mongoose'
import {
  Order,
  Resolver,
  SubscriptionResolver,
  SubscriptionArgs,
  SubscriptionPayload,
  UserRole,
} from '../../types'
import { buildSubscrition } from '../../utils'

const orderSubscribeFn: Resolver<SubscriptionArgs> = (
  _,
  { where: { mutationIn } },
  { pubsub },
) => pubsub.asyncIterator(buildSubscrition('ORDER', mutationIn))

const orderFilterFn: Resolver<SubscriptionArgs, SubscriptionPayload<Order>> = (
  { node: { user } },
  args,
  { authUser: { _id, role } },
) => (role === UserRole.ADMIN ? true : (user as Types.ObjectId).equals(_id))

export const order: SubscriptionResolver<Order> = {
  subscribe: withFilter(orderSubscribeFn, orderFilterFn),
  resolve: payload => payload,
}
