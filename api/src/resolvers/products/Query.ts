import { Resolver, ProductByIdArgs, Product, PaginationArgs } from '../../types'
import {
  findDocument,
  paginationAndSort,
  buildConditions,
  getFields,
} from '../../utils'

export const products: Resolver<PaginationArgs> = (
  _,
  args,
  { models: { Product } },
  info,
) =>
  paginationAndSort(
    Product.find(buildConditions(args.where)).select(getFields(info)),
    args,
  )

export const product: Resolver<ProductByIdArgs> = async (
  _,
  { _id },
  { models },
  info,
) => {
  return await findDocument<Product>({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
    select: getFields(info),
  })
}
