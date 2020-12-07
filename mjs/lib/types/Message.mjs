import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import User from './User.mjs'
import Attachment from './Attachment.mjs'

export default class Message {
  static fromParams(params = {}, context) {
    const data = {
      tradeId: params.contact_id,
      from: params.sender,
      admin: params.is_admin,
      text: params.msg,
      date: params.created_at
    }
    if (data.from || data.admin) {
      data.from = User.fromParams({
        is_admin: data.admin,
        ...data.from
      }, context)
    }
    if (params.attachment_url) {
      data.attachment = Attachment.fromParams(params, {
        ...context,
        tradeId: data.tradeId
      })
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    return new Message(data, context)
  }

  static from(data, context) {
    return new Message(data, context)
  }

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
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setAttachment(attachment) {
    this.attachment = attachment ? (
      attachment instanceof Attachment ? attachment : new Attachment(attachment, {
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
