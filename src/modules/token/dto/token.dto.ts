import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TokenDto {
  @ApiProperty({ type: String, title: 'Registration token', description: 'Used it to register new user' })
  @IsNotEmpty({ message: 'Provide registration token' })
  @IsString({ message: 'Token must be a string type' })
  token: string
}
