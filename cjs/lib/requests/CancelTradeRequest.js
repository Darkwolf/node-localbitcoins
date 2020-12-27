const { TradeNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class CancelTradeRequest {
  constructor(parameters = {}, context) {
    this.method = CancelTradeRequest.method
    this.authRequired = CancelTradeRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/contact_cancel/${this.id}/`
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
        response.setResult(true)
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
            error = new UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
CancelTradeRequest.method = 'POST'
CancelTradeRequest.authRequired = true
CancelTradeRequest.from = (parameters, context) => new CancelTradeRequest(parameters, context)

module.exports = CancelTradeRequest
