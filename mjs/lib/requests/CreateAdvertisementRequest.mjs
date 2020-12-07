import Helper from '@darkwolf/helper.mjs'
import { Advertisement } from '../types/index.mjs'
import { UnknownError } from '../errors/index.mjs'
import { EventType, AdvertisementType, TradeType, ReferenceType } from '../constants/index.mjs'

export default class CreateAdvertisementRequest {
  static method = 'POST'
  static endpoint = '/api/ad-create/'
  static authRequired = true

  static from(parameters, context) {
    return new CreateAdvertisementRequest(parameters, context)
  }

  constructor(parameters = {}, context) {
    this.method = CreateAdvertisementRequest.method
    this.endpoint = CreateAdvertisementRequest.endpoint
    this.authRequired = CreateAdvertisementRequest.authRequired
    this
      .setContext(context)
      .setTradeType(parameters.tradeType)
      .setCountryCode(parameters.countryCode)
      .setLocation(parameters.location)
      .setCity(parameters.city)
      .setLatitude(parameters.latitude)
      .setLongitude(parameters.longitude)
      .setCurrency(parameters.currency)
      .setPaymentMethod(parameters.paymentMethod)
      .setFirstTimeBtcLimit(parameters.firstTimeBtcLimit)
      .setBtcVolumeCoefficient(parameters.btcVolumeCoefficient)
      .setMinAmount(parameters.minAmount)
      .setMaxAmount(parameters.maxAmount)
      .setSmsVerificationRequired(parameters.smsVerificationRequired)
      .setReferenceType(parameters.referenceType)
      .setDisplayReference(parameters.displayReference)
      .setVisible(parameters.visible)
      .setFloating(parameters.floating)
      .setRequireFeedbackScore(parameters.requireFeedbackScore)
      .setRequireTradeVolume(parameters.requireTradeVolume)
      .setText(parameters.text)
      .setTrustedByAdvertiserOnly(parameters.trustedByAdvertiserOnly)
      .setIdentificationRequired(parameters.identificationRequired)
      .setPaymentWindowMinutes(parameters.paymentWindowMinutes)
      .setBankName(parameters.bankName)
      .setTrackMaxAmount(parameters.trackMaxAmount)
      .setPriceEquation(parameters.priceEquation)
      .setOpeningHours(parameters.openingHours)
      .setPaymentDescription(parameters.paymentDescription)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTradeType(type) {
    this.tradeType = type
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

  setFloating(boolean) {
    this.floating = boolean
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

  setTrackMaxAmount(boolean) {
    this.trackMaxAmount = boolean
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

  toParams() {
    const params = {}
    if (this.priceEquation) {
      params.price_equation = this.priceEquation
    }
    if (Helper.exists(this.latitude)) {
      params.lat = this.latitude
    }
    if (Helper.exists(this.longitude)) {
      params.lon = this.longitude
    }
    if (Helper.exists(this.city)) {
      params.city = this.city
    }
    if (Helper.exists(this.location)) {
      params.location_string = this.location
    }
    if (this.countryCode) {
      params.countrycode = this.countryCode
    }
    if (this.currency) {
      params.currency = this.currency
    }
    if (Helper.exists(this.paymentDescription)) {
      params.account_info = this.paymentDescription
    }
    if (Helper.exists(this.bankName)) {
      params.bank_name = this.bankName
    }
    if (Helper.exists(this.text)) {
      params.msg = `${this.text}`
    }
    if (Helper.exists(this.smsVerificationRequired)) {
      params.sms_verification_required = this.smsVerificationRequired
    }
    if (Helper.exists(this.trackMaxAmount)) {
      params.track_max_amount = this.trackMaxAmount
    }
    if (Helper.exists(this.trustedByAdvertiserOnly)) {
      params.require_trusted_by_advertiser = this.trustedByAdvertiserOnly
    }
    if (Helper.exists(this.identificationRequired)) {
      params.require_identification = this.identificationRequired
    }
    if (this.paymentMethod) {
      params.online_provider = this.paymentMethod.toUpperCase()
    }
    if (this.tradeType) {
      params.trade_type = this.tradeType.toUpperCase()
    }
    if (Helper.exists(this.minAmount)) {
      params.min_amount = this.minAmount
    }
    if (Helper.exists(this.maxAmount)) {
      params.max_amount = this.maxAmount
    }
    if (this.openingHours) {
      params.opening_hours = this.openingHours
    }
    if (Helper.exists(this.visible)) {
      params.visible = this.visible
    }
    if (Helper.exists(this.requireTradeVolume)) {
      params.require_trade_volume = this.requireTradeVolume
    }
    if (Helper.exists(this.requireFeedbackScore)) {
      params.require_feedback_score = this.requireFeedbackScore
    }
    if (Helper.exists(this.firstTimeBtcLimit)) {
      params.first_time_limit_btc = this.firstTimeBtcLimit
    }
    if (Helper.exists(this.btcVolumeCoefficient)) {
      params.volume_coefficient_btc = this.btcVolumeCoefficient
    }
    if (this.referenceType) {
      const referenceType = this.referenceType === ReferenceType.NUMERIC ? 'numbers' : this.referenceType === ReferenceType.LITERAL ? 'letters' : this.referenceType
      params.reference_type = referenceType.toUpperCase()
    }
    if (Helper.exists(this.displayReference)) {
      params.display_reference = this.displayReference
    }
    if (Helper.exists(this.paymentWindowMinutes)) {
      params.payment_window_minutes = this.paymentWindowMinutes
    }
    if (Helper.exists(this.floating)) {
      params.floating = this.floating
    }
    return params
  }

  async send() {
    const response = await this.context.localbitcoins.request(this)
    if (response) {
      if (response.ok) {
        response.setResult(new Advertisement({
          ...this,
          id: response.result.data.ad_id,
          type: (this.tradeType === TradeType.LOCAL_BUY || this.tradeType === TradeType.ONLINE_BUY) ? AdvertisementType.BUY : AdvertisementType.SELL
        }, this.context))
        this.context.localbitcoins.emit(EventType.RESPONSE, response)
        return response.result
      } else {
        const error = new UnknownError(response.message).setResponse(response)
        this.context.localbitcoins.emit(EventType.ERROR, error)
        if (!this.context.localbitcoins.settings.ignoreErrors) throw error
      }
    }
    return null
  }
}
