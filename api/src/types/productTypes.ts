import { Document, Schema } from 'mongoose'
import { OmitId } from '.'

export interface Product extends Document {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  prime: number
  unit: string
}

export interface ProductCreateInput {
  data: OmitId<Product>
}

export interface ProductUpdateInput
  extends ProductByIdInput,
    ProductCreateInput {}

export interface ProductByIdInput {
  _id: Schema.Types.ObjectId
}