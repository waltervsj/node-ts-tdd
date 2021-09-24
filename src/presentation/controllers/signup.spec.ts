import { SignUpController } from './signup'

describe('Signup controller', () => {
  test('Shoul return 400 if no name provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'some',
        email: 'some@email.com',
        password: 'some_pwd',
        passwordConfirmation: 'some_pwd'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
