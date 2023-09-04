import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PositionDto } from './dto/position.dto'
import { PositionEntity } from './entity/position.entity'

@Injectable()
export class PositionService {
  constructor(@InjectRepository(PositionEntity) private readonly positionRepository: Repository<PositionEntity>) {}

  public async getPositionsList(): Promise<PositionDto[]> {
    const positions = this.positionRepository.find()
    if (!positions) {
      throw new UnprocessableEntityException('Positions not found')
    }

    return positions
  }
}
