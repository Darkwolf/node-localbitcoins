const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetRecentMessagesRequest {
  constructor(parameters = {}, context) {
    this.endpoint = GetRecentMessagesRequest.endpoint
    this.authRequired = GetRecentMessagesRequest.authRequired
    this
      .setContext(context)
      .setAfterDate(parameters.afterDate)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAfterDate(date) {
    this.afterDate = date
    return this
  }

  toParams() {
    const params = {}
    if (this.afterDate) {
      params.after = new UnixTimestamp(this.afterDate)
        .toString()
        .replace('T', ' ')
        .replace('Z', '+00:00')
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.message_list.map(message => types.Message.fromParams(message, this.context)))
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
GetRecentMessagesRequest.endpoint = '/api/recent_messages/'
GetRecentMessagesRequest.authRequired = true
GetRecentMessagesRequest.from = (parameters, context) => new GetRecentMessagesRequest(parameters, context)

module.exports = GetRecentMessagesRequest
