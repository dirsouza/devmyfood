import { Resolver, ProductByIdInput } from '../../types'
import { checkExistence } from '../../utils'

export const products: Resolver<{}> = (_, args, { models }) =>
  models.Product.find()

export const product: Resolver<ProductByIdInput> = async (
  _,
  { _id },
  { models },
) => {
  const { Product } = models

  await checkExistence({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })

  return Product.findById(_id)
}
