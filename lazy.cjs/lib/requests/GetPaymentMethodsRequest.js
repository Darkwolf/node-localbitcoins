const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetPaymentMethodsRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setCountryCode(parameters.countryCode)
  }

  get endpoint() {
    return `/api/payment_methods/${this.countryCode ? `${this.countryCode}/` : ''}`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCountryCode(code) {
    this.countryCode = code
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(Object.entries(response.result.data.methods).map(([key, value]) => types.PaymentMethod.fromParams({
          id: key,
          ...value
        })))
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
GetPaymentMethodsRequest.from = (parameters, context) => new GetPaymentMethodsRequest(parameters, context)

module.exports = GetPaymentMethodsRequest
