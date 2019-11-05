import { RedisPubSub } from 'graphql-redis-subscriptions'
import { AuthUser, Models } from '.'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { DataLoaders } from './loadersTypes'

export interface Context extends ContextParameters {
  authUser: AuthUser
  models: Models
  pubsub: RedisPubSub
  loaders: DataLoaders
}
