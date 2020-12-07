import { Trade } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType, TradeType } from '../constants/index.mjs'

export default class GetTradingChartRequest {
  static from(parameters, context) {
    return new GetTradingChartRequest(parameters, context)
  }

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
        response.setResult(response.result.map(trade => Trade.fromParams({
          contact_id: trade.tid,
          currency: this.currency,
          amount_btc: trade.amount,
          price: trade.price,
          closed_at: trade.date
        }, this.context)))
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
