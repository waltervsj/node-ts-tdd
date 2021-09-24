import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest } from '../helpers/httpHelper'
import { BusinessError } from '../errors/businessError'
import { Controller } from '../protocols/controller'
import { InvalidParamError } from '../errors/invalidParamError'
import { Validator } from '../protocols/validator'
import { ValidationError } from '../errors/validationError'
export class SignUpController implements Controller {
  private readonly validator: Validator

  constructor (injectedValidator: Validator) {
    this.validator = injectedValidator
  }

  handle (request: HttpRequest): HttpResponse {
    const errors = this.validator.isFilled(request.body, 'name', 'email', 'password', 'passwordConfirmation')
    if (errors.length) {
      return badRequest(new MissingParamError(errors.join(', ')))
    }

    const { password, passwordConfirmation, email } = request.body

    if (password !== passwordConfirmation) {
      return badRequest(new BusinessError("passwords doesn't mactch"))
    }

    if (!this.validator.isValidMail(email)) {
      return badRequest(new ValidationError(`email '${email as string}' is not valid`))
    }

    return {
      statusCode: 200,
      body: 'Sucesso'
    }
  }
}
