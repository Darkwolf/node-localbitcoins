const { Currency } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

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
        response.setResult(Object.entries(response.result).map(([key, value]) => Currency.fromParams({
          code: key,
          ...value
        })))
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
GetTickerRequest.endpoint = '/bitcoinaverage/ticker-all-currencies/'
GetTickerRequest.from = context => new GetTickerRequest(context)

module.exports = GetTickerRequest
