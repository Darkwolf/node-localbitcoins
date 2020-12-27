const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

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
        response.setResult(response.result.data.map(notification => types.Notification.fromParams(notification, this.context)))
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
GetNotificationsRequest.endpoint = '/api/notifications/'
GetNotificationsRequest.authRequired = true
GetNotificationsRequest.from = context => new GetNotificationsRequest(context)

module.exports = GetNotificationsRequest
