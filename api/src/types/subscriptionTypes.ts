import { Resolver } from '.'

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
