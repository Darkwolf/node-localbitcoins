import Error from './Error.mjs'

export default class UnknownError extends Error {
  static name = 'UnknownError'
  static code = 'unknown-error'

  constructor(message, code) {
    super(message || 'Unknown error.', code || UnknownError.code)
    this.setName(UnknownError.name)
  }
}
