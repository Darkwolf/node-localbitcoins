const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetMessagesRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetMessagesRequest.authRequired
    this
      .setContext(context)
      .setTradeId(parameters.tradeId)
  }

  get endpoint() {
    return `/api/contact_messages/${this.tradeId}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.message_list.map(message => types.Message.fromParams({
          contact_id: this.tradeId,
          ...message
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
GetMessagesRequest.authRequired = true
GetMessagesRequest.from = (parameters, context) => new GetMessagesRequest(parameters, context)

module.exports = GetMessagesRequest
