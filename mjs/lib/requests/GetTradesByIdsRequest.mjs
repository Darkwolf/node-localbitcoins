import { Trade } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetTradesByIdsRequest {
  static endpoint = '/api/contact_info/'
  static authRequired = true

  static from(parameters, context) {
    return new GetTradesByIdsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.endpoint = GetTradesByIdsRequest.endpoint
    this.authRequired = GetTradesByIdsRequest.authRequired
    this
      .setContext(context)
      .setIds(parameters.ids)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setIds(ids) {
    this.ids = ids
    return this
  }

  toParams() {
    const params = {}
    if (this.ids) {
      params.contacts = this.ids.join(',')
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.contact_list.map(trade => Trade.fromParams(trade, this.context)))
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
