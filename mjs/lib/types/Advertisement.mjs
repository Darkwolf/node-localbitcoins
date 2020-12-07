import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import { AdvertisementType, TradeType, ReferenceType } from '../constants/index.mjs'
import User from './User.mjs'
import PaymentDetails from './PaymentDetails.mjs'

export default class Advertisement {
  static fromParams(params = {}, context) {
    const advertisement = params.data || params
    const data = {
      id: advertisement.id || advertisement.ad_id,
      tradeType: advertisement.trade_type,
      from: advertisement.profile || advertisement.advertiser,
      countryCode: advertisement.countrycode,
      location: advertisement.location_string,
      city: advertisement.city,
      latitude: advertisement.lat,
      longitude: advertisement.lon,
      currency: advertisement.currency,
      paymentMethod: advertisement.online_provider,
      firstTimeBtcLimit: advertisement.first_time_limit_btc,
      btcVolumeCoefficient: advertisement.volume_coefficient_btc,
      minAmount: advertisement.min_amount,
      maxAmount: advertisement.max_amount,
      maxAvailableAmount: advertisement.max_amount_available,
      marketUsdPrice: advertisement.temp_price_usd,
      marketPrice: advertisement.temp_price,
      smsVerificationRequired: advertisement.sms_verification_required,
      referenceType: advertisement.reference_type,
      displayReference: advertisement.display_reference,
      visible: advertisement.visible,
      hiddenByOpeningHours: advertisement.hidden_by_opening_hours,
      floating: advertisement.floating,
      localOffice: advertisement.is_local_office,
      requireFeedbackScore: advertisement.require_feedback_score,
      requireTradeVolume: advertisement.require_trade_volume,
      text: advertisement.msg,
      trustedByAdvertiserOnly: advertisement.require_trusted_by_advertiser,
      identificationRequired: advertisement.require_identification,
      paymentWindowMinutes: advertisement.payment_window_minutes,
      bankName: advertisement.bank_name,
      hasLowRisk: advertisement.is_low_risk,
      trackMaxAmount: advertisement.track_max_amount,
      atmModel: advertisement.atm_model,
      priceEquation: advertisement.price_equation,
      openingHours: advertisement.opening_hours,
      paymentDescription: advertisement.account_info,
      paymentDetails: advertisement.account_details,
      date: advertisement.created_at
    }
    if (data.tradeType) {
      data.tradeType = data.tradeType.toLowerCase()
    }
    data.type = (data.tradeType === TradeType.LOCAL_BUY || data.tradeType === TradeType.ONLINE_BUY) ? AdvertisementType.BUY : AdvertisementType.SELL
    if (data.from) {
      data.from = User.fromParams(data.from, context)
    }
    if (data.paymentMethod) {
      data.paymentMethod = data.paymentMethod.toLowerCase()
    }
    if (data.firstTimeBtcLimit) {
      data.firstTimeBtcLimit = parseFloat(data.firstTimeBtcLimit)
    }
    if (data.btcVolumeCoefficient) {
      data.btcVolumeCoefficient = parseFloat(data.btcVolumeCoefficient)
    }
    if (data.minAmount) {
      data.minAmount = parseFloat(data.minAmount)
    }
    if (data.maxAmount) {
      data.maxAmount = parseFloat(data.maxAmount)
    }
    if (data.maxAvailableAmount) {
      data.maxAvailableAmount = parseFloat(data.maxAvailableAmount)
    }
    if (data.marketUsdPrice) {
      data.marketUsdPrice = parseFloat(data.marketUsdPrice)
    }
    if (data.marketPrice) {
      data.marketPrice = parseFloat(data.marketPrice)
    }
    if (data.referenceType) {
      data.referenceType = data.referenceType.toLowerCase()
      if (data.referenceType === 'numbers') {
        data.referenceType = ReferenceType.NUMERIC
      } else if (data.referenceType === 'letters') {
        data.referenceType = ReferenceType.LITERAL
      }
    }
    if (data.openingHours) {
      data.openingHours = data.openingHours !== 'null' ? JSON.parse(data.openingHours).map(hours => hours.map(hour =>
        Helper.exists(hour) && hour !== 'null' ? parseFloat(hour) : null
      )) : null
    }
    if (data.paymentDetails) {
      data.paymentDetails = PaymentDetails.fromParams(data.paymentDetails, context)
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    if (params.actions) {
      data.url = params.actions.public_view || params.actions.advertisement_public_view
      data.editUrl = params.actions.html_form
    }
    return new Advertisement(data, context)
  }

  static from(data, context) {
    return new Advertisement(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setTradeType(data.tradeType)
      .setFrom(data.from)
      .setCountryCode(data.countryCode)
      .setLocation(data.location)
      .setCity(data.city)
      .setLatitude(data.latitude)
      .setLongitude(data.longitude)
      .setCurrency(data.currency)
      .setPaymentMethod(data.paymentMethod)
      .setFirstTimeBtcLimit(data.firstTimeBtcLimit)
      .setBtcVolumeCoefficient(data.btcVolumeCoefficient)
      .setMinAmount(data.minAmount)
      .setMaxAmount(data.maxAmount)
      .setMaxAvailableAmount(data.maxAvailableAmount)
      .setMarketUsdPrice(data.marketUsdPrice)
      .setMarketPrice(data.marketPrice)
      .setSmsVerificationRequired(data.smsVerificationRequired)
      .setReferenceType(data.referenceType)
      .setDisplayReference(data.displayReference)
      .setVisible(data.visible)
      .setHiddenByOpeningHours(data.hiddenByOpeningHours)
      .setFloating(data.floating)
      .setLocalOffice(data.localOffice)
      .setRequireFeedbackScore(data.requireFeedbackScore)
      .setRequireTradeVolume(data.requireTradeVolume)
      .setText(data.text)
      .setTrustedByAdvertiserOnly(data.trustedByAdvertiserOnly)
      .setIdentificationRequired(data.identificationRequired)
      .setPaymentWindowMinutes(data.paymentWindowMinutes)
      .setBankName(data.bankName)
      .setHasLowRisk(data.hasLowRisk)
      .setTrackMaxAmount(data.trackMaxAmount)
      .setAtmModel(data.atmModel)
      .setPriceEquation(data.priceEquation)
      .setOpeningHours(data.openingHours)
      .setPaymentDescription(data.paymentDescription)
      .setPaymentDetails(data.paymentDetails)
      .setUrl(data.url)
      .setEditUrl(data.editUrl)
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

  setTradeType(type) {
    this.tradeType = type
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setCountryCode(code) {
    this.countryCode = code
    return this
  }

  setLocation(location) {
    this.location = location
    return this
  }

  setCity(city) {
    this.city = city
    return this
  }

  setLatitude(latitude) {
    this.latitude = latitude
    return this
  }

  setLongitude(longitude) {
    this.longitude = longitude
    return this
  }

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setPaymentMethod(method) {
    this.paymentMethod = method
    return this
  }

  setFirstTimeBtcLimit(limit) {
    this.firstTimeBtcLimit = limit
    return this
  }

  setBtcVolumeCoefficient(value) {
    this.btcVolumeCoefficient = value
    return this
  }

  setMinAmount(amount) {
    this.minAmount = amount
    return this
  }

  setMaxAmount(amount) {
    this.maxAmount = amount
    return this
  }

  setMaxAvailableAmount(amount) {
    this.maxAvailableAmount = amount
    return this
  }

  setMarketUsdPrice(price) {
    this.marketUsdPrice = price
    return this
  }

  setMarketPrice(price) {
    this.marketPrice = price
    return this
  }

  setSmsVerificationRequired(boolean) {
    this.smsVerificationRequired = boolean
    return this
  }

  setReferenceType(type) {
    this.referenceType = type
    return this
  }

  setDisplayReference(boolean) {
    this.displayReference = boolean
    return this
  }

  setVisible(boolean) {
    this.visible = boolean
    return this
  }

  setHiddenByOpeningHours(boolean) {
    this.hiddenByOpeningHours = boolean
    return this
  }

  setFloating(boolean) {
    this.floating = boolean
    return this
  }

  setLocalOffice(boolean) {
    this.localOffice = boolean
    return this
  }

  setRequireFeedbackScore(score) {
    this.requireFeedbackScore = score
    return this
  }

  setRequireTradeVolume(volume) {
    this.requireTradeVolume = volume
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setTrustedByAdvertiserOnly(boolean) {
    this.trustedByAdvertiserOnly = boolean
    return this
  }

  setIdentificationRequired(boolean) {
    this.identificationRequired = boolean
    return this
  }

  setPaymentWindowMinutes(minutes) {
    this.paymentWindowMinutes = minutes
    return this
  }

  setBankName(name) {
    this.bankName = name
    return this
  }

  setHasLowRisk(boolean) {
    this.hasLowRisk = boolean
    return this
  }

  setTrackMaxAmount(boolean) {
    this.trackMaxAmount = boolean
    return this
  }

  setAtmModel(model) {
    this.atmModel = model
    return this
  }

  setPriceEquation(equation) {
    this.priceEquation = equation
    return this
  }

  setOpeningHours(openingHours) {
    this.openingHours = openingHours
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

  setUrl(url) {
    this.url = url
    return this
  }

  setEditUrl(url) {
    this.editUrl = url
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  get() {
    return this.context.localbitcoins.getAdvertisement(this.id)
  }

  edit(options) {
    return this.context.localbitcoins.editAdvertisement(this.id, {
      ...this,
      ...options
    })
  }

  setNewPriceEquation(equation) {
    return this.context.localbitcoins.setAdvertisementPriceEquation(this.id, equation)
  }

  delete() {
    return this.context.localbitcoins.deleteAdvertisement(this.id)
  }

  createTrade(amount, message) {
    return this.context.localbitcoins.createTrade(this.id, amount, message)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.tradeType) {
      data.tradeType = this.tradeType
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.countryCode) {
      data.countryCode = this.countryCode
    }
    if (Helper.exists(this.location)) {
      data.location = this.location
    }
    if (Helper.exists(this.city)) {
      data.city = this.city
    }
    if (Helper.exists(this.latitude)) {
      data.latitude = this.latitude
    }
    if (Helper.exists(this.longitude)) {
      data.longitude = this.longitude
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (this.paymentMethod) {
      data.paymentMethod = this.paymentMethod
    }
    if (Helper.exists(this.firstTimeBtcLimit)) {
      data.firstTimeBtcLimit = this.firstTimeBtcLimit
    }
    if (Helper.exists(this.btcVolumeCoefficient)) {
      data.btcVolumeCoefficient = this.btcVolumeCoefficient
    }
    if (Helper.exists(this.minAmount)) {
      data.minAmount = this.minAmount
    }
    if (Helper.exists(this.maxAmount)) {
      data.maxAmount = this.maxAmount
    }
    if (Helper.exists(this.maxAvailableAmount)) {
      data.maxAvailableAmount = this.maxAvailableAmount
    }
    if (Helper.exists(this.marketUsdPrice)) {
      data.marketUsdPrice = this.marketUsdPrice
    }
    if (Helper.exists(this.marketPrice)) {
      data.marketPrice = this.marketPrice
    }
    if (Helper.exists(this.smsVerificationRequired)) {
      data.smsVerificationRequired = this.smsVerificationRequired
    }
    if (this.referenceType) {
      data.referenceType = this.referenceType
    }
    if (Helper.exists(this.displayReference)) {
      data.displayReference = this.displayReference
    }
    if (Helper.exists(this.visible)) {
      data.visible = this.visible
    }
    if (Helper.exists(this.hiddenByOpeningHours)) {
      data.hiddenByOpeningHours = this.hiddenByOpeningHours
    }
    if (Helper.exists(this.floating)) {
      data.floating = this.floating
    }
    if (Helper.exists(this.localOffice)) {
      data.localOffice = this.localOffice
    }
    if (Helper.exists(this.requireFeedbackScore)) {
      data.requireFeedbackScore = this.requireFeedbackScore
    }
    if (Helper.exists(this.requireTradeVolume)) {
      data.requireTradeVolume = this.requireTradeVolume
    }
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (Helper.exists(this.trustedByAdvertiserOnly)) {
      data.trustedByAdvertiserOnly = this.trustedByAdvertiserOnly
    }
    if (Helper.exists(this.identificationRequired)) {
      data.identificationRequired = this.identificationRequired
    }
    if (Helper.exists(this.paymentWindowMinutes)) {
      data.paymentWindowMinutes = this.paymentWindowMinutes
    }
    if (Helper.exists(this.bankName)) {
      data.bankName = this.bankName
    }
    if (Helper.exists(this.hasLowRisk)) {
      data.hasLowRisk = this.hasLowRisk
    }
    if (Helper.exists(this.trackMaxAmount)) {
      data.trackMaxAmount = this.trackMaxAmount
    }
    if (this.atmModel) {
      data.atmModel = this.atmModel
    }
    if (this.priceEquation) {
      data.priceEquation = this.priceEquation
    }
    if (this.openingHours) {
      data.openingHours = this.openingHours
    }
    if (Helper.exists(this.paymentDescription)) {
      data.paymentDescription = this.paymentDescription
    }
    if (this.paymentDetails) {
      data.paymentDetails = this.paymentDetails.toJSON()
    }
    if (this.url) {
      data.url = this.url
    }
    if (this.editUrl) {
      data.editUrl = this.editUrl
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
