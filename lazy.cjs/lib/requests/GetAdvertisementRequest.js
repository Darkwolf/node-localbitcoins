const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetAdvertisementRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetAdvertisementRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/ad-get/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        const [advertisement] = response.result.data.ad_list
        response.setResult(types.Advertisement.fromParams(advertisement, this.context))
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new errors.AdvertisementNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            error = new errors.UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetAdvertisementRequest.authRequired = true
GetAdvertisementRequest.from = (parameters, context) => new GetAdvertisementRequest(parameters, context)

module.exports = GetAdvertisementRequest
