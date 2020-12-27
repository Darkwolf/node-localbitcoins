class OrderBook {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setCurrency(data.currency)
      .setBids(data.bids)
      .setAsks(data.asks)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setBids(bids) {
    this.bids = bids
    return this
  }

  setAsks(asks) {
    this.asks = asks
    return this
  }

  get() {
    return this.context.localbitcoins.getOrderBook(this.currency)
  }

  toJSON() {
    const data = {}
    if (this.currency) {
      data.currency = this.currency
    }
    if (this.bids) {
      data.bids = this.bids
    }
    if (this.asks) {
      data.asks = this.asks
    }
    return data
  }
}
OrderBook.fromParams = (params = {}, context) => {
  const data = {
    currency: params.currency,
    bids: params.bids,
    asks: params.asks
  }
  if (data.bids) {
    data.bids = data.bids.map(bid => bid.map(parseFloat))
  }
  if (data.asks) {
    data.asks = data.asks.map(ask => ask.map(parseFloat))
  }
  return new OrderBook(data, context)
}
OrderBook.from = (data, context) => new OrderBook(data, context)

module.exports = OrderBook
