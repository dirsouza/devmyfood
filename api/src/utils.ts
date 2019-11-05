import { Document, Model, Types, DocumentQuery } from 'mongoose'
import {
  FindDocumentOptions,
  TokenPayload,
  OrderItem,
  PaginationArgs,
  AuthUser,
  User,
  UserRole,
  MutationType,
  GetFieldsOptions,
} from './types'
import { CustomError } from './errors'
import { SignOptions, sign } from 'jsonwebtoken'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { GraphQLResolveInfo } from 'graphql'
import { fieldsList } from 'graphql-fields-list'

export const findDocument = async <T extends Document>({
  model,
  models,
  field,
  value,
  where,
  message,
  errorCode,
  extensions,
  select,
}: FindDocumentOptions): Promise<T> => {
  if (field === '_id' && !isMongoId(value))
    throw new CustomError(`Invalid ID value for ${value}!`, 'INVALID_ID_ERROR')

  const document = await ((models[model] as unknown) as Model<T>)
    .findOne(where || { [field]: value })
    .select(select)
    .exec()

  if (!document)
    throw new CustomError(
      message || `${model} with ${field} '${value}' not found!`,
      errorCode || 'NOT_FOUND_ERROR',
      extensions,
    )

  return document
}

export const isMongoId = (_id: string): boolean => Types.ObjectId.isValid(_id)

export const issueToken = (
  payload: TokenPayload,
  options?: SignOptions,
): string =>
  sign(payload, process.env.JWT_SECRET || 'iRgef*jA6^R5', {
    expiresIn: '2h',
    ...options,
  })

export const findOrderItem = (
  _id: string,
  items: Types.DocumentArray<OrderItem>,
  operation: 'update' | 'delete',
): OrderItem => {
  if (!isMongoId(_id))
    throw new CustomError(
      `Invalid ID value for '${_id}' in item to '${operation}'!`,
      'INVALID_ID_ERROR',
    )

  const item = items.id(_id)

  if (!item)
    throw new CustomError(
      `Item with id '${_id}' not found to '${operation}'!`,
      'NOT_FOUND_ERROR',
    )

  return item
}

export const buildOrderByResolvers = (
  fields: string[],
): Record<string, string> =>
  fields.reduce(
    (resolvers, field) => ({
      ...resolvers,
      [`${field}_ASC`]: field,
      [`${field}_DESC`]: `-${field}`,
    }),
    {},
  )

const operatiors = [
  { name: 'Eq', op: '$eq' },
  { name: 'Ne', op: '$ne' },
  { name: 'Lt', op: '$lt' },
  { name: 'Lte', op: '$lte' },
  { name: 'Gt', op: '$gt' },
  { name: 'Gte', op: '$gte' },
  { name: 'In', op: '$in' },
  { name: 'Nin', op: '$nin' },
  { name: 'Regex', op: '$regex' },
  { name: 'Options', op: '$options' },
]

const idFields = ['user']

export const buildConditions = (
  where: Record<string, any> = {},
): Record<string, any> =>
  Object.keys(where).reduce((conditions, whereKey) => {
    if (idFields.some(idField => whereKey.includes(idField))) {
      const ids: string[] = Array.isArray(where[whereKey])
        ? where[whereKey]
        : [where[whereKey]]

      if (ids.some(id => !isMongoId(id)))
        throw new CustomError(
          `Invalid ID value for condition '${whereKey}'!`,
          'INVALID_ID_ERROR',
        )
    }

    const operator = operatiors.find(({ name }) =>
      new RegExp(`${name}$`).test(whereKey),
    )

    const fieldName = operator
      ? whereKey.replace(operator.name, '')
      : `$${whereKey.toLowerCase()}`

    const fieldValue = operator
      ? { ...conditions[fieldName], [operator.op]: where[whereKey] }
      : where[whereKey].map(buildConditions)

    return { ...conditions, [fieldName]: fieldValue }
  }, {})

export const paginationAndSort = <T extends Document>(
  query: DocumentQuery<T[], T>,
  { skip = 0, limit = 10, orderBy = [] }: PaginationArgs,
): DocumentQuery<T[], T> =>
  query
    .skip(skip)
    .limit(limit <= 20 ? limit : 20)
    .sort(orderBy.join(' '))

export const buildSubscrition = (
  channel: string,
  mutations: string[],
): string[] => mutations.map(m => `${channel.toUpperCase()}_${m}`)

export const buildPublishSubscribe = (
  pupsub: RedisPubSub,
  channel: string,
  mutation: MutationType,
  node: Document,
) =>
  pupsub.publish(channel, {
    mutation,
    node,
  })

export const buildSubscribeFn = (
  mutationIn: string[],
  channel: string,
  pubsub: RedisPubSub,
) => pubsub.asyncIterator(buildSubscrition(channel, mutationIn))

export const buildFilterFn = (
  user: User | Types.ObjectId,
  { _id, role }: AuthUser,
) => (role === UserRole.ADMIN ? true : user === _id)

export const getFields = (
  info: GraphQLResolveInfo,
  options?: GetFieldsOptions,
): string => {
  let fields = fieldsList(info)

  if (options) {
    const { include = [], skip = [] } = options
    fields = fields.concat(include).filter(f => !skip.includes(f))
  }

  return fields.join(' ')
}
