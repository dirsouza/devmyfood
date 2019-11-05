import DataLoader from 'dataloader'
import { Types } from 'mongoose'
import { Product, User } from '.'

export interface DataLoaderParams {
  key: Types.ObjectId
  select: string
}

export interface DataLoaders {
  productLoader: DataLoader<DataLoaderParams, Product>
  userLoader: DataLoader<DataLoaderParams, User>
}
