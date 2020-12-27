import Helper from '@darkwolf/helper.mjs'
import { Advertisement, Trade } from '../types/index.mjs'
import { AdvertisementNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class CreateTradeRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new CreateTradeRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = CreateTradeRequest.method
    this.authRequired = CreateTradeRequest.authRequired
    this
      .setContext(context)
      .setAdvertisementId(parameters.advertisementId)
      .setAmount(parameters.amount)
      .setMessage(parameters.message)
  }

  get endpoint() {
    return `/api/contact_create/${this.advertisementId}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAdvertisementId(id) {
    this.advertisementId = id
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  setMessage(message) {
    this.message = message
    return this
  }

  toParams() {
    const params = {}
    if (Helper.exists(this.amount)) {
      params.amount = this.amount
    }
    if (Helper.exists(this.message)) {
      params.message = this.message
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        const trade = response.result.data
        response.setResult(new Trade({
          id: trade.contact_id,
          advertisement: new Advertisement({
            id: this.advertisementId
          }, this.context),
          amount: this.amount,
          funded: trade.funded
        }, this.context))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6:
          case 7: {
            error = new AdvertisementNotFoundError(this.advertisementId).setResponse(response)
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
