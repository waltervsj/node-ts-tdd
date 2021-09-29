import { Validator } from '../protocols/validator'

export class MyValidator implements Validator {
  isValidMail (email: string): boolean {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  }

  isFilled (fields: any, ...requiredFields: string[]): string[] {
    return requiredFields.filter(requiredField => {
      if (!fields[requiredField]) {
        return requiredField
      }
      return false
    })
  }
}
