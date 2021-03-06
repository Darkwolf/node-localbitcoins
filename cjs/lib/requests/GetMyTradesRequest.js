const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const { Trade } = require('../types')
const { UnknownError } = require('../errors')
const { EventType, TradeStatus } = require('../constants')

class GetMyTradesRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetMyTradesRequest.authRequired
    this
      .setContext(context)
      .setStatus(parameters.status)
      .setRole(parameters.role)
      .setStartDate(parameters.startDate)
      .setEndDate(parameters.endDate)
  }

  get endpoint() {
    return `/api/dashboard/${this.status && this.status !== TradeStatus.ACTIVE ? `${this.status}/` : ''}${this.role ? `${this.role}/` : ''}`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setRole(role) {
    this.role = role
    return this
  }

  setStartDate(date) {
    this.startDate = date
    return this
  }

  setEndDate(date) {
    this.endDate = date
    return this
  }

  toParams() {
    const params = {}
    if (this.startDate) {
      params.start_at = new UnixTimestamp(this.startDate)
        .toString()
        .replace('T', ' ')
        .replace('Z', '+00:00')
    }
    if (this.endDate) {
      params.start_at_rev = new UnixTimestamp(this.endDate)
        .toString()
        .replace('T', ' ')
        .replace('Z', '+00:00')
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.contact_list.map(trade => Trade.fromParams(trade, this.context)))
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
GetMyTradesRequest.authRequired = true
GetMyTradesRequest.from = (parameters, context) => new GetMyTradesRequest(parameters, context)

module.exports = GetMyTradesRequest
