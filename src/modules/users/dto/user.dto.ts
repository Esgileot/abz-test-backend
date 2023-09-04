import { ApiProperty } from '@nestjs/swagger'
import { Position } from '../../positions/position.enum'

export class UserDto {
  @ApiProperty({ type: Number, example: 12, description: 'id' })
  id: number

  @ApiProperty({ type: String, example: 'Oleg' })
  name: string

  @ApiProperty({ type: String, example: 'example@gmail.com' })
  email: string

  @ApiProperty({ type: 'string', example: '+380123456789' })
  phone: string

  @ApiProperty({ type: String, example: Position.Security })
  position: string

  @ApiProperty({ type: Number, example: 4 })
  position_id: number

  @ApiProperty({ type: Number, example: 12315123112 })
  registration_timestamp: number

  @ApiProperty({ type: String, example: 'https://image-destination-abz.s3.eu-west-2.amazonaws.com/image/image.png' })
  photo: string
}
