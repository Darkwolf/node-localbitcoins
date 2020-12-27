const errors = require('../errors')
const constants = require('../constants')

class MarkTradePaidRequest {
  constructor(parameters = {}, context) {
    this.method = MarkTradePaidRequest.method
    this.authRequired = MarkTradePaidRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/contact_mark_as_paid/${this.id}/`
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
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new errors.TradeNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            error = new errors.UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
MarkTradePaidRequest.method = 'POST'
MarkTradePaidRequest.authRequired = true
MarkTradePaidRequest.from = (parameters, context) => new MarkTradePaidRequest(parameters, context)

module.exports = MarkTradePaidRequest
