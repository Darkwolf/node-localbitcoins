const Helper = require('@darkwolf/helper.cjs')
const errors = require('../errors')
const constants = require('../constants')

class MarkTradeRealNameVerificationRequest {
  constructor(parameters = {}, context) {
    this.method = MarkTradeRealNameVerificationRequest.method
    this.authRequired = MarkTradeRealNameVerificationRequest.authRequired
    this
      .setContext(context)
      .setId(parameters.id)
      .setStatus(parameters.status)
      .setConfirmed(parameters.confirmed)
  }

  get endpoint() {
    return `/api/contact_mark_realname/${this.id}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setConfirmed(boolean) {
    this.confirmed = boolean
    return this
  }

  toParams() {
    const params = {}
    if (this.status) {
      let status
      switch (this.status) {
        case constants.RealNameVerificationStatus.MATCHES: {
          status = 1
          break
        }
        case constants.RealNameVerificationStatus.DIFFERENT: {
          status = 2
          break
        }
        case constants.RealNameVerificationStatus.NOT_CHECKED: {
          status = 3
          break
        }
        case constants.RealNameVerificationStatus.NOT_VISIBLE: {
          status = 4
          break
        }
      }
      params.confirmation_status = status
    }
    if (Helper.exists(this.confirmed)) {
      params.id_confirmed = Number(this.confirmed)
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
          case 6:
          case 7: {
            error = new errors.TradeNotFoundError(this.id).setResponse(response)
            break
          }
          default: {
            error = new errors.UnknownError(response.description).setResponse(response)
          }
        }
        this.context.localbitcoins.emit(constants.EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
MarkTradeRealNameVerificationRequest.method = 'POST'
MarkTradeRealNameVerificationRequest.authRequired = true
MarkTradeRealNameVerificationRequest.from = (parameters, context) => new MarkTradeRealNameVerificationRequest(parameters, context)

module.exports = MarkTradeRealNameVerificationRequest
