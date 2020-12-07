const { RefreshToken } = require('../types')
const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class RefreshTokenRequest {
  constructor(context) {
    this.method = RefreshTokenRequest.method
    this.endpoint = RefreshTokenRequest.endpoint
    this.setContext(context)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  toParams() {
    const params = {
      grant_type: 'refresh_token'
    }
    if (this.context.oauth2) {
      if (this.context.oauth2.clientId) {
        params.client_id = this.context.oauth2.clientId
      }
      if (this.context.oauth2.clientSecret) {
        params.client_secret = this.context.oauth2.clientSecret
      }
      if (this.context.oauth2.refreshToken) {
        params.refresh_token = this.context.oauth2.refreshToken
      }
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(RefreshToken.fromParams(response.result))
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
RefreshTokenRequest.method = 'POST'
RefreshTokenRequest.endpoint = '/oauth2/access_token/'
RefreshTokenRequest.from = context => new RefreshTokenRequest(context)

module.exports = RefreshTokenRequest
