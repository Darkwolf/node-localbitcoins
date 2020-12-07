const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetCountryCodesRequest {
  constructor(context) {
    this.endpoint = GetCountryCodesRequest.endpoint
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
        response.setResult(response.result.data.cc_list)
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
GetCountryCodesRequest.endpoint = '/api/countrycodes/'
GetCountryCodesRequest.from = context => new GetCountryCodesRequest(context)

module.exports = GetCountryCodesRequest
