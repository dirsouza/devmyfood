import { Models } from '.'

export interface CheckExistenceOptions {
  model: keyof Models
  models: Models
  field?: string
  value?: any
  message?: string
  where?: Record<string, any>
  errorCode?: string
  extensions?: Record<string, any>
}
