import { BaseEntity } from 'src/common/base.entity'
import { Column, Entity } from 'typeorm'
import { Position } from '../../positions/position.enum'

@Entity('position')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: Position
}
