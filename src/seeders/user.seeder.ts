import { faker } from '@faker-js/faker'
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto'
import axios from 'axios'

export const createUserSeeder = async (): Promise<CreateUserDto> => {
  const user = new CreateUserDto()

  // Генерируем случайное имя пользователя
  user.name = faker.person.firstName()

  // Генерируем случайный адрес электронной почты
  user.email = faker.internet.email()

  // Генерируем случайный номер телефона в формате +380123456789
  user.phone = `+380${faker.phone.number('#########')}`

  // Генерируем случайный идентификатор позиции (position_id)
  user.position_id = faker.number.int({ min: 1, max: 4 }) // Замените на реальные значения

  // Создаем фиктивное изображение пользователя (файл не будет реально загружен)

  const response = await axios.get(faker.image.avatar(), { responseType: 'arraybuffer' })
  if (!response) {
    return
  }

  user.photo = {
    fieldname: 'photo',
    originalname: `${faker.word.words({ count: { min: 1, max: 1 } })}.jpg`,
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: response.data, // Генерируем случайное изображение
    size: 5000, // Укажите реальный размер изображения
  } as Express.Multer.File

  return user
}
