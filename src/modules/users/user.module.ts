import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PositionModule } from '../positions/position.module'
import { UserEntity } from './entity/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PositionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
