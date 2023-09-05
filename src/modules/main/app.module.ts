import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApiConfigService } from 'src/config/api-config.service'
import { AuthModule } from '../auth/auth.module'
import { PositionModule } from '../positions/position.module'
import { SharedModule } from '../shared/shared.module'
import { TokenModule } from '../token/token.module'
import { UserModule } from '../users/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.dbConfig,
      inject: [ApiConfigService],
    }),
    MulterModule.register({
      dest: './upload',
      storage: './upload',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: 2400 },
    }),
    PositionModule,
    TokenModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
