const Helper = require('@darkwolf/helper.cjs')

class PaymentDetails {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setEthereumAddress(data.ethereumAddress)
      .setLitecoinAddress(data.litecoinAddress)
      .setDashAddress(data.dashAddress)
      .setStellarAddress(data.stellarAddress)
      .setMoneroAddress(data.moneroAddress)
      .setRippleAddress(data.rippleAddress)
      .setRippleTag(data.rippleTag)
      .setVergeAddress(data.vergeAddress)
      .setOkbAddress(data.okbAddress)
      .setReceiverEmail(data.receiverEmail)
      .setPhoneNumber(data.phoneNumber)
      .setReceiverName(data.receiverName)
      .setIban(data.iban)
      .setSwiftBic(data.swiftBic)
      .setBillerCode(data.billerCode)
      .setBsb(data.bsb)
      .setAccountNumber(data.accountNumber)
      .setSortCode(data.sortCode)
      .setReference(data.reference)
      .setMessage(data.message)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setEthereumAddress(address) {
    this.ethereumAddress = address
    return this
  }

  setLitecoinAddress(address) {
    this.litecoinAddress = address
    return this
  }

  setDashAddress(address) {
    this.dashAddress = address
    return this
  }

  setStellarAddress(address) {
    this.stellarAddress = address
    return this
  }

  setMoneroAddress(address) {
    this.moneroAddress = address
    return this
  }

  setRippleAddress(address) {
    this.rippleAddress = address
    return this
  }

  setRippleTag(tag) {
    this.rippleTag = tag
    return this
  }

  setVergeAddress(address) {
    this.vergeAddress = address
    return this
  }

  setOkbAddress(address) {
    this.okbAddress = address
    return this
  }

  setReceiverEmail(email) {
    this.receiverEmail = email
    return this
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  setReceiverName(name) {
    this.receiverName = name
    return this
  }

  setIban(iban) {
    this.iban = iban
    return this
  }

  setSwiftBic(bic) {
    this.swiftBic = bic
    return this
  }

  setBillerCode(code) {
    this.billerCode = code
    return this
  }

  setBsb(bsb) {
    this.bsb = bsb
    return this
  }

  setAccountNumber(accountNumber) {
    this.accountNumber = accountNumber
    return this
  }

  setSortCode(code) {
    this.sortCode = code
    return this
  }

  setReference(reference) {
    this.reference = reference
    return this
  }

  setMessage(message) {
    this.message = message
    return this
  }

  toJSON() {
    const data = {}
    if (this.ethereumAddress) {
      data.ethereumAddress = this.ethereumAddress
    }
    if (this.litecoinAddress) {
      data.litecoinAddress = this.litecoinAddress
    }
    if (this.dashAddress) {
      data.dashAddress = this.dashAddress
    }
    if (this.stellarAddress) {
      data.stellarAddress = this.stellarAddress
    }
    if (this.moneroAddress) {
      data.moneroAddress = this.moneroAddress
    }
    if (this.rippleAddress) {
      data.rippleAddress = this.rippleAddress
    }
    if (this.rippleTag) {
      data.rippleTag = this.rippleTag
    }
    if (this.vergeAddress) {
      data.vergeAddress = this.vergeAddress
    }
    if (this.okbAddress) {
      data.okbAddress = this.okbAddress
    }
    if (this.receiverEmail) {
      data.receiverEmail = this.receiverEmail
    }
    if (this.phoneNumber) {
      data.phoneNumber = this.phoneNumber
    }
    if (this.receiverName) {
      data.receiverName = this.receiverName
    }
    if (this.iban) {
      data.iban = this.iban
    }
    if (this.swiftBic) {
      data.swiftBic = this.swiftBic
    }
    if (this.billerCode) {
      data.billerCode = this.billerCode
    }
    if (this.bsb) {
      data.bsb = this.bsb
    }
    if (this.accountNumber) {
      data.accountNumber = this.accountNumber
    }
    if (this.sortCode) {
      data.sortCode = this.sortCode
    }
    if (this.reference) {
      data.reference = this.reference
    }
    if (Helper.exists(this.message)) {
      data.message = this.message
    }
    return data
  }
}
PaymentDetails.fromParams = (params = {}, context) => new PaymentDetails({
  ethereumAddress: params.ethereum_address,
  litecoinAddress: params.litecoin_address,
  dashAddress: params.dash_address,
  stellarAddress: params.stellar_address,
  moneroAddress: params.monero_address,
  rippleAddress: params.ripple_address,
  rippleTag: params.ripple_tag,
  vergeAddress: params.verge_address,
  okbAddress: params.okb_address,
  receiverEmail: params.receiver_email,
  phoneNumber: params.phone_number,
  receiverName: params.receiver_name,
  iban: params.iban,
  swiftBic: params.swift_bic,
  billerCode: params.biller_code,
  bsb: params.bsb,
  accountNumber: params.account_number,
  sortCode: params.sort_code,
  reference: params.reference,
  message: params.message
}, context)
PaymentDetails.from = (data, context) => new PaymentDetails(data, context)

module.exports = PaymentDetails
