import Error from './Error.mjs'

export default class ForbiddenError extends Error {
  static name = 'ForbiddenError'
  static code = 'forbidden'

  constructor(message, code) {
    super(message || 'Forbidden.', code || ForbiddenError.code)
    this.setName(ForbiddenError.name)
  }
}
