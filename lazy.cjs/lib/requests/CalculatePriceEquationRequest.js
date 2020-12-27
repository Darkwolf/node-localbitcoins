const errors = require('../errors')
const constants = require('../constants')

class CalculatePriceEquationRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setEquation(parameters.equation)
  }

  get endpoint() {
    return `/api/equation/${this.equation}`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setEquation(equation) {
    this.equation = equation
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(parseFloat(response.result.data))
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
CalculatePriceEquationRequest.from = (parameters, context) => new CalculatePriceEquationRequest(parameters, context)

module.exports = CalculatePriceEquationRequest
