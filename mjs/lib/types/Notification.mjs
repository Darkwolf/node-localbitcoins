import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import LocalBitcoins from '../index.mjs'

export default class Notification {
  static fromParams(params = {}, context) {
    const data = {
      id: params.id,
      advertisementId: params.advertisement_id,
      tradeId: params.contact_id,
      text: params.msg,
      url: params.url,
      read: params.read,
      date: params.created_at
    }
    if (data.url && data.url.startsWith('/')) {
      data.url = `${LocalBitcoins.URL}${data.url}`
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    return new Notification(data, context)
  }

  static from(data, context) {
    return new Notification(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setAdvertisementId(data.advertisementId)
      .setTradeId(data.tradeId)
      .setText(data.text)
      .setUrl(data.url)
      .setRead(data.read)
      .setDate(data.date)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setAdvertisementId(id) {
    this.advertisementId = id
    return this
  }

  setTradeId(id) {
    this.tradeId = id
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setRead(boolean) {
    this.read = boolean
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  markRead() {
    return this.context.localbitcoins.markNotificationRead(this.id)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.advertisementId) {
      data.advertisementId = this.advertisementId
    }
    if (this.tradeId) {
      data.tradeId = this.tradeId
    }
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (this.url) {
      data.url = this.url
    }
    if (Helper.exists(this.read)) {
      data.read = this.read
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
