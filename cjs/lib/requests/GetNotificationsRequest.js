const { Notification } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetNotificationsRequest {
  constructor(context) {
    this.endpoint = GetNotificationsRequest.endpoint
    this.authRequired = GetNotificationsRequest.authRequired
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
        response.setResult(response.result.data.map(notification => Notification.fromParams(notification, this.context)))
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
GetNotificationsRequest.endpoint = '/api/notifications/'
GetNotificationsRequest.authRequired = true
GetNotificationsRequest.from = context => new GetNotificationsRequest(context)

module.exports = GetNotificationsRequest
