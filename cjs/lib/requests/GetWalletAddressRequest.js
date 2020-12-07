const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetWalletAddressRequest {
  constructor(context) {
    this.endpoint = GetWalletAddressRequest.endpoint
    this.authRequired = GetWalletAddressRequest.authRequired
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
        response.setResult(response.result.data.address)
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
GetWalletAddressRequest.endpoint = '/api/wallet-addr/'
GetWalletAddressRequest.authRequired = true
GetWalletAddressRequest.from = context => new GetWalletAddressRequest(context)

module.exports = GetWalletAddressRequest
