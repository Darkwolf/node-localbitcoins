import Helper from '@darkwolf/helper.mjs'
import { UserNotFoundError, UnknownError } from '../errors/index.mjs'
import { EventType } from '../constants/index.mjs'

export default class SendFeedbackRequest {
  static method = 'POST'
  static authRequired = true

  static from(parameters, context) {
    return new SendFeedbackRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = SendFeedbackRequest.method
    this.authRequired = SendFeedbackRequest.authRequired
    this
      .setContext(context)
      .setUsername(parameters.username)
      .setFeedback(parameters.feedback)
      .setMessage(parameters.message)
  }

  get endpoint() {
    return `/api/feedback/${this.username}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  setFeedback(type) {
    this.feedback = type
    return this
  }

  setMessage(message) {
    this.message = message
    return this
  }

  toParams() {
    const params = {}
    if (this.feedback) {
      params.feedback = this.feedback
    }
    if (Helper.exists(this.message)) {
      params.msg = `${this.message}`
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(true)
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6: {
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
