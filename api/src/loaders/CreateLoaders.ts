import DataLoader = require('dataloader')
import { Document, Types } from 'mongoose'
import { models } from '../models'
import { Models, DataLoaders, DataLoaderParams } from '../types'
import { batchLoadFn } from '../utils'

export const createLoaders = (modelsNames: (keyof Models)[]): DataLoaders =>
  modelsNames.reduce(
    (loaders, modelName) => {
      const loaderName = `${modelName.toLowerCase()}Loader`

      return {
        ...loaders,
        [loaderName]: new DataLoader<DataLoaderParams, Document>(
          (params): Promise<Document[]> =>
            batchLoadFn(models[modelName], params),
          {
            cacheKeyFn: (param: DataLoaderParams): Types.ObjectId => param.key,
          },
        ),
      }
    },
    {} as DataLoaders,
  )
