import { Notification } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetNotificationsRequest {
  static endpoint = '/api/notifications/'
  static authRequired = true

  static from(context) {
    return new GetNotificationsRequest(context)
  }

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
