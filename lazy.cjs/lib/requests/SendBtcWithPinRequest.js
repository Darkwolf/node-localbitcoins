const Helper = require('@darkwolf/helper.cjs')
const errors = require('../errors')
const constants = require('../constants')

class SendBtcWithPinRequest {
  constructor(parameters = {}, context) {
    this.method = SendBtcWithPinRequest.method
    this.endpoint = SendBtcWithPinRequest.endpoint
    this.authRequired = SendBtcWithPinRequest.authRequired
    this
      .setContext(context)
      .setAddress(parameters.address)
      .setAmount(parameters.amount)
      .setPin(parameters.pin)
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

  setPin(code) {
    this.pin = code
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
    if (this.pin) {
      params.pincode = this.pin
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(true)
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 19: {
            error = new errors.NotEnoughBalanceError().setResponse(response)
            break
          }
          default: {
            if (!error) {
              error = new errors.UnknownError(response.description).setResponse(response)
            }
          }
        }
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
SendBtcWithPinRequest.method = 'POST'
SendBtcWithPinRequest.endpoint = '/api/wallet-send-pin/'
SendBtcWithPinRequest.authRequired = true
SendBtcWithPinRequest.from = (parameters, context) => new SendBtcWithPinRequest(parameters, context)

module.exports = SendBtcWithPinRequest
