import { MigrationInterface, QueryRunner } from 'typeorm'
import { Position } from 'src/modules/positions/position.enum'
import { PositionEntity } from 'src/modules/positions/entity/position.entity'

export class UsersSeeder1693953274489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager
    for (const position in Position) {
      const entity = manager.create<PositionEntity>(PositionEntity, { name: position })
      manager.save(entity)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
