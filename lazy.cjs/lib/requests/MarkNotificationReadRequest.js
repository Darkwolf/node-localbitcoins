const errors = require('../errors')
const constants = require('../constants')

class MarkNotificationReadRequest {
  constructor(parameters = {}, context) {
    this.method = MarkNotificationReadRequest.method
    this.authRequired = MarkNotificationReadRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/notifications/mark_as_read/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
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
MarkNotificationReadRequest.method = 'POST'
MarkNotificationReadRequest.authRequired = true
MarkNotificationReadRequest.from = (parameters, context) => new MarkNotificationReadRequest(parameters, context)

module.exports = MarkNotificationReadRequest
