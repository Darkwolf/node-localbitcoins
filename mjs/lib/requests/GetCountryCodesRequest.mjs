import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetCountryCodesRequest {
  static endpoint = '/api/countrycodes/'

  static from(context) {
    return new GetCountryCodesRequest(context)
  }

  constructor(context) {
    this.endpoint = GetCountryCodesRequest.endpoint
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
        response.setResult(response.result.data.cc_list)
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
