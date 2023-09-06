import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'Oleg', description: 'name - user name, should be 2-60 characters' })
  @IsString({ message: 'Name must be a string type' })
  @Length(2, 60)
  @Transform(({ value }) => value.trim()) // Trim whitespace from the input
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, example: 'example@gmail.com', description: 'email - user email, must be a valid email according to RFC2822' })
  @IsString({ message: 'Email must be a string type' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    type: String,
    example: '+380123456789',
    description: 'Phone number in the format +380123456789 (13 digits)',
  })
  @Length(13, 13, { message: 'Phone number must be exactly 13 characters long' })
  @Matches(/^[\+]{0,1}380([0-9]{9})$/, { message: 'Invalid Ukrainian phone number' })
  @Transform(({ value }) => value.trim()) // Remove spaces from the phone number
  @IsNotEmpty()
  phone: string

  @ApiProperty({
    type: Number,
    example: 4,
    description: 'position_id - user position id. You can get a list of all positions with their IDs using the API method GET /positions',
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  position_id: number

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'photo - user photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB',
  })
  photo: Express.Multer.File
}
