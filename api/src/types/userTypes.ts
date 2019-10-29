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
