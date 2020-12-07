import { UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class CalculatePriceEquationRequest {
  static from(parameters, context) {
    return new CalculatePriceEquationRequest(parameters, context)
  }

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
