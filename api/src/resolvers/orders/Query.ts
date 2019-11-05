import {
  Resolver,
  UserRole,
  OrderByIdArgs,
  Order,
  PaginationArgs,
} from '../../types'
import {
  findDocument,
  paginationAndSort,
  buildConditions,
  getFields,
} from '../../utils'

export const orders: Resolver<PaginationArgs> = (
  _,
  args,
  { models: { Order }, authUser: { _id, role } },
  info,
) => {
  let conditions = buildConditions(args.where)
  conditions =
    role === UserRole.USER ? { ...conditions, user: _id } : conditions

  return paginationAndSort(Order.find(conditions).select(getFields(info)), args)
}

export const order: Resolver<OrderByIdArgs> = (
  _,
  { _id },
  { models, authUser: { _id: userId, role } },
  info,
) => {
  const where = role === UserRole.USER ? { user: userId, _id } : null

  return findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
    select: getFields(info),
  })
}
