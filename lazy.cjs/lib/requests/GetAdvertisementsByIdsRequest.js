const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetAdvertisementsByIdsRequest {
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
        response.setResult(response.result.data.ad_list.map(advertisement => types.Advertisement.fromParams(advertisement, this.context)))
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new errors.UnknownError(response.message).setResponse(response)
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetAdvertisementsByIdsRequest.endpoint = '/api/ad-get/'
GetAdvertisementsByIdsRequest.authRequired = true
GetAdvertisementsByIdsRequest.from = (parameters, context) => new GetAdvertisementsByIdsRequest(parameters, context)

module.exports = GetAdvertisementsByIdsRequest
