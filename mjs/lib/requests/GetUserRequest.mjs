import { User } from '../types/index.mjs'
import { UserNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class GetUserRequest {
  static authRequired = true

  static from(parameters, context) {
    return new GetUserRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.authRequired = GetUserRequest.authRequired
    this
      .setContext(context)
      .setUsername(parameters.username)
  }

  get endpoint() {
    return `/api/account_info/${this.username}/`
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
        response.setResult(User.fromParams(response.result.data, this.context))
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
