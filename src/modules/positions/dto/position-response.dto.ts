import { ApiProperty } from '@nestjs/swagger'
import { Position } from '../position.enum'
import { PositionDto } from './position.dto'

export class PositionResponseDto {
  @ApiProperty({
    type: [PositionDto],
    example: [
      {
        id: 1,
        name: Position.Security,
      },
      {
        id: 2,
        name: Position.Designer,
      },
      {
        id: 3,
        name: Position.ContentManager,
      },
      {
        id: 4,
        name: Position.Lawyer,
      },
    ],
    description: 'List of available position',
    uniqueItems: true,
  })
  position: PositionDto[]
}
