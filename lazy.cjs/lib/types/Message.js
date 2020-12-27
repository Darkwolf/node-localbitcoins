const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('./')

class Message {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTradeId(data.tradeId)
      .setFrom(data.from)
      .setText(data.text)
      .setAttachment(data.attachment)
      .setDate(data.date)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setAttachment(attachment) {
    this.attachment = attachment ? (
      attachment instanceof types.Attachment ? attachment : new types.Attachment(attachment, {
        ...this.context,
        tradeId: this.tradeId
      })
    ) : undefined
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  toJSON() {
    const data = {}
    if (this.tradeId) {
      data.tradeId = this.tradeId
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (this.attachment) {
      data.attachment = this.attachment.toJSON()
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
Message.fromParams = (params = {}, context) => {
  const data = {
    tradeId: params.contact_id,
    from: params.sender,
    admin: params.is_admin,
    text: params.msg,
    date: params.created_at
  }
  if (data.from || data.admin) {
    data.from = types.User.fromParams({
      is_admin: data.admin,
      ...data.from
    }, context)
  }
  if (params.attachment_url) {
    data.attachment = types.Attachment.fromParams(params, {
      ...context,
      tradeId: data.tradeId
    })
  }
  if (data.date) {
    data.date = new UnixTimestamp(data.date).seconds
  }
  return new Message(data, context)
}
Message.from = (data, context) => new Message(data, context)

module.exports = Message
