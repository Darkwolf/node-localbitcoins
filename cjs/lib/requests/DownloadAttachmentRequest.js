const { UnknownError } = require('../errors')
const { EventType } = require('../constants')

class DownloadAttachmentRequest {
  constructor(parameters = {}, context) {
    this.authRequired = DownloadAttachmentRequest.authRequired
    this
      .setContext(context)
      .setTradeId(parameters.tradeId)
      .setAttachmentId(parameters.attachmentId)
  }

  get endpoint() {
    return `/api/contact_message_attachment/${this.tradeId}/${this.attachmentId}/`
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  setAttachmentId(id) {
    this.attachmentId = id
    return this
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
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
DownloadAttachmentRequest.authRequired = true
DownloadAttachmentRequest.from = (parameters, context) => new DownloadAttachmentRequest(parameters, context)

module.exports = DownloadAttachmentRequest
