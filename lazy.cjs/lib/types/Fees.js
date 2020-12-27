const Helper = require('@darkwolf/helper.cjs')

class Fees {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setDepositFee(data.depositFee)
      .setOutgoingFee(data.outgoingFee)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setDepositFee(amount) {
    this.depositFee = amount
    return this
  }

  setOutgoingFee(amount) {
    this.outgoingFee = amount
    return this
  }

  get() {
    return this.context.localbitcoins.getFees()
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.depositFee)) {
      data.depositFee = this.depositFee
    }
    if (Helper.exists(this.outgoingFee)) {
      data.outgoingFee = this.outgoingFee
    }
    return data
  }
}
Fees.fromParams = (params = {}, context) => {
  const data = {
    depositFee: params.deposit_fee,
    outgoingFee: params.outgoing_fee
  }
  if (data.depositFee) {
    data.depositFee = parseFloat(data.depositFee)
  }
  if (data.outgoingFee) {
    data.outgoingFee = parseFloat(data.outgoingFee)
  }
  return new Fees(data, context)
}
Fees.from = (data, context) => new Fees(data, context)

module.exports = Fees
