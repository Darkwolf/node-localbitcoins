const Helper = require('@darkwolf/helper.cjs')

class OldWalletAddress {
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
OldWalletAddress.fromParams = (params = {}, context) => {
  const data = {
    address: params.address,
    receivedAmount: params.received
  }
  if (data.receivedAmount) {
    data.receivedAmount = parseFloat(data.receivedAmount)
  }
  return new OldWalletAddress(data, context)
}
OldWalletAddress.from = (data, context) => new OldWalletAddress(data, context)

module.exports = OldWalletAddress
