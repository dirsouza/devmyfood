import { ContextParameters } from 'graphql-yoga/dist/types'
import { models } from '../models'
import { Context } from '../types'

export const context = (ctx: ContextParameters): Context => {
  return {
    ...ctx,
    authUser: null,
    models,
  }
}
