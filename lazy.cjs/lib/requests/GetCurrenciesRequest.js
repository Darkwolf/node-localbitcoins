const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetCurrenciesRequest {
  constructor(context) {
    this.endpoint = GetCurrenciesRequest.endpoint
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
        response.setResult(Object.entries(response.result.data.currencies).map(([key, value]) => types.Currency.fromParams({
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
GetCurrenciesRequest.endpoint = '/api/currencies/'
GetCurrenciesRequest.from = context => new GetCurrenciesRequest(context)

module.exports = GetCurrenciesRequest
