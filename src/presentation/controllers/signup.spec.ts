import { SignUpController } from './signup'
import { Controller } from '../protocols'
import { MyValidator } from '../helpers/myValidator'
import { ValidationError, MissingParamError, BusinessError } from '../errors'
import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecases/addAccount'

const makeSut = (): Controller => {
  const validator = new MyValidator()
  const addAccountStub = makeAddAccount()
  return new SignUpController(validator, addAccountStub)
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
  }

  return new AddAccountStub()
}

describe('Signup controller', () => {
  test('Should return 400 if no name provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
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

  test('Should return 400 if no password and passwordConfirmation is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'some@email.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password, passwordConfirmation'))
  })

  test("Should return 400 if passwords doesn't match", () => {
    const sut = makeSut()
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
    expect(httpResponse.body).toEqual(new BusinessError("passwords doesn't mactch"))
  })

  test('Should return 400 if and invalid email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'email',
        password: 'some_pwd',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ValidationError(`email '${httpRequest.body.email}' is not valid`))
  })

  test('Should return 500 if exception occour', () => {
    const sut = makeSut()
    const httpResponse = sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 if success', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'email@email.com',
        password: 'some_pwd',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
