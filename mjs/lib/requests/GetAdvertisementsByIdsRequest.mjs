import { Advertisement } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetAdvertisementsByIdsRequest {
  static endpoint = '/api/ad-get/'
  static authRequired = true

  static from(parameters, context) {
    return new GetAdvertisementsByIdsRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.endpoint = GetAdvertisementsByIdsRequest.endpoint
    this.authRequired = GetAdvertisementsByIdsRequest.authRequired
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
      params.ads = this.ids.join(',')
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.ad_list.map(advertisement => Advertisement.fromParams(advertisement, this.context)))
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
