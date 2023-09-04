import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common'

export const validationPipes = [
  new MaxFileSizeValidator({
    maxSize: 1024 * 1024 * 5,
  }),
  new FileTypeValidator({
    fileType: 'image/jpeg',
  }),
]
