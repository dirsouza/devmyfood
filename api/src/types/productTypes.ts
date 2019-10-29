import { Document, Types } from 'mongoose'
import { OmitId } from '.'

export interface Product extends Document {
  _id: Types.ObjectId
  name: string
  description: string
  prime: number
  unit: string
}

export interface ProductCreateArgs {
  data: OmitId<Product>
}

export interface ProductUpdateArgs extends ProductByIdArgs, ProductCreateArgs {}

export interface ProductByIdArgs {
  _id: string
}
