import { DBAddAccount } from './db-add-account'

describe('DbAddAccount use case', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (plainText: string): Promise<string> {
        return await Promise.resolve('hashed_value')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DBAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'Valid Name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
