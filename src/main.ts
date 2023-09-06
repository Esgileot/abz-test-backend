import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { exceptionFactory } from './common/exceptionFactory'
import { AppModule } from './modules/main/app.module'
import { setupSwagger } from './swagger'

config({ path: `${process.env.DOTENV_CONFIG_PATH}` })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    allowedHeaders: ['content-type', 'Token'],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: exceptionFactory,
    }),
  )

  // Setup API documentation service
  setupSwagger(app)
  await app.listen(8005)
}
bootstrap()
