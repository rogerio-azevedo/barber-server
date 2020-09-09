import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { email },
    })

    if (!user) {
      throw new Error('Invalid email/password combination.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Invalid email/password combination.')
    }

    const token = sign({}, 'bc3cd695f4288be531564dd4bd54a1ac', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}
