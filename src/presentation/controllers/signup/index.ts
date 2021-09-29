import { AddAccount } from '../../../domain/usecases/addAccount'
import { MissingParamError, BusinessError, ValidationError } from '../../errors'
import { badRequest, success } from '../../helpers/httpHelper'
import { HttpRequest, HttpResponse, Controller, Validator } from '../../protocols'
export class SignUpController implements Controller {
  private readonly validator: Validator
  private readonly addAccount: AddAccount

  constructor (injectedValidator: Validator, addAccount: AddAccount) {
    this.validator = injectedValidator
    this.addAccount = addAccount
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = this.validator.isFilled(request.body, 'name', 'email', 'password', 'passwordConfirmation')
      if (errors.length) {
        return badRequest(new MissingParamError(errors.join(', ')))
      }

      const { name, password, passwordConfirmation, email } = request.body

      if (password !== passwordConfirmation) {
        return badRequest(new BusinessError("passwords doesn't mactch"))
      }

      if (!this.validator.isValidMail(email)) {
        return badRequest(new ValidationError(`email '${email as string}' is not valid`))
      }

      const newAccount = await this.addAccount.add({
        name,
        email,
        password
      })

      return success(newAccount)
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
