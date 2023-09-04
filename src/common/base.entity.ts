import { PrimaryGeneratedColumn } from 'typeorm'

class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number
}

export { BaseEntity }
