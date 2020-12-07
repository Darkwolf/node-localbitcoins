const Helper = require('@darkwolf/helper.cjs')

class Attachment {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setName(data.name)
      .setMimeType(data.mimeType)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  setMimeType(type) {
    this.mimeType = type
    return this
  }

  download() {
    return this.context.localbitcoins.downloadAttachment(this.context.tradeId, this.id)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (Helper.exists(this.name)) {
      data.name = this.name
    }
    if (this.mimeType) {
      data.mimeType = this.mimeType
    }
    return data
  }
}
Attachment.fromParams = (params = {}, context) => {
  const data = {
    name: params.attachment_name,
    mimeType: params.attachment_type,
    downloadLink: params.attachment_url,
  }
  if (data.downloadLink) {
    data.id = parseFloat(data.downloadLink.split('/').slice(-2)[0])
  }
  return new Attachment(data, context)
}
Attachment.from = (data, context) => new Attachment(data, context)

module.exports = Attachment
