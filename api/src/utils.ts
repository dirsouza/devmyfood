import { Types } from 'mongoose'
import { CheckExistenceOptions, TokenPayload } from './types'
import { CustomError } from './errors'
import { SignOptions, sign } from 'jsonwebtoken'

export const checkExistence = async ({
  model,
  models,
  field,
  value,
  where,
  message,
  errorCode,
  extensions,
}: CheckExistenceOptions): Promise<boolean> => {
  if (field === '_id' && !isMongoId(value))
    throw new CustomError(`Invalid ID value for ${value}!`, 'INVALID_ID_ERROR')

  const exists = await models[model].exists(where || { [field]: value })

  if (!exists)
    throw new CustomError(
      message || `${model} with ${field} '${value}' not found!`,
      errorCode || 'NOT_FOUND_ERROR',
      extensions,
    )

  return exists
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
