import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class VerifyPinRequest {
  static method = 'POST'
  static endpoint = '/api/pincode/'
  static authRequired = true

  static from(parameters, context) {
    return new VerifyPinRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = VerifyPinRequest.method
    this.endpoint = VerifyPinRequest.endpoint
    this.authRequired = VerifyPinRequest.authRequired
    this
      .setContext(context)
      .setPin(parameters.pin)
  }

  setContext(context = {}) {
    this.context = context
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
        response.setResult(response.result.data.pincode_ok)
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
