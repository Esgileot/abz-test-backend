import { Injectable } from '@nestjs/common'
import { Credentials, S3 } from 'aws-sdk'
import { ApiConfigService } from 'src/config/api-config.service'

@Injectable()
class AwsS3Service {
  private readonly s3: S3

  constructor(private configService: ApiConfigService) {
    const options: S3.Types.ClientConfiguration = {
      region: configService.awsRegion,
    }

    // These could be optional if you are running in an AWS environment
    if (configService.s3AccessKey && configService.s3SecretAccessKey) {
      options.credentials = new Credentials({
        accessKeyId: configService.s3AccessKey,
        secretAccessKey: configService.s3SecretAccessKey,
      })
    }

    this.s3 = new S3(options)
  }

  async uploadFile(dataBuffer: Buffer, contentType: string): Promise<S3.ManagedUpload.SendData> {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.s3ImagesBucket,
        Body: dataBuffer,
        Key: `image/${Date.now().toString()}`,
        ACL: 'public-read',
        ContentType: contentType,
      })
      .promise()

    return uploadResult
  }
}

export { AwsS3Service }
