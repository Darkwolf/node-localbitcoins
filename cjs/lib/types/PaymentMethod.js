const Helper = require('@darkwolf/helper.cjs')

class PaymentMethod {
  constructor(data = {}) {
    this
      .setId(data.id)
      .setCode(data.code)
      .setName(data.name)
      .setCurrencies(data.currencies)
      .setBankNames(data.bankNames)
  }

  setId(id) {
    this.id = id
    return this
  }

  setCode(code) {
    this.code = code
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  setCurrencies(currencies) {
    this.currencies = currencies
    return this
  }

  setBankNames(names) {
    this.bankNames = names
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.code) {
      data.code = this.code
    }
    if (Helper.exists(this.name)) {
      data.name = this.name
    }
    if (this.currencies) {
      data.currencies = this.currencies
    }
    if (this.bankNames) {
      data.bankNames = this.bankNames
    }
    return data
  }
}
PaymentMethod.fromParams = (params = {}) => {
  const data = {
    id: params.id,
    code: params.code,
    name: params.name,
    currencies: params.currencies,
    bankNames: params.bank_name_choices
  }
  if (data.code) {
    data.code = data.code.toLowerCase()
  }
  return new PaymentMethod(data)
}
PaymentMethod.from = data => new PaymentMethod(data)

module.exports = PaymentMethod
