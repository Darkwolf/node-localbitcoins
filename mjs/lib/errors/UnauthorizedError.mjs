import Error from './Error.mjs'

export default class UnauthorizedError extends Error {
  static name = 'UnauthorizedError'
  static code = 'unauthorized'

  constructor(message, code) {
    super(message || 'Unauthorized.', code || UnauthorizedError.code)
    this.setName(UnauthorizedError.name)
  }
}
