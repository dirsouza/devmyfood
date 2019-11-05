import { Types } from 'mongoose'
import {
  Resolver,
  OrderCreateArgs,
  UserRole,
  OrderDeleteArgs,
  Order,
  OrderUpdateArgs,
  MutationType,
} from '../../types'
import {
  findDocument,
  findOrderItem,
  buildPublishSubscribe,
  getFields,
} from '../../utils'

export const createOrder: Resolver<OrderCreateArgs> = async (
  _,
  { data },
  { models: { Order }, authUser: { _id, role }, pubsub },
) => {
  const user = role === UserRole.USER ? _id : data.user || _id
  const total =
    (data &&
      data.items &&
      data.items.reduce((sum, item) => sum + item.total, 0)) ||
    0

  const order = await new Order({
    ...data,
    total,
    user,
  }).save()

  buildPublishSubscribe(pubsub, 'ORDER_CREATED', MutationType.CREATED, order)

  return order
}

export const updateOrder: Resolver<OrderUpdateArgs> = async (
  _,
  { _id, data },
  { models, authUser: { _id: userId, role }, pubsub },
  info,
) => {
  const isAdmin = role === UserRole.ADMIN
  const where = !isAdmin ? { _id, user: userId } : null
  const order = await findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
    select: getFields(info, { include: ['user', 'items', 'status'] }),
  })
  const user = !isAdmin ? userId : data.user || order.user
  const {
    itemsToUpdate = [],
    itemsToDelete = [],
    itemsToAdd = [],
    status,
  } = data

  itemsToUpdate
    .map(orderItem => findOrderItem(orderItem._id, order.items, 'update'))
    .forEach((orderItem, index) => orderItem.set(itemsToUpdate[index]))

  itemsToDelete
    .map(orderItemId => findOrderItem(orderItemId, order.items, 'delete'))
    .forEach(orderItem => orderItem.remove())

  itemsToAdd.forEach(itemToAdd => {
    const foundItem = order.items.find(item =>
      (item.product as Types.ObjectId).equals(itemToAdd.product),
    )

    if (foundItem)
      return foundItem.set({
        quantity: foundItem.quantity + itemToAdd.quantity,
        total: foundItem.total + itemToAdd.total,
      })

    order.items.push(itemToAdd)
  })

  await order
    .set({
      user,
      status: status || order.status,
      total: order.items.reduce((sum, item) => sum + item.total, 0),
    })
    .save()

  buildPublishSubscribe(pubsub, 'ORDER_UPDATED', MutationType.UPDATED, order)

  return order
}

export const deleteOrder: Resolver<OrderDeleteArgs> = async (
  _,
  { _id },
  { models, authUser: { _id: userId, role }, pubsub },
  info,
) => {
  const where = role === UserRole.USER ? { _id, user: userId } : null
  const order = await findDocument<Order>({
    model: 'Order',
    models,
    field: '_id',
    value: _id,
    where,
    select: getFields(info, { include: ['user'] }),
  })

  await order.remove()

  buildPublishSubscribe(pubsub, 'ORDER_DELETED', MutationType.DELETED, order)

  return order
}
