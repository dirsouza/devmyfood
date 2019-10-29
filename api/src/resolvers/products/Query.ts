import { Resolver, ProductByIdArgs, Product, PaginationArgs } from '../../types'
import { findDocument } from '../../utils'

export const products: Resolver<PaginationArgs> = (
  _,
  { skip = 0, limit = 10 },
  { models: { Product } },
) =>
  Product.find()
    .skip(skip)
    .limit(limit)

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
