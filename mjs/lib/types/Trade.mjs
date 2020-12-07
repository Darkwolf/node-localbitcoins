import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import { TradeType, TradeRole } from '../constants/index.mjs'
import User from './User.mjs'
import Advertisement from './Advertisement.mjs'
import PaymentDetails from './PaymentDetails.mjs'

export default class Trade {
  static fromParams(params = {}, context) {
    const trade = params.data || params
    const data = {
      id: trade.contact_id,
      buyer: trade.buyer,
      seller: trade.seller,
      advertisement: trade.advertisement,
      referenceCode: trade.reference_code,
      currency: trade.currency,
      amount: trade.amount,
      btcAmount: trade.amount_btc,
      btcFee: trade.fee_btc,
      price: trade.price,
      exchangeRateDate: trade.exchange_rate_updated_at,
      cancelDate: trade.canceled_at,
      escrowDate: trade.escrowed_at,
      fundingDate: trade.funded_at,
      paymentDate: trade.payment_completed_at,
      disputeDate: trade.disputed_at,
      closeDate: trade.closed_at,
      releaseDate: trade.released_at,
      paymentDescription: trade.account_info,
      paymentDetails: trade.account_details,
      funded: trade.is_funded,
      floating: trade.floating,
      date: trade.created_at
    }
    if (trade.is_buying) {
      data.role = TradeRole.BUYER
    } else if (trade.is_selling) {
      data.role = TradeRole.SELLER
    }
    if (data.buyer) {
      data.buyer = User.fromParams(data.buyer, context)
    }
    if (data.seller) {
      data.seller = User.fromParams(data.seller, context)
    }
    if (data.advertisement) {
      data.advertisement = Advertisement.fromParams({
        data: data.advertisement,
        actions: params.actions
      }, context)
      data.type = data.advertisement.tradeType
    }
    if (data.amount) {
      data.amount = parseFloat(data.amount)
    }
    if (data.btcAmount) {
      data.btcAmount = parseFloat(data.btcAmount)
    }
    if (data.btcFee) {
      data.btcFee = parseFloat(data.btcFee)
    }
    if (data.price) {
      data.price = parseFloat(data.price)
    }
    if (!trade.amount && trade.price && trade.amount_btc) {
      const amount = data.price * data.btcAmount
      data.amount = trade.price.includes('.') ? parseFloat(amount.toFixed(trade.price.split('.')[1].length)) : Math.floor(amount)
    }
    if (data.exchangeRateDate) {
      data.exchangeRateDate = new UnixTimestamp(data.exchangeRateDate).seconds
    }
    if (data.cancelDate) {
      data.cancelDate = new UnixTimestamp(data.cancelDate).seconds
    }
    if (data.escrowDate) {
      data.escrowDate = new UnixTimestamp(data.escrowDate).seconds
    }
    if (data.fundingDate) {
      data.fundingDate = new UnixTimestamp(data.fundingDate).seconds
    }
    if (data.paymentDate) {
      data.paymentDate = new UnixTimestamp(data.paymentDate).seconds
    }
    if (data.disputeDate) {
      data.disputeDate = new UnixTimestamp(data.disputeDate).seconds
    }
    if (data.closeDate) {
      data.closeDate = new UnixTimestamp(data.closeDate).seconds
    }
    if (data.releaseDate) {
      data.releaseDate = new UnixTimestamp(data.releaseDate).seconds
    }
    if (data.paymentDetails) {
      data.paymentDetails = PaymentDetails.fromParams(data.paymentDetails, context)
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    return new Trade(data, context)
  }

  static from(data, context) {
    return new Trade(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setRole(data.role)
      .setBuyer(data.buyer)
      .setSeller(data.seller)
      .setAdvertisement(data.advertisement)
      .setReferenceCode(data.referenceCode)
      .setCurrency(data.currency)
      .setAmount(data.amount)
      .setBtcAmount(data.btcAmount)
      .setBtcFee(data.btcFee)
      .setPrice(data.price)
      .setExchangeRateDate(data.exchangeRateDate)
      .setCancelDate(data.cancelDate)
      .setEscrowDate(data.escrowDate)
      .setFundingDate(data.fundingDate)
      .setPaymentDate(data.paymentDate)
      .setDisputeDate(data.disputeDate)
      .setCloseDate(data.closeDate)
      .setReleaseDate(data.releaseDate)
      .setPaymentDescription(data.paymentDescription)
      .setPaymentDetails(data.paymentDetails)
      .setFunded(data.funded)
      .setFloating(data.floating)
      .setDate(data.date)
  }

  get isBuy() {
    return this.type === AdvertisementType.BUY
  }

  get isSell() {
    return this.type === AdvertisementType.SELL
  }

  get isLocalBuy() {
    return this.tradeType === TradeType.LOCAL_BUY
  }

  get isLocalSell() {
    return this.tradeType === TradeType.LOCAL_SELL
  }

  get isOnlineBuy() {
    return this.tradeType === TradeType.ONLINE_BUY
  }

  get isOnlineSell() {
    return this.tradeType === TradeType.ONLINE_SELL
  }

  get isLocal() {
    return this.isLocalBuy || this.isLocalSell
  }

  get isOnline() {
    return this.isOnlineBuy || this.isOnlineSell
  }

  get isBuyer() {
    return this.role === TradeRole.BUYER
  }

  get isSeller() {
    return this.role === TradeRole.SELLER
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setRole(role) {
    this.role = role
    return this
  }

  setBuyer(user) {
    this.buyer = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setSeller(user) {
    this.seller = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setAdvertisement(advertisement) {
    this.advertisement = advertisement ? (
      advertisement instanceof Advertisement ? advertisement : new Advertisement(advertisement, this.context)
    ) : undefined
    return this
  }

  setReferenceCode(code) {
    this.referenceCode = code
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setAmount(amount) {
    this.amount = amount
    return this
  }

  setBtcAmount(amount) {
    this.btcAmount = amount
    return this
  }

  setBtcFee(amount) {
    this.btcFee = amount
    return this
  }

  setPrice(price) {
    this.price = price
    return this
  }

  setExchangeRateDate(date) {
    this.exchangeRateDate = date
    return this
  }

  setCancelDate(date) {
    this.cancelDate = date
    return this
  }

  setEscrowDate(date) {
    this.escrowDate = date
    return this
  }

  setFundingDate(date) {
    this.fundingDate = date
    return this
  }

  setPaymentDate(date) {
    this.paymentDate = date
    return this
  }

  setDisputeDate(date) {
    this.disputeDate = date
    return this
  }

  setCloseDate(date) {
    this.closeDate = date
    return this
  }

  setReleaseDate(date) {
    this.releaseDate = date
    return this
  }

  setPaymentDescription(description) {
    this.paymentDescription = description
    return this
  }

  setPaymentDetails(details) {
    this.paymentDetails = details ? (
      details instanceof PaymentDetails ? details : new PaymentDetails(details, this.context)
    ) : undefined
    return this
  }

  setFunded(boolean) {
    this.funded = boolean
    return this
  }

  setFloating(boolean) {
    this.floating = boolean
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  get() {
    return this.context.localbitcoins.getTrade(this.id)
  }

  cancel() {
    return this.context.localbitcoins.cancelTrade(this.id)
  }

  dispute(topic) {
    return this.context.localbitcoins.disputeTrade(this.id, topic)
  }

  markPaid() {
    return this.context.localbitcoins.markTradePaid(this.id)
  }

  markRealNameVerification(status) {
    return this.context.localbitcoins.markTradeRealNameVerification(this.id, status)
  }

  markRealNameConfirmed() {
    return this.context.localbitcoins.markTradeRealNameConfirmed(this.id)
  }

  markIdentified() {
    return this.context.localbitcoins.markTradeIdentified(this.id)
  }

  release() {
    return this.context.localbitcoins.releaseTrade(this.id)
  }

  releaseWithPin(pin) {
    return this.context.localbitcoins.releaseTradeWithPin(this.id, pin)
  }

  downloadAttachment(id) {
    return this.context.localbitcoins.downloadAttachment(this.id, id)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.role) {
      data.role = this.role
    }
    if (this.buyer) {
      data.buyer = this.buyer.toJSON()
    }
    if (this.seller) {
      data.seller = this.seller.toJSON()
    }
    if (this.advertisement) {
      data.advertisement = this.advertisement.toJSON()
    }
    if (this.referenceCode) {
      data.referenceCode = this.referenceCode
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.amount)) {
      data.amount = this.amount
    }
    if (Helper.exists(this.btcAmount)) {
      data.btcAmount = this.btcAmount
    }
    if (Helper.exists(this.btcFee)) {
      data.btcFee = this.btcFee
    }
    if (Helper.exists(this.price)) {
      data.price = this.price
    }
    if (this.exchangeRateDate) {
      data.exchangeRateDate = this.exchangeRateDate
    }
    if (this.cancelDate) {
      data.cancelDate = this.cancelDate
    }
    if (this.escrowDate) {
      data.escrowDate = this.escrowDate
    }
    if (this.fundingDate) {
      data.fundingDate = this.fundingDate
    }
    if (this.paymentDate) {
      data.paymentDate = this.paymentDate
    }
    if (this.disputeDate) {
      data.disputeDate = this.disputeDate
    }
    if (this.closeDate) {
      data.closeDate = this.closeDate
    }
    if (this.releaseDate) {
      data.releaseDate = this.releaseDate
    }
    if (Helper.exists(this.paymentDescription)) {
      data.paymentDescription = this.paymentDescription
    }
    if (this.paymentDetails) {
      data.paymentDetails = this.paymentDetails.toJSON()
    }
    if (Helper.exists(this.funded)) {
      data.funded = this.funded
    }
    if (Helper.exists(this.floating)) {
      data.floating = this.floating
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
