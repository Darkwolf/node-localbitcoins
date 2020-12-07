import Helper from '@darkwolf/helper.mjs'

export default class Response {
  static from(data, context) {
    return new Response(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setOk(data.ok)
      .setResult(data.result)
      .setErrorCode(data.errorCode)
      .setMessage(data.message)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOk(boolean) {
    this.ok = boolean
    return this
  }

  setResult(result) {
    this.result = result
    return this
  }

  setErrorCode(code) {
    this.errorCode = code
    return this
  }

  setMessage(message) {
    this.message = message
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.ok)) {
      data.ok = this.ok
    }
    if (Helper.exists(this.result)) {
      data.result = Helper.isObject(this.result) ? (
        Array.isArray(this.result) ? this.result.map(result => result.toJSON()) : this.result.toJSON()
      ) : this.result
    }
    if (this.errorCode) {
      data.errorCode = this.errorCode
    }
    if (Helper.exists(this.message)) {
      data.message = this.message
    }
    return data
  }
}
