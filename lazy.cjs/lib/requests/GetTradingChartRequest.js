const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetTradingChartRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setCurrency(parameters.currency)
  }

  get endpoint() {
    return `/bitcoincharts/${this.currency}/trades.json`
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
        response.setResult(response.result.map(trade => types.Trade.fromParams({
          contact_id: trade.tid,
          currency: this.currency,
          amount_btc: trade.amount,
          price: trade.price,
          closed_at: trade.date
        }, this.context)))
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetTradingChartRequest.from = (parameters, context) => new GetTradingChartRequest(parameters, context)

module.exports = GetTradingChartRequest
