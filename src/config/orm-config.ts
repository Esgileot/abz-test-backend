module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  entities: ['dist/**/*.entity.js'], // Путь к вашим сущностям (entity) в скомпилированных файлах
  synchronize: true, // Включите синхронизацию схемы (в разработке)
}
