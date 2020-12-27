const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetTradesByIdsRequest {
  constructor(parameters = {}, context) {
    this.endpoint = GetTradesByIdsRequest.endpoint
    this.authRequired = GetTradesByIdsRequest.authRequired
    this
      .setContext(context)
      .setIds(parameters.ids)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setIds(ids) {
    this.ids = ids
    return this
  }

  toParams() {
    const params = {}
    if (this.ids) {
      params.contacts = this.ids.join(',')
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.contact_list.map(trade => types.Trade.fromParams(trade, this.context)))
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
GetTradesByIdsRequest.endpoint = '/api/contact_info/'
GetTradesByIdsRequest.authRequired = true
GetTradesByIdsRequest.from = (parameters, context) => new GetTradesByIdsRequest(parameters, context)

module.exports = GetTradesByIdsRequest
