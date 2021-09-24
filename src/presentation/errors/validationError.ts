export class ValidationError extends Error {
  constructor (error: string) {
    super(`Validation error: ${error}`)
    this.name = 'ValidationError'
  }
}
