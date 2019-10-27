import { Models } from '.'

export interface CheckExistenceOptions {
  model: keyof Models
  models: Models
  field?: string
  value?: any
  message?: string
  where?: { [key: string]: any }
}
