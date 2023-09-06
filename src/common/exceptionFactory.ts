import { HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { CustomExceptionService } from 'src/modules/shared/custom-exception.service'

export const exceptionFactory = (errors: ValidationError[]) => {
  const fails = {}

  for (const error in errors) {
    const constrains = []
    for (const constraion in errors[error].constraints) {
      constrains.push(Object(errors[error].constraints[constraion]))
    }
    fails[errors[error].property] = constrains
  }

  throw CustomExceptionService.customError('Validation failed', HttpStatus.UNPROCESSABLE_ENTITY, fails)
}
