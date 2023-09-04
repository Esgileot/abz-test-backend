import { ApiProperty } from '@nestjs/swagger'
import { Position } from 'src/modules/positions/position.enum'

export class PositionDto {
  @ApiProperty({ type: Number })
  id: number

  @ApiProperty({ enum: Position, enumName: 'Position' })
  name: Position
}
