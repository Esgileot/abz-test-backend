import { Inject, Injectable } from '@nestjs/common'
import { ApiConfigService } from 'src/config/api-config.service'
import tinify from 'tinify'

@Injectable()
export class ImageService {
  constructor(@Inject(ApiConfigService) private readonly configService: ApiConfigService) {
    tinify.key = this.configService.tinifyApiKey
  }

  public async compressImage(inputBuffer: Buffer, height: number, width: number): Promise<Uint8Array> {
    // Compress the image using Tinify
    const source = tinify.fromBuffer(inputBuffer)
    const resized = source.resize({
      method: 'cover',
      height: height,
      width: width,
    })
    return await resized.toBuffer()
  }
}
