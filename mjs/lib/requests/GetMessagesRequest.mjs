import { Message } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetMessagesRequest {
  static authRequired = true

  static from(parameters, context) {
    return new GetMessagesRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.authRequired = GetMessagesRequest.authRequired
    this
      .setContext(context)
      .setTradeId(parameters.tradeId)
  }

  get endpoint() {
    return `/api/contact_messages/${this.tradeId}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.message_list.map(message => Message.fromParams({
          contact_id: this.tradeId,
          ...message
        }, this.context)))
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
