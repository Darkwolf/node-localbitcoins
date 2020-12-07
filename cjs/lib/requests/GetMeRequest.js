const { User } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetMeRequest {
  constructor(context) {
    this.endpoint = GetMeRequest.endpoint
    this.authRequired = GetMeRequest.authRequired
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
        response.setResult(User.fromParams(response.result.data, this.context))
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
GetMeRequest.endpoint = '/api/myself/'
GetMeRequest.authRequired = true
GetMeRequest.from = context => new GetMeRequest(context)

module.exports = GetMeRequest
