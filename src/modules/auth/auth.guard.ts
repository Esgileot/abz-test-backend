import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiConfigService } from 'src/config/api-config.service'
import { TokenService } from 'src/modules/token/token.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(ApiConfigService) private readonly configService: ApiConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.token
    if (!token) {
      throw new UnauthorizedException('Provide a token')
    }
    try {
      this.jwtService.verify(token, {
        secret: this.configService.jwtKey,
      })
      const active = await this.tokenService.checkToken(token)
      if (!active) {
        throw new UnauthorizedException('Token is expired')
      }
    } catch {
      throw new UnauthorizedException('Token is expired')
    }
    return true
  }
}
