import { UnixTimestamp } from '@darkwolf/time.mjs'

export default class RealNameVerification {
  static fromParams(params = {}, context) {
    const data = {
      username: params.username,
      date: params.verified_at
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    return new RealNameVerification(data, context)
  }

  static from(data, context) {
    return new RealNameVerification(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUsername(data.username)
      .setDate(data.date)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  toJSON() {
    const data = {}
    if (this.username) {
      data.username = this.username
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
