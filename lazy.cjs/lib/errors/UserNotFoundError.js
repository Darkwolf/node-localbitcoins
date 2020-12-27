const errors = require('./')

class UserNotFoundError extends errors.NotFoundError {
  constructor(id) {
    super(`User not found: '${id}'.`, UserNotFoundError.code)
    this.setName(UserNotFoundError.name)
  }
}
UserNotFoundError.name = 'UserNotFoundError'
UserNotFoundError.code = 'user-not-found'

module.exports = UserNotFoundError
