import { HttpStatus, HttpException } from '@nestjs/common'

export class CustomExceptionService {
  static customError(message: string, status: HttpStatus, fails?: string | Record<string, any[]>) {
    return new HttpException(
      {
        status: status,
        message: message,
        fails: fails,
      },
      status,
    )
  }
}
