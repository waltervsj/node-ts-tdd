import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    try {
      let { name, email, password } = account
      password = await this.encrypter.encrypt(password)

      const accountModel: AccountModel = {
        id: '',
        name,
        email,
        password
      }

      return await Promise.resolve(accountModel)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
