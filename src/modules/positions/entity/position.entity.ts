import { BaseEntity } from 'src/common/base.entity'
import { Column, Entity } from 'typeorm'

@Entity('position')
export class PositionEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string
}
