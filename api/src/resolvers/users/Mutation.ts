import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserSignUpInput, Resolver } from '../../types'

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
  const token = sign({ sub, role }, process.env.JWT_SECRET || 'iRgef*jA6^R5', {
    expiresIn: '2h',
  })

  return { token, user }
}
