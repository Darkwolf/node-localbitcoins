import Helper from '@darkwolf/helper.mjs'
import { InputFile } from '../types/index.mjs'
import { TradeNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SendMessageRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new SendMessageRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = SendMessageRequest.method
    this.authRequired = SendMessageRequest.authRequired
    this
      .setContext(context)
      .setTradeId(parameters.tradeId)
      .setText(parameters.text)
      .setAttachment(parameters.attachment)
  }

  get endpoint() {
    return `/api/contact_message_post/${this.tradeId}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setAttachment(attachment) {
    this.attachment = attachment ? (
      attachment instanceof InputFile ? attachment : new InputFile(attachment)
    ) : undefined
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.text)) {
      params.msg = `${this.text}`
    }
    if (this.attachment) {
      params.document = this.attachment
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
            error = new TradeNotFoundError(this.tradeId).setResponse(response)
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
