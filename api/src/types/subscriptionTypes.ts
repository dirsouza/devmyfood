import { Resolver } from '.'
import { buildSubscrition } from '../utils'

export interface SubscriptionResolver<TNode, TSource = {}> {
  subscribe: Resolver<SubscriptionArgs, TSource>
  resolve: Resolver<SubscriptionArgs, SubscriptionPayload<TNode>>
}

export enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface SubscriptionArgs {
  where: {
    mutationIn: MutationType[]
  }
}

export interface SubscriptionPayload<T> {
  mutation: MutationType[]
  node: T
}

export interface SubscribeFn {
  subscribe: SubscriptionArgs & {
    channel: string
  }
}

export const subscribeFn: Resolver<SubscribeFn> = (
  _,
  { subscribe },
  { pubsub },
) =>
  pubsub.asyncIterator(
    buildSubscrition(subscribe.channel, subscribe.where.mutationIn),
  )
