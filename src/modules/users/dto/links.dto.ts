import { ApiProperty } from '@nestjs/swagger'

export class LinksDto {
  @ApiProperty({ type: String })
  next_url: string | null

  @ApiProperty({ type: String })
  prev_url: string | null
}
