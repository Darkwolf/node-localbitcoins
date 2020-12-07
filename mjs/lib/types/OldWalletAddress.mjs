import Helper from '@darkwolf/helper.mjs'

export default class OldWalletAddress {
  static fromParams(params = {}, context) {
    const data = {
      address: params.address,
      receivedAmount: params.received
    }
    if (data.receivedAmount) {
      data.receivedAmount = parseFloat(data.receivedAmount)
    }
    return new OldWalletAddress(data, context)
  }

  static from(data, context) {
    return new OldWalletAddress(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setAddress(data.address)
      .setReceivedAmount(data.receivedAmount)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  setReceivedAmount(amount) {
    this.receivedAmount = amount
    return this
  }

  toJSON() {
    const data = {}
    if (this.address) {
      data.address = this.address
    }
    if (Helper.exists(this.receivedAmount)) {
      data.receivedAmount = this.receivedAmount
    }
    return data
  }
}
