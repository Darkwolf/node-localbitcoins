import Helper from '@darkwolf/helper.mjs'

export default class Currency {
  static fromParams(params = {}) {
    const data = {
      code: params.code,
      name: params.name,
      altcoin: params.altcoin,
      btcVolume: params.volume_btc,
      avg6h: params.avg_6h,
      avg12h: params.avg_12h,
      avg24h: params.avg_24h
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
    if (data.avg6h) {
      data.avg6h = parseFloat(data.avg6h)
    }
    if (data.avg12h) {
      data.avg12h = parseFloat(data.avg12h)
    }
    if (data.avg24h) {
      data.avg24h = parseFloat(data.avg24h)
    }
    return new Currency(data)
  }

  static from(data) {
    return new Currency(data)
  }

  constructor(data = {}) {
    this
      .setCode(data.code)
      .setName(data.name)
      .setAltcoin(data.altcoin)
      .setBtcVolume(data.btcVolume)
      .setLastRate(data.lastRate)
      .setAvg6h(data.avg6h)
      .setAvg12h(data.avg12h)
      .setAvg24h(data.avg24h)
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

  setAvg6h(amount) {
    this.avg6h = amount
    return this
  }

  setAvg12h(amount) {
    this.avg12h = amount
    return this
  }

  setAvg24h(amount) {
    this.avg24h = amount
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
    if (Helper.exists(this.avg6h)) {
      data.avg6h = this.avg6h
    }
    if (Helper.exists(this.avg12h)) {
      data.avg12h = this.avg12h
    }
    if (Helper.exists(this.avg24h)) {
      data.avg24h = this.avg24h
    }
    return data
  }
}
