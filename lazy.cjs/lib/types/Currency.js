const Helper = require('@darkwolf/helper.cjs')

class Currency {
  constructor(data = {}) {
    this
      .setCode(data.code)
      .setName(data.name)
      .setAltcoin(data.altcoin)
      .setBtcVolume(data.btcVolume)
      .setLastRate(data.lastRate)
      .setAverageRate6h(data.averageRate6h)
      .setAverageRate12h(data.averageRate12h)
      .setAverageRate24h(data.averageRate24h)
  }

  setCode(code) {
    this.code = code
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  setAltcoin(boolean) {
    this.altcoin = boolean
    return this
  }

  setBtcVolume(volume) {
    this.btcVolume = volume
    return this
  }

  setLastRate(amount) {
    this.lastRate = amount
    return this
  }

  setAverageRate6h(amount) {
    this.averageRate6h = amount
    return this
  }

  setAverageRate12h(amount) {
    this.averageRate12h = amount
    return this
  }

  setAverageRate24h(amount) {
    this.averageRate24h = amount
    return this
  }

  toJSON() {
    const data = {}
    if (this.code) {
      data.code = this.code
    }
    if (Helper.exists(this.name)) {
      data.name = this.name
    }
    if (Helper.exists(this.altcoin)) {
      data.altcoin = this.altcoin
    }
    if (Helper.exists(this.btcVolume)) {
      data.btcVolume = this.btcVolume
    }
    if (Helper.exists(this.lastRate)) {
      data.lastRate = this.lastRate
    }
    if (Helper.exists(this.averageRate6h)) {
      data.averageRate6h = this.averageRate6h
    }
    if (Helper.exists(this.averageRate12h)) {
      data.averageRate12h = this.averageRate12h
    }
    if (Helper.exists(this.averageRate24h)) {
      data.averageRate24h = this.averageRate24h
    }
    return data
  }
}
Currency.fromParams = (params = {}) => {
  const data = {
    code: params.code,
    name: params.name,
    altcoin: params.altcoin,
    btcVolume: params.volume_btc,
    averageRate6h: params.avg_6h,
    averageRate12h: params.avg_12h,
    averageRate24h: params.avg_24h
  }
  if (params.rates) {
    data.lastRate = params.rates.last
  }
  if (data.btcVolume) {
    data.btcVolume = parseFloat(data.btcVolume)
  }
  if (data.lastRate) {
    data.lastRate = parseFloat(data.lastRate)
  }
  if (data.averageRate6h) {
    data.averageRate6h = parseFloat(data.averageRate6h)
  }
  if (data.averageRate12h) {
    data.averageRate12h = parseFloat(data.averageRate12h)
  }
  if (data.averageRate24h) {
    data.averageRate24h = parseFloat(data.averageRate24h)
  }
  return new Currency(data)
}
Currency.from = data => new Currency(data)

module.exports = Currency
