import { Trade } from '../types/index.mjs'
import { TradeNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetTradeRequest {
  static authRequired = true

  static from(parameters, context) {
    return new GetTradeRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.authRequired = GetTradeRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/contact_info/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Trade.fromParams(response.result, this.context))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new TradeNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            if (!error) {
              error = new UnknownError(response.description).setResponse(response)
            }
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
