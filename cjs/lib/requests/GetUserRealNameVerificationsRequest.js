const { RealNameVerification } = require('../types')
const { UserNotFoundError, UnknownError } = require('../errors')
const { EventType } = require('../constants')

class GetUserRealNameVerificationsRequest {
  constructor(parameters = {}, context) {
    this.authRequired = GetUserRealNameVerificationsRequest.authRequired
    this
      .setContext(context)
      .setUsername(parameters.username)
  }

  get endpoint() {
    return `/api/real_name_verifiers/${this.username}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(response.result.data.map(verification => RealNameVerification.fromParams(verification, this.context)))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 11: {
            error = new UserNotFoundError(this.username).setResponse(response)
            break
          }
          default: {
            if (!error) {
              error = new UnknownError(response.description).setResponse(response)
            }
          }
        }
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
GetUserRealNameVerificationsRequest.authRequired = true
GetUserRealNameVerificationsRequest.from = (parameters, context) => new GetUserRealNameVerificationsRequest(parameters, context)

module.exports = GetUserRealNameVerificationsRequest
