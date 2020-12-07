import { UnixTimestamp } from '@darkwolf/time.mjs'
import { Message } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetRecentMessagesRequest {
  static endpoint = '/api/recent_messages/'
  static authRequired = true

  static from(parameters, context) {
    return new GetRecentMessagesRequest(parameters, context)
  }

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
        response.setResult(response.result.data.message_list.map(message => Message.fromParams(message, this.context)))
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
