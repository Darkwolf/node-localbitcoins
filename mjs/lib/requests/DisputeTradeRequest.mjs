import Helper from '@darkwolf/helper.mjs'
import { TradeNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class DisputeTradeRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new DisputeTradeRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = DisputeTradeRequest.method
    this.authRequired = DisputeTradeRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setTopic(parameters.topic)
  }

  get endpoint() {
    return `/api/contact_dispute/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setTopic(topic) {
    this.topic = topic
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.topic)) {
      params.topic = this.topic
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(true)
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new TradeNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            if (!error) {
              error = new UnknownError(response.description).setResponse(response)
            }
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}