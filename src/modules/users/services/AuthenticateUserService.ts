import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid email/password combination.', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError('Invalid email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}
