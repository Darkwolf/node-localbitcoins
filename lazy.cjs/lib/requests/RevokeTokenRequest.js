const errors = require('../errors')
const constants = require('../constants')

class RevokeTokenRequest {
  constructor(context) {
    this.method = RevokeTokenRequest.method
    this.endpoint = RevokeTokenRequest.endpoint
    this.authRequired = RevokeTokenRequest.authRequired
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
        response.setResult(true)
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
RevokeTokenRequest.method = 'POST'
RevokeTokenRequest.endpoint = '/api/logout/'
RevokeTokenRequest.authRequired = true
RevokeTokenRequest.from = context => new RevokeTokenRequest(context)

module.exports = RevokeTokenRequest
