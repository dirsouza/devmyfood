import {
  Resolver,
  OrderCreateArgs,
  UserRole,
  OrderDeleteArgs,
  Order,
  OrderUpdateArgs,
} from '../../types'
import { findDocument } from '../../utils'

export const createOrder: Resolver<OrderCreateArgs> = async (
  _,
  { data },
  { models: { Order }, authUser: { _id, role } },
) => {
  const user = role === UserRole.USER ? _id : data.user || _id
  const total = (data.items && data.items.reduce((sum, item) => sum + item.total, 0)) || 0

  return await new Order({
    ...data,
    total,
    user,
  }).save()
}

export const updateOrder: Resolver<OrderUpdateArgs> = async (
  _,
  { _id, data },
  { models, authUser: { _id: userId, role } },
) => {
  const isAdmin = role === UserRole.ADMIN
  const where = !isAdmin ? { _id, user: userId } : null
  const order = await findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
  })

  const user = !isAdmin ? userId : data.user || order.user

  order.user = user

  return order.save()
}

export const deleteOrder: Resolver<OrderDeleteArgs> = async (
  _,
  { _id },
  { models, authUser: { _id: userId, role } },
) => {
  const where = role === UserRole.USER ? { _id, user: userId } : null
  const order = await findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
  })

  return order.remove()
}
