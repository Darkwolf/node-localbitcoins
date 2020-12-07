import NotFoundError from './NotFoundError.mjs'

export default class TradeNotFoundError extends NotFoundError {
  static name = 'TradeNotFoundError'
  static code = 'trade-not-found'

  constructor(id) {
    super(`Trade not found: '${id}'.`, TradeNotFoundError.code)
    this.setName(TradeNotFoundError.name)
  }
}
