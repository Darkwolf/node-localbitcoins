const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetFeesRequest {
  constructor(context) {
    this.endpoint = GetFeesRequest.endpoint
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
        response.setResult(types.Fees.fromParams(response.result.data, this.context))
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
GetFeesRequest.endpoint = '/api/fees/'
GetFeesRequest.from = context => new GetFeesRequest(context)

module.exports = GetFeesRequest
