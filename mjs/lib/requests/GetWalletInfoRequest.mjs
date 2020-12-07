import { WalletInfo } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetWalletInfoRequest {
  static endpoint = '/api/wallet/'
  static authRequired = true

  static from(context) {
    return new GetWalletInfoRequest(context)
  }

  constructor(context) {
    this.endpoint = GetWalletInfoRequest.endpoint
    this.authRequired = GetWalletInfoRequest.authRequired
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
        response.setResult(WalletInfo.fromParams(response.result.data, this.context))
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
