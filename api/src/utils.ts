import { Document, Model, Types, DocumentQuery } from 'mongoose'
import {
  FindDocumentOptions,
  TokenPayload,
  OrderItem,
  PaginationArgs,
} from './types'
import { CustomError } from './errors'
import { SignOptions, sign } from 'jsonwebtoken'

export const findDocument = async <T extends Document>({
  model,
  models,
  field,
  value,
  where,
  message,
  errorCode,
  extensions,
}: FindDocumentOptions): Promise<T> => {
  if (field === '_id' && !isMongoId(value))
    throw new CustomError(`Invalid ID value for ${value}!`, 'INVALID_ID_ERROR')

  const document = await ((models[model] as unknown) as Model<T>)
    .findOne(where || { [field]: value })
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
      'INVALID_ID_VALUE_ERROR',
    )

  const item = items.id(_id)

  if (!item)
    throw new CustomError(
      `Item with id '${_id}' not found to '${operation}'!`,
      'NOT_FOUND_ERROR',
    )

  return item
}

export const paginationAndSort = <T extends Document>(
  query: DocumentQuery<T[], T>,
  { skip = 0, limit = 10 }: PaginationArgs,
): DocumentQuery<T[], T> => {
  return query.skip(skip).limit(limit <= 20 ? limit : 20)
}
