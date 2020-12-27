const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetTickerRequest {
  constructor(context) {
    this.endpoint = GetTickerRequest.endpoint
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Object.entries(response.result).map(([key, value]) => types.Currency.fromParams({
          code: key,
          ...value
        })))
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
GetTickerRequest.endpoint = '/bitcoinaverage/ticker-all-currencies/'
GetTickerRequest.from = context => new GetTickerRequest(context)

module.exports = GetTickerRequest
