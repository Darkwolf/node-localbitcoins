const types = require('../types')
const errors = require('../errors')
const constants = require('../constants')

class GetWalletInfoRequest {
  constructor(context) {
    this.endpoint = GetWalletInfoRequest.endpoint
    this.authRequired = GetWalletInfoRequest.authRequired
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(types.WalletInfo.fromParams(response.result.data, this.context))
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
GetWalletInfoRequest.endpoint = '/api/wallet/'
GetWalletInfoRequest.authRequired = true
GetWalletInfoRequest.from = context => new GetWalletInfoRequest(context)

module.exports = GetWalletInfoRequest
