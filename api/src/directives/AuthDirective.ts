import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLField, defaultFieldResolver } from 'graphql'
import { verify } from 'jsonwebtoken'
import { Context, Resolver, TokenPayload } from '../types'
import { CustomError } from '../errors'

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>): void {
    const {
      resolve = defaultFieldResolver,
      subscribe = defaultFieldResolver,
    } = field

    field.resolve = this.authResolver(resolve)
    field.subscribe = this.authResolver(subscribe)
  }

  authResolver(resolver: Resolver<any>): Resolver<any> {
    return (_, args, ctx, info): any => {
      const Authorization = ctx.request
        ? ctx.request.get('Authorization')
        : ctx.connection.context.Authorization ||
          ctx.connection.context.authorization

      if (!Authorization)
        throw new CustomError('Unauthenticated!', 'UNAUTHENTICATED_ERROR', {
          detail: 'Token not providad!',
        })

      try {
        const token = Authorization.replace('Bearer ', '')
        const { sub, role } = verify(
          token,
          process.env.JWT_SECRET || 'iRgef*jA6^R5',
        ) as TokenPayload

        ctx = {
          ...ctx,
          authUser: { _id: sub, role },
        }
      } catch (error) {
        throw new CustomError('Invalid token!', 'INVALID_TOKEN_ERROR', error)
      }

      const { role: expectedRole } = this.args
      const { role: userRole } = ctx.authUser

      if (expectedRole && expectedRole !== userRole)
        throw new CustomError('Unauthorized!', 'UNAUTHORIZED_ERROR', {
          detail: `Required '${expectedRole}' level!`,
        })

      return resolver.apply(this, [_, args, ctx, info])
    }
  }
}
