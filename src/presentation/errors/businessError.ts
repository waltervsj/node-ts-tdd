export class BusinessError extends Error {
  constructor (error: string) {
    super(`Business error: ${error}`)
    this.name = 'BusinessError'
  }
}
