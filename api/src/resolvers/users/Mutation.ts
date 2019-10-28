import { hash, compare } from 'bcryptjs'
import { Resolver, UserSignInInput, UserSignUpInput } from '../../types'
import { CustomError } from '../../errors'
import { issueToken } from '../../utils'

export const signin: Resolver<UserSignInInput> = async (
  _,
  { data: { email, password } },
  { models: { User } },
) => {
  const error = new CustomError(
    'Invalid Credentials',
    'INVALID_CREDENTIALS_ERROR',
  )
  const user = await User.findOne({ email })

  if (!user) throw error

  if (!(await compare(password, user.password))) throw error

  const { _id: sub, role } = user
  const token = issueToken({ sub, role })

  return { token, user }
}

export const signup: Resolver<UserSignUpInput> = async (
  _,
  { data },
  { models: { User } },
) => {
  const password = await hash(data.password, 10)
  const user = await new User({
    ...data,
    password,
  }).save()

  const { _id: sub, role } = user
  const token = issueToken({ sub, role })

  return { token, user }
}
