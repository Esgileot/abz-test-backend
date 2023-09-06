import { config } from 'dotenv'
import { join } from 'path'
import { env } from 'process'
import { DataSource } from 'typeorm'

config()

export default new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: Boolean(env.DB_SYNC),
  ssl: Boolean(env.DB_SSL),
})
