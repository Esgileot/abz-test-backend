import { Injectable, NestMiddleware } from '@nestjs/common'
import { throws } from 'assert'
import * as multer from 'multer'

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  public readonly filename: string
  constructor(filename: string) {
    this.filename = filename
  }

  use(req, res, next) {
    const storage = multer.memoryStorage()
    const upload = multer({
      storage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }).single(this.filename)

    upload(req, res, err => {
      if (err) {
        return res.status(400).json({ message: 'File upload failed', error: err.message })
      }
      next()
    })
  }
}
