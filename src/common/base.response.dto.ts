import { ApiProperty } from '@nestjs/swagger'

export class BaseResponseDto {
  @ApiProperty({ type: Boolean, default: true })
  success: boolean
}
