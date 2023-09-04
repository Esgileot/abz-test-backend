import { BaseEntity } from 'src/common/base.entity'
import { Column, Entity } from 'typeorm'

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60 })
  name: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Column({ type: 'varchar', length: 13, unique: true })
  phone: string

  @Column({ type: 'varchar' })
  position: string

  @Column({ type: 'integer' })
  position_id: number

  @Column({ type: 'integer' })
  registration_timestamp: number

  @Column({ type: 'text' })
  photo: string
}
