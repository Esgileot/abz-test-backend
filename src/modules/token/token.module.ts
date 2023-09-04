import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TokenEntity } from './entity/token.entity'
import { TokenController } from './token.controller'
import { TokenService } from './token.service'

@Global()
@Module({
  exports: [TokenService],
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
