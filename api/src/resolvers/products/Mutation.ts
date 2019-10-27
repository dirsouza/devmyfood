import {
  Resolver,
  ProductCreateInput,
  ProductUpdateInput,
  ProductByIdInput,
} from '../../types'
import { checkExistence } from '../../utils'

export const createProduct: Resolver<ProductCreateInput> = (
  _,
  { data },
  { models },
) => {
  const { Product } = models
  const product = new Product(data)
  return product.save()
}

export const updateProduct: Resolver<ProductUpdateInput> = async (
  _,
  { _id, data },
  { models },
) => {
  const { Product } = models

  await checkExistence({
    model: 'Product',
    models,
    field: '_id',
    value: _id,
  })

  return Product.findByIdAndUpdate(_id, data, { new: true })
}

export const deleteProduct: Resolver<ProductByIdInput> = async (
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

  return Product.findByIdAndDelete(_id)
}
