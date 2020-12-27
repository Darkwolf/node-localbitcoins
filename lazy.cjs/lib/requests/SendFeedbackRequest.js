const Helper = require('@darkwolf/helper.cjs')
const errors = require('../errors')
const constants = require('../constants')

class SendFeedbackRequest {
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
        this.context.localbitcoins.emit(constants.EventType.RESPONSE, response)
        return response.result
      } else {
        let error
        switch (response.errorCode) {
          case 6: {
            error = new errors.UserNotFoundError(this.username).setResponse(response)
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
SendFeedbackRequest.method = 'POST'
SendFeedbackRequest.authRequired = true
SendFeedbackRequest.from = (parameters, context) => new SendFeedbackRequest(parameters, context)

module.exports = SendFeedbackRequest
