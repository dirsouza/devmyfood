import { Resolver, ProductByIdArgs, Product } from '../../types'
import { findDocument } from '../../utils'

export const products: Resolver<{}> = (_, args, { models }) =>
  models.Product.find()

export const product: Resolver<ProductByIdArgs> = async (
  _,
  { _id },
  { models },
) => {
  return await findDocument<Product>({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })
}
