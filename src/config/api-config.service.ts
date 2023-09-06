import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtKey(): string {
    return this.configService.get('JWT_KEY')
  }

  get tinifyApiKey(): string {
    return this.configService.get('TINIFY_API_KEY')
  }

  get appDomain(): string {
    return this.configService.get('APP_DOMAIN')
  }
  get port(): number {
    return parseInt(this.configService.get('APP_PORT'), 10)
  }

  get awsRegion(): string {
    return this.configService.get('S3_REGION')
  }

  get s3AccessKey(): string {
    return this.configService.get('AWS_ACCESS_KEY_ID')
  }

  get s3SecretAccessKey(): string {
    return this.configService.get('AWS_SECRET_ACCESS_KEY')
  }

  get s3ImagesBucket(): string {
    return this.configService.get('S3_IMAGES_BUCKET')
  }

  get dbHost(): string {
    return this.configService.get('DB_HOST')
  }

  get dbSync(): boolean {
    return this.configService.get('DB_SYNC')
  }

  get dbUseSSL(): boolean {
    return this.configService.get('DB_SSL')
  }

  get dbPort(): number {
    return parseInt(this.configService.get('DB_PORT'), 10)
  }

  get dbUserName(): string {
    return this.configService.get('DB_USERNAME')
  }

  get dbPassword(): string {
    return this.configService.get('DB_PASSWORD')
  }

  get dbDatabase(): string {
    return this.configService.get('DB_DATABASE')
  }

  get enableDbLog(): boolean {
    return this.configService.get('DB_LOGGING')
  }
  get dbConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUserName,
      password: this.dbPassword,
      database: this.dbDatabase,
      synchronize: this.dbSync,
      ssl: this.dbUseSSL,
      logging: this.enableDbLog,
      entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
      migrationsRun: true,
    }
  }
}
