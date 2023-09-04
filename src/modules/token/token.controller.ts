import { Controller, Get, Inject } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { TokenDto } from './dto/token.dto'
import { TokenService } from './token.service'

@Controller('token')
export class TokenController {
  constructor(@Inject(TokenService) private readonly tokenService: TokenService) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    type: TokenDto,
    description:
      'Method returns a token that is required to register a new user. The token is valid for 40 minutes and can be used for only one request. For the next registration, you will need to get a new one.',
  })
  @ApiOperation({ summary: 'Get token for user registration' })
  public getRegistrationToken(): TokenDto {
    return this.tokenService.getRegistrationToken()
  }
}
