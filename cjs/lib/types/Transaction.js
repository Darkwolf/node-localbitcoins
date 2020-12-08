const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const { TransactionType } = require('../constants')

class Transaction {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setTxid(data.txid)
      .setAddress(data.address)
      .setAmount(data.amount)
      .setDescription(data.description)
      .setDate(data.date)
  }

  get isSend() {
    return this.type === TransactionType.SEND
  }

  get isPendingSend() {
    return this.type === TransactionType.PENDING_SEND
  }

  get isOther() {
    return this.type === TransactionType.OTHER
  }

  get isBitcoinNetworkFee() {
    return this.type === TransactionType.BITCOIN_NETWORK_FEE
  }

  get isInternalSend() {
    return this.type === TransactionType.INTERNAL_SEND
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setTxid(id) {
    this.txid = id
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = this.type
    }
    if (this.txid) {
      data.txid = this.txid
    }
    if (this.address) {
      data.address = this.address
    }
    if (Helper.exists(this.amount)) {
      data.amount = this.amount
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
Transaction.fromParams = (params = {}, context) => {
  const data = {
    type: params.tx_type,
    txid: params.txid,
    address: params.to_address,
    amount: params.amount,
    description: params.description,
    date: params.created_at
  }
  if (data.type) {
    let type
    switch (data.type) {
      case 1: {
        type = TransactionType.SEND
        break
      }
      case 2: {
        type = TransactionType.PENDING_SEND
        break
      }
      case 3: {
        type = TransactionType.OTHER
        break
      }
      case 4: {
        type = TransactionType.BITCOIN_NEtwork_FEE
        break
      }
      case 5: {
        type = TransactionType.INTERNAL_SEND
        break
      }
    }
    data.type = type
  }
  if (data.amount) {
    data.amount = parseFloat(data.amount)
  }
  if (data.date) {
    data.date = new UnixTimestamp(data.date).seconds
  }
  return new Transaction(data, context)
}
Transaction.from = (data, context) => new Transaction(data, context)

module.exports = Transaction
