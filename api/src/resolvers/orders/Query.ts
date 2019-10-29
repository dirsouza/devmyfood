import {
  Resolver,
  UserRole,
  OrderByIdArgs,
  Order,
  PaginationArgs,
} from '../../types'
import { findDocument } from '../../utils'

export const orders: Resolver<PaginationArgs> = (
  _,
  { skip = 0, limit = 10 },
  { models: { Order }, authUser: { _id, role } },
) => {
  const conditions = role === UserRole.USER ? { user: _id } : {}

  return Order.find(conditions)
    .skip(skip)
    .limit(limit)
}

export const order: Resolver<OrderByIdArgs> = (
  _,
  { _id },
  { models, authUser: { _id: userId, role } },
) => {
  const where = role === UserRole.USER ? { user: userId, _id } : null

  return findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
  })
}
