import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missingParamError'
import { BusinessError } from '../errors/businessError'

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

  test('Should return 400 if no email is provided', () => {
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

  test('Should return 400 if no password is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'some@email.com',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'some@email.com',
        password: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test("Should return 400 if passwords doesn't match", () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'some@email.com',
        password: 'some_pwd',
        passwordConfirmation: 'other_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new BusinessError('passwords doesn`t mactch'))
  })
})
