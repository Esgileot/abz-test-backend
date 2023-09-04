import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PositionEntity } from './entity/position.entity'
import { PositionController } from './position.controller'
import { PositionService } from './position.service'

@Module({
  exports: [PositionService],
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
