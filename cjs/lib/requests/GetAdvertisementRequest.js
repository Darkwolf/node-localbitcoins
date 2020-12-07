const { Advertisement } = require('../types')
const { AdvertisementNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

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
        response.setResult(Advertisement.fromParams(advertisement, this.context))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new AdvertisementNotFoundError(this.id).setResponse(response)
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
GetAdvertisementRequest.authRequired = true
GetAdvertisementRequest.from = (parameters, context) => new GetAdvertisementRequest(parameters, context)

module.exports = GetAdvertisementRequest
