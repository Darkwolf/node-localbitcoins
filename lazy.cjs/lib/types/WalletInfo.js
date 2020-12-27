const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class WalletInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setBalance(data.balance)
      .setSendableAmount(data.sendableAmount)
      .setAddress(data.address)
      .setOldAddresses(data.oldAddresses)
      .setSentTransactions30d(data.sentTransactions30d)
      .setReceivedTransactions30d(data.receivedTransactions30d)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setBalance(amount) {
    this.balance = amount
    return this
  }

  setSendableAmount(amount) {
    this.sendableAmount = amount
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  setOldAddresses(addresses) {
    this.oldAddresses = addresses ? addresses.map(address =>
      address instanceof types.OldWalletAddress ? address : new types.OldWalletAddress(address, this.context)
    ) : undefined
    return this
  }

  setSentTransactions30d(transactions) {
    this.sentTransactions30d = transactions ? transactions.map(transaction =>
      transaction instanceof types.Transaction ? transaction : new types.Transaction(transaction, this.context)
    ) : undefined
    return this
  }

  setReceivedTransactions30d(transactions) {
    this.receivedTransactions30d = transactions ? transactions.map(transaction =>
      transaction instanceof types.Transaction ? transaction : new types.Transaction(transaction, this.context)
    ) : undefined
    return this
  }

  get() {
    return this.context.localbitcoins.getWalletInfo()
  }

  getBalance() {
    return this.context.localbitcoins.getWalletBalance()
  }

  getAddress() {
    return this.context.localbitcoins.getWalletAddress()
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.balance)) {
      data.balance = this.balance
    }
    if (Helper.exists(this.sendableAmount)) {
      data.sendableAmount = this.sendableAmount
    }
    if (this.address) {
      data.address = this.address
    }
    if (this.oldAddresses) {
      data.oldAddresses = this.oldAddresses.map(address => address.toJSON())
    }
    if (this.sentTransactions30d) {
      data.sentTransactions30d = this.sentTransactions30d.map(transaction => transaction.toJSON())
    }
    if (this.receivedTransactions30d) {
      data.receivedTransactions30d = this.receivedTransactions30d.map(transaction => transaction.toJSON())
    }
    return data
  }
}
WalletInfo.fromParams = (params = {}, context) => {
  const data = {
    address: params.receiving_address,
    oldAddresses: params.old_address_list,
    sentTransactions30d: params.sent_transactions_30d,
    receivedTransactions30d: params.received_transactions_30d
  }
  if (params.total) {
    data.balance = params.total.balance
    data.sendableAmount = params.total.sendable
  }
  if (data.balance) {
    data.balance = parseFloat(data.balance)
  }
  if (data.sendableAmount) {
    data.sendableAmount = parseFloat(data.sendableAmount)
  }
  if (data.oldAddresses) {
    data.oldAddresses = data.oldAddresses.map(address => types.OldWalletAddress.fromParams(address, context))
  }
  if (data.sentTransactions30d) {
    data.sentTransactions30d = data.sentTransactions30d.map(transaction => types.Transaction.fromParams(transaction, context))
  }
  if (data.receivedTransactions30d) {
    data.receivedTransactions30d = data.receivedTransactions30d.map(transaction => types.Transaction.fromParams(transaction, context))
  }
  return new WalletInfo(data, context)
}
WalletInfo.from = (data, context) => new WalletInfo(data, context)

module.exports = WalletInfo
