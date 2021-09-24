export interface Validator {
  isValidMail: (email: string) => boolean
  isFilled: (fields: any, ...requiredFields: string[]) => string[]
}
