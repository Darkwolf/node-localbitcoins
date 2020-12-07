import NotFoundError from './NotFoundError.mjs'

export default class UserNotFoundError extends NotFoundError {
  static name = 'UserNotFoundError'
  static code = 'user-not-found'

  constructor(id) {
    super(`User not found: '${id}'.`, UserNotFoundError.code)
    this.setName(UserNotFoundError.name)
  }
}
