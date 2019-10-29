import { Resolver, ProductByIdInput, Product } from '../../types'
import { findDocument } from '../../utils'

export const products: Resolver<{}> = (_, args, { models }) => models.Product.find()

export const product: Resolver<ProductByIdInput> = async (_, { _id }, { models }) => {
  return await findDocument<Product>({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })
}
