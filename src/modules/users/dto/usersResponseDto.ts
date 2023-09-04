import { ApiProperty } from '@nestjs/swagger'
import { LinksDto } from './links.dto'
import { UserDto } from './user.dto'

export class UsersResponseDto {
  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  page: number

  @ApiProperty({ type: Number, example: 5 })
  total_pages: number

  @ApiProperty({ type: Number, example: 50 })
  total_users: number

  @ApiProperty({ type: Number, example: 10, default: 5 })
  count: number

  @ApiProperty({
    type: LinksDto,
    example: {
      next_url: 'https://example.com/users?page=3&count=1',
      prev_url: 'https://example.com/users?page=1&count=1',
    },
  })
  links: LinksDto

  @ApiProperty({ type: [UserDto] })
  users: UserDto[]
}
