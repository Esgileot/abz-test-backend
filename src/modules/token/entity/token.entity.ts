import { BaseEntity } from 'src/common/base.entity'
import { Column, Entity } from 'typeorm'

@Entity('token')
export class TokenEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  token: string

  @Column({ type: 'boolean', default: false })
  used: boolean
}
