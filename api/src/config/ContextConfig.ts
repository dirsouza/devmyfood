import { ContextParameters } from 'graphql-yoga/dist/types'
import { models } from '../models'
import { Context } from '../types'
import { pubsub } from '.'
import { createLoaders } from '../loaders'

export const context = (ctx: ContextParameters): Context => {
  const loaders = createLoaders(['Product', 'User'])
  return {
    ...ctx,
    authUser: null,
    models,
    pubsub,
    loaders,
  }
}
