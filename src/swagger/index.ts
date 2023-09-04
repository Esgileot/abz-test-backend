import { SWAGGER_API_CURRENT_VERSION, SWAGGER_API_DESCRIPTION, SWAGGER_API_NAME, SWAGGER_API_ROOT } from './constant'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth({ type: 'apiKey', name: 'Token', in: 'header', description: 'Token to create user' }, 'Token')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document)
}
