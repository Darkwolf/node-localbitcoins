const { OrderBook } = require('../types')
const { UnknownError } = require('../errors')
const { EventType, TradeType } = require('../constants')

class GetOrderBookRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setCurrency(parameters.currency)
  }

  get endpoint() {
    return `/bitcoincharts/${this.currency}/orderbook.json`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(OrderBook.fromParams({
          currency: this.currency,
          ...response.result
        }, this.context))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetOrderBookRequest.from = (parameters, context) => new GetOrderBookRequest(parameters, context)

module.exports = GetOrderBookRequest
