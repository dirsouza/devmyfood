import { AuthUser, Models } from '.'
import { PubSub } from 'graphql-yoga'
import { ContextParameters } from 'graphql-yoga/dist/types'

export interface Context extends ContextParameters {
  authUser: AuthUser
  models: Models
  pubsub: PubSub
}
