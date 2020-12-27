const errors = require('./')

class TradeNotFoundError extends errors.NotFoundError {
  constructor(id) {
    super(`Trade not found: '${id}'.`, TradeNotFoundError.code)
    this.setName(TradeNotFoundError.name)
  }
}
TradeNotFoundError.name = 'TradeNotFoundError'
TradeNotFoundError.code = 'trade-not-found'

module.exports = TradeNotFoundError
