import { TradeNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class ReleaseTradeWithPinRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new ReleaseTradeWithPinRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = ReleaseTradeWithPinRequest.method
    this.authRequired = ReleaseTradeWithPinRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setPin(parameters.pin)
  }

  get endpoint() {
    return `/api/contact_release_pin/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setPin(code) {
    this.pin = code
    return this
  }

  toParams() {
    const params = {}
    if (this.pin) {
      params.pincode = this.pin
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
            error = new UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
