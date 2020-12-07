const { Advertisement } = require('../types')
const { UnknownError } = require('../errors')
const { EventType, TradeType } = require('../constants')

class GetAdvertisementsRequest {
  constructor(parameters = {}, context) {
    this
      .setContext(context)
      .setTradeType(parameters.tradeType)
      .setCurrency(parameters.currency)
      .setCountryCode(parameters.countryCode)
      .setCountryName(parameters.countryName)
      .setPaymentMethod(parameters.paymentMethod)
      .setPage(parameters.page)
  }

  get endpoint() {
    return `/${
      this.tradeType === TradeType.ONLINE_BUY ?  'sell-bitcoins-online' : 'buy-bitcoins-online'
    }/${
      this.currency ? `${this.currency}/` : ''
    }${
      this.countryCode ? `${this.countryCode}/` : ''
    }${
      this.countryName ? `${this.countryName}/` : ''
    }${
      this.paymentMethod ? `${this.paymentMethod}/` : ''
    }.json`
  }

  setContext(context = {}) {
    this.context = context
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

  setCountryName(name) {
    this.countryName = name
    return this
  }

  setPaymentMethod(method) {
    this.paymentMethod = method
    return this
  }

  setPage(page) {
    this.page = page
    return this
  }

  toParams() {
    const params = {}
    if (this.page) {
      params.page = this.page
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        const advertisements = response.result.ad_list || response.result.data.ad_list
        response.setResult(advertisements.map(advertisement => Advertisement.fromParams(advertisement, this.context)))
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
GetAdvertisementsRequest.from = (parameters, context) => new GetAdvertisementsRequest(parameters, context)

module.exports = GetAdvertisementsRequest
