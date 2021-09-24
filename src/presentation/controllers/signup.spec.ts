import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missingParamError'

describe('Signup controller', () => {
  test('Should return 400 if no name provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'some@email.com',
        password: 'some_pwd',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'some',
        password: 'some_pwd',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
