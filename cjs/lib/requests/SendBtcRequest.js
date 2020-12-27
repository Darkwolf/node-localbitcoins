const Helper = require('@darkwolf/helper.cjs')
const { NotEnoughBalanceError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class SendBtcRequest {
  constructor(parameters = {}, context) {
    this.method = SendBtcRequest.method
    this.endpoint = SendBtcRequest.endpoint
    this.authRequired = SendBtcRequest.authRequired
    this
      .setContext(context)
      .setAddress(parameters.address)
      .setAmount(parameters.amount)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  toParams() {
    const params = {}
    if (this.address) {
      params.address = this.address
    }
    if (Helper.exists(this.amount)) {
      params.amount = this.amount
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
          case 19: {
            error = new NotEnoughBalanceError().setResponse(response)
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
SendBtcRequest.method = 'POST'
SendBtcRequest.endpoint = '/api/wallet-send/'
SendBtcRequest.authRequired = true
SendBtcRequest.from = (parameters, context) => new SendBtcRequest(parameters, context)

module.exports = SendBtcRequest
