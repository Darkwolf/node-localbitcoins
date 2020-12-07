import Error from './Error.mjs'

export default class NotFoundError extends Error {
  static name = 'NotFoundError'
  static code = 'not-found'

  constructor(message, code) {
    super(message || 'Not found.', code || NotFoundError.code)
    this.setName(NotFoundError.name)
  }
}
