import Error from './Error.mjs'

export default class BadRequestError extends Error {
  static name = 'BadRequestError'
  static code = 'bad-request'

  constructor(message, code) {
    super(message || 'Bad request.', code || BadRequestError.code)
    this.setName(BadRequestError.name)
  }
}
