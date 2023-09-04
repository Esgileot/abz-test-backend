import { Global, Module } from '@nestjs/common'
import { ApiConfigService } from 'src/config/api-config.service'
import { AwsS3Service } from './aws-s3.service'
import { CustomExceptionService } from './custom-exception.service'
import { ImageService } from './image.service'

const providers = [ApiConfigService, CustomExceptionService, ImageService, AwsS3Service]

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
class SharedModule {}

export { SharedModule }
