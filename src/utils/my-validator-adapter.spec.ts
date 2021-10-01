import { MyValidator } from './my-validator'

describe('Validator adapter', () => {
  test('Should return false if invalid mail is provided', () => {
    const sut = new MyValidator()
    const isValid = sut.isValidMail('invalid_email')
    expect(isValid).toBe(false)
  })

  test('Should return true if valid mail is provided', () => {
    const sut = new MyValidator()
    const isValid = sut.isValidMail('valid_email@mail.com.br')
    expect(isValid).toBe(true)
  })
})
