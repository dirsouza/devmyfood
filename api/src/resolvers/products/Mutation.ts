import {
  Resolver,
  ProductCreateArgs,
  ProductUpdateArgs,
  ProductByIdArgs,
  Product,
} from '../../types'
import { findDocument } from '../../utils'

export const createProduct: Resolver<ProductCreateArgs> = (
  _,
  { data },
  { models: { Product } },
) => {
  const product = new Product(data)
  return product.save()
}

export const updateProduct: Resolver<ProductUpdateArgs> = async (
  _,
  { _id, data },
  { models },
) => {
  const product = await findDocument<Product>({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })

  Object.keys(data).forEach(prop => (product[prop] = data[prop]))
  return product.save()
}

export const deleteProduct: Resolver<ProductByIdArgs> = async (
  _,
  { _id },
  { models },
) => {
  const product = await findDocument<Product>({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })

  return product.remove()
}
