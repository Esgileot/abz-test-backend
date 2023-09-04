import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TokenDto } from './dto/token.dto'
import { TokenEntity } from './entity/token.entity'

@Injectable()
export class TokenService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  // Generate new token
  public getRegistrationToken(): TokenDto {
    const token = this.jwtService.sign({ active: true }, { expiresIn: 2400 })
    this.tokenRepository.save({ token: token, used: false })
    return { token: token }
  }

  // Сheck if the token is used and set used
  public async checkToken(token: string): Promise<boolean> {
    const isExistsToken = await this.tokenRepository.findOneBy({ token: token })
    if (!isExistsToken || isExistsToken.used) {
      return false
    }

    await this.tokenRepository.update({ token: token }, { ...isExistsToken, used: true })
    return true
  }
}
