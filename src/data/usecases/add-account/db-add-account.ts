import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Encrypter } from '../../protocols/encrypter'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    try {
      let { password } = accountData
      password = await this.encrypter.encrypt(password)
      const addedAccount = await this.addAccountRepository.add({ ...accountData, password })
      return await Promise.resolve(addedAccount)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
