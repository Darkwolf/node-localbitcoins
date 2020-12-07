const Helper = require('@darkwolf/helper.cjs')
const { AdvertisementNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class DeleteAdvertisementRequest {
  constructor(parameters = {}, context) {
    this.method = DeleteAdvertisementRequest.method
    this.authRequired = DeleteAdvertisementRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
  }

  get endpoint() {
    return `/api/ad-delete/${this.id}/`
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
        response.setResult(true)
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
DeleteAdvertisementRequest.method = 'POST'
DeleteAdvertisementRequest.authRequired = true
DeleteAdvertisementRequest.from = (parameters, context) => new DeleteAdvertisementRequest(parameters, context)

module.exports = DeleteAdvertisementRequest
