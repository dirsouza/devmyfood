import { Resolver, ProductByIdArgs, Product, PaginationArgs } from '../../types'
import { findDocument, paginationAndSort } from '../../utils'

export const products: Resolver<PaginationArgs> = (
  _,
  args,
  { models: { Product } },
) => paginationAndSort(Product.find(), args)

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
