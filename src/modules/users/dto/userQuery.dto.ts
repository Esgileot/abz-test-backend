import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class UserQueryDto {
  @ApiProperty({
    type: Number,
    minimum: 1,
    example: 1,
    required: false,
    description: 'page: (integer - minimum: 1)<br/> Specify the page that you want to retrieve',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number

  @ApiProperty({
    type: Number,
    minimum: 0,
    example: 1,
    required: false,
    description: 'offset: (integer - minimum: 0)<br/> Specify the missing record number',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset?: number

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 5,
    example: 5,
    required: false,
    description: 'count: (integer - default: 5 - minimum: 1 - maximum: 100)<br/> Specify the amount of items that will be retrieved per page',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  count?: number
}
