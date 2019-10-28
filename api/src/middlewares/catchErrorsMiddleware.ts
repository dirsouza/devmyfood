import { IMiddlewareResolver } from 'graphql-middleware/dist/types'
import { Context } from '../types'
import { CustomError } from '../errors'

export const catchErrorsMiddleware: IMiddlewareResolver<any, Context> = async (
  resolver,
  ...args
) => {
  try {
    return await resolver(...args)
  } catch (error) {
    console.log(error)
    if (error instanceof CustomError) throw error
    throw new CustomError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
  }
}
