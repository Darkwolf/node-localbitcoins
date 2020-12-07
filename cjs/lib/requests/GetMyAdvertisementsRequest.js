const Helper = require('@darkwolf/helper.cjs')
const { Advertisement } = require('../types')
const { UnknownError } = require('../errors')
const { EventType, TradeType } = require('../constants')

class GetMyAdvertisementsRequest {
  constructor(parameters = {}, context) {
    this.endpoint = GetMyAdvertisementsRequest.endpoint
    this.authRequired = GetMyAdvertisementsRequest.authRequired
    this
      .setContext(context)
      .setVisible(parameters.visible)
      .setTradeType(parameters.tradeType)
      .setCurrency(parameters.currency)
      .setCountryCode(parameters.countryCode)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setVisible(boolean) {
    this.visible = boolean
    return this
  }

  setTradeType(type) {
    this.tradeType = type
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setCountryCode(code) {
    this.countryCode = code
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.visible)) {
      params.visible = Number(this.visible)
    }
    if (this.tradeType) {
      params.trade_type = this.tradeType.toUpperCase()
    }
    if (this.currency) {
      params.currency = this.currency
    }
    if (this.countryCode) {
      params.countrycode = this.countryCode
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.ad_list.map(advertisement => Advertisement.fromParams(advertisement, this.context)))
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
GetMyAdvertisementsRequest.endpoint = '/api/ads/'
GetMyAdvertisementsRequest.authRequired = true
GetMyAdvertisementsRequest.from = (parameters, context) => new GetMyAdvertisementsRequest(parameters, context)

module.exports = GetMyAdvertisementsRequest
