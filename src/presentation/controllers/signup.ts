import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest } from '../helpers/httpHelper'
import { BusinessError } from '../errors/businessError'
import { Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (request: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredField) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { password, passwordConfirmation } = request.body

    if (password !== passwordConfirmation) {
      return badRequest(new BusinessError('passwords doesn`t mactch'))
    }

    return {
      statusCode: 200,
      body: 'Sucesso'
    }
  }
}
