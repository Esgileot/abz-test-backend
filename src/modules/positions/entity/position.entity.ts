import { BaseEntity } from 'src/common/base.entity'
import { Position } from 'src/modules/positions/position.enum'
import { Column, Entity } from 'typeorm'

@Entity('position')
export class PositionEntity extends BaseEntity {
  @Column({ enum: Position, enumName: 'Position', unique: true })
  name: Position
}
