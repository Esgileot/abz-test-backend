import { ApiProperty } from '@nestjs/swagger'

export class PositionDto {
  @ApiProperty({ type: Number })
  id: number

  @ApiProperty({ type: String })
  name: string
}
