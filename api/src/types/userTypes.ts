import { Document, Schema } from 'mongoose'

export enum UserRole {
  USER,
  ADMIN,
}

export interface User extends Document {
  _id: Schema.Types.ObjectId
  name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthUser {
  _id: Schema.Types.ObjectId
  role: UserRole
}

interface UserSignInData {
  email: string
  password: string
}

export interface UserSignInInput {
  data: UserSignInData
}

export interface UserSignUpInput {
  data: UserSignInData & { name: string }
}
