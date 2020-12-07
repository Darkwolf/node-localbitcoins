import Error from './Error.mjs'

export default class NotEnoughBalanceError extends Error {
  static name = 'NotEnoughBalanceError'
  static code = 'not-enough-balance'

  constructor() {
    super('Not enough balance.', NotEnoughBalanceError.code)
    this.setName(NotEnoughBalanceError.name)
  }
}
