import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class RevokeTokenRequest {
  static method = 'POST'
  static endpoint = '/api/logout/'
  static authRequired = true

  static from(context) {
    return new RevokeTokenRequest(context)
  }

  constructor(context) {
    this.method = RevokeTokenRequest.method
    this.endpoint = RevokeTokenRequest.endpoint
    this.authRequired = RevokeTokenRequest.authRequired
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
        response.setResult(true)
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
