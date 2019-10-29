import { Document, Types } from 'mongoose'

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthUser {
  _id: Types.ObjectId
  role: UserRole
}

interface UserSignInInput {
  email: string
  password: string
}

export interface UserSignInArgs {
  data: UserSignInInput
}

export interface UserSignUpArgs {
  data: UserSignInInput & { name: string }
}
