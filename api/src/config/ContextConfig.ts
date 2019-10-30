import { ContextParameters } from 'graphql-yoga/dist/types'
import { models } from '../models'
import { Context } from '../types'
import { pubsub } from '.'

export const context = (ctx: ContextParameters): Context => {
  return {
    ...ctx,
    authUser: null,
    models,
    pubsub,
  }
}
