import { MigrationInterface, QueryRunner } from 'typeorm'
import { faker } from '@faker-js/faker'
import { UserEntity } from 'src/modules/users/entity/user.entity'
import { PositionEntity } from 'src/modules/positions/entity/position.entity'

export class UsersSeeder1693953274489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager

    for (let i = 1; i < 45; i++) {
      try {
        const candidate = await this.generateUserData()
        const position = await manager.findOne(PositionEntity, { where: { id: candidate.position_id } })
        const entity = manager.create<UserEntity>(UserEntity, { ...candidate, position: position.name })
        manager.save(entity)
      } catch (err) {
        console.log(`User cant created:${err}`)
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async generateUserData(): Promise<UserEntity> {
    const user = new UserEntity()
    // Генерируем случайное имя пользователя
    user.name = faker.person.firstName()

    // Генерируем случайный адрес электронной почты
    user.email = faker.internet.email()

    // Генерируем случайный номер телефона в формате +380123456789
    user.phone = `+380${faker.phone.number(`${faker.number.int({ min: 6, max: 9 })}########`)}`

    // Генерируем случайный идентификатор позиции (position_id)
    user.position_id = faker.number.int({ min: 1, max: 4 }) // Замените на реальные значения

    user.registration_timestamp = faker.number.int({ min: 1000000000, max: 1500000000 })
    // Создаем фиктивное изображение пользователя (файл не будет реально загружен)
    user.photo = faker.image.avatar()

    return user
  }
}
