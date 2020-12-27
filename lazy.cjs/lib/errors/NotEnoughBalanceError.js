const errors = require('./')

class NotEnoughBalanceError extends errors.Error {
  constructor() {
    super('Not enough balance.', NotEnoughBalanceError.code)
    this.setName(NotEnoughBalanceError.name)
  }
}
NotEnoughBalanceError.name = 'NotEnoughBalanceError'
NotEnoughBalanceError.code = 'not-enough-balance'

module.exports = NotEnoughBalanceError
