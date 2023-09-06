import { MigrationInterface, QueryRunner } from 'typeorm'
import { Position } from 'src/modules/positions/position.enum'
import { PositionEntity } from 'src/modules/positions/entity/position.entity'

export class PositionInit16939532591249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager
    for (const position in Position) {
      try {
        const entity = manager.create<PositionEntity>(PositionEntity, { name: position })
        manager.save(entity)
      } catch (err) {
        console.log(`Position cant created:${err}`)
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
