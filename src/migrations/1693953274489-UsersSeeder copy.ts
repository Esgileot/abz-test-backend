import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserService } from 'src/modules/users/user.service'
import { createUserSeeder } from 'src/seeders/user.seeder'
export class UsersSeeder1693953274489 implements MigrationInterface {
  constructor(private readonly userService: UserService) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 1; i < 45; i++) {
      try {
        const candidate = await createUserSeeder()
        await this.userService.createUser(candidate)
      } catch (err) {
        console.log(`User cant created:${err}`)
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
