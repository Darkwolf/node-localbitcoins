const Helper = require('@darkwolf/helper.cjs')
const { AdvertisementNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class SetAdvertisementPriceEquationRequest {
  constructor(parameters = {}, context) {
    this.method = SetAdvertisementPriceEquationRequest.method
    this.authRequired = SetAdvertisementPriceEquationRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setEquation(parameters.equation)
  }

  get endpoint() {
    return `/api/ad-equation/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setEquation(equation) {
    this.equation = equation
    return this
  }

  toParams() {
    const params = {}
    if (this.equation) {
      params.price_equation = this.equation
    }
    return params
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
            error = new UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SetAdvertisementPriceEquationRequest.method = 'POST'
SetAdvertisementPriceEquationRequest.authRequired = true
SetAdvertisementPriceEquationRequest.from = (parameters, context) => new SetAdvertisementPriceEquationRequest(parameters, context)

module.exports = SetAdvertisementPriceEquationRequest
