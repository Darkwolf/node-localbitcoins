import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'

export default class User {
  static fromParams(params = {}, context) {
    const data = {
      username: params.username,
      displayName: params.name,
      realName: params.real_name,
      companyName: params.company_name,
      tradingPartnerCount: params.trading_partners_count,
      tradeVolumeText: params.trade_volume_text,
      hasCommonTrades: params.has_common_trades,
      tradeCountText: params.confirmed_trade_count_text || params.trade_count,
      feedbackScore: params.feedback_score,
      feedbackCount: params.feedback_count,
      unconfirmedFeedbackCount: params.feedbacks_unconfirmed_count,
      trustedByUsersCount: params.trusted_count,
      blockedByUsersCount: params.blocked_count,
      identificationDate: params.identity_verified_at,
      trustedRealNameVerificationsCount: params.real_name_verifications_trusted,
      untrustedRealNameVerificationsCount: params.real_name_verifications_untrusted,
      rejectedRealNameVerificationsCount: params.real_name_verifications_rejected,
      countryCodeByIpAddress: params.countrycode_by_ip,
      countryCodeByPhoneNumber: params.countrycode_by_phone_number,
      myFeedback: params.my_feedback,
      myFeedbackMessage: params.my_feedback_msg,
      url: params.url,
      admin: params.is_admin,
      lastOnline: params.last_online,
      date: params.created_at
    }
    if (data.feedbackScore === 'N/A') {
      data.feedbackScore = 0
    }
    if (data.identificationDate) {
      data.identificationDate = new UnixTimestamp(data.identificationDate).seconds
    }
    if (data.lastOnline) {
      data.lastOnline = new UnixTimestamp(data.lastOnline).seconds
    }
    if (data.date) {
      data.date = new UnixTimestamp(data.date).seconds
    }
    return new User(data, context)
  }

  static from(data, context) {
    return new User(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUsername(data.username)
      .setDisplayName(data.displayName)
      .setRealName(data.realName)
      .setCompanyName(data.companyName)
      .setTradingPartnerCount(data.tradingPartnerCount)
      .setTradeVolumeText(data.tradeVolumeText)
      .setHasCommonTrades(data.hasCommonTrades)
      .setTradeCountText(data.tradeCountText)
      .setFeedbackScore(data.feedbackScore)
      .setFeedbackCount(data.feedbackCount)
      .setUnconfirmedFeedbackCount(data.unconfirmedFeedbackCount)
      .setTrustedByUsersCount(data.trustedByUsersCount)
      .setBlockedByUsersCount(data.blockedByUsersCount)
      .setIdentificationDate(data.identificationDate)
      .setTrustedRealNameVerificationsCount(data.trustedRealNameVerificationsCount)
      .setUntrustedRealNameVerificationsCount(data.untrustedRealNameVerificationsCount)
      .setRejectedRealNameVerificationsCount(data.rejectedRealNameVerificationsCount)
      .setCountryCodeByIpAddress(data.countryCodeByIpAddress)
      .setCountryCodeByPhoneNumber(data.countryCodeByPhoneNumber)
      .setMyFeedback(data.myFeedback)
      .setMyFeedbackMessage(data.myFeedbackMessage)
      .setUrl(data.url)
      .setAdmin(data.admin)
      .setLastOnline(data.lastOnline)
      .setDate(data.date)
  }

  get totalFeedbackCount() {
    return (this.feedbackCount || 0) + (this.unconfirmedFeedbackCount || 0)
  }

  get totalNameVerificationsCount() {
    return (this.trustedNameVerificationsCount || 0) + (this.untrustedNameVerificationsCount || 0) + (this.rejectedNameVerificationsCount || 0)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUsername(username) {
    this.username = username
    return this
  }

  setDisplayName(name) {
    this.displayName = name
    return this
  }

  setRealName(name) {
    this.realName = name
    return this
  }

  setCompanyName(name) {
    this.companyName = name
    return this
  }

  setTradingPartnerCount(count) {
    this.tradingPartnerCount = count
    return this
  }

  setTradeVolumeText(text) {
    this.tradeVolumeText = text
    return this
  }

  setHasCommonTrades(boolean) {
    this.hasCommonTrades = boolean
    return this
  }

  setTradeCountText(text) {
    this.tradeCountText = text
    return this
  }

  setFeedbackScore(score) {
    this.feedbackScore = score
    return this
  }

  setFeedbackCount(count) {
    this.feedbackCount = count
    return this
  }

  setUnconfirmedFeedbackCount(count) {
    this.unconfirmedFeedbackCount = count
    return this
  }

  setTrustedByUsersCount(count) {
    this.trustedByUsersCount = count
    return this
  }

  setBlockedByUsersCount(count) {
    this.blockedByUsersCount = count
    return this
  }

  setIdentificationDate(date) {
    this.identificationDate = date
    return this
  }

  setTrustedRealNameVerificationsCount(count) {
    this.trustedRealNameVerificationsCount = count
    return this
  }

  setUntrustedRealNameVerificationsCount(count) {
    this.untrustedRealNameVerificationsCount = count
    return this
  }

  setRejectedRealNameVerificationsCount(count) {
    this.rejectedRealNameVerificationsCount = count
    return this
  }

  setCountryCodeByIpAddress(code) {
    this.countryCodeByIpAddress = code
    return this
  }

  setCountryCodeByPhoneNumber(code) {
    this.countryCodeByPhoneNumber = code
    return this
  }

  setMyFeedback(type) {
    this.myFeedback = type
    return this
  }

  setMyFeedbackMessage(message) {
    this.myFeedbackMessage = message
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setAdmin(boolean) {
    this.admin = boolean
    return this
  }

  setLastOnline(date) {
    this.lastOnline = date
    return this
  }

  setDate(date) {
    this.date = date
    return this
  }

  sendFeedback(feedback, message) {
    return this.context.localbitcoins.sendFeedback(this.username, feedback, message)
  }

  get() {
    return this.context.localbitcoins.getUser(this.username)
  }

  getRealNameVerifications() {
    return this.context.localbitcoins.getUserRealNameVerifications(this.username)
  }

  toJSON() {
    const data = {}
    if (this.username) {
      data.username = this.username
    }
    if (Helper.exists(this.displayName)) {
      data.displayName = this.displayName
    }
    if (Helper.exists(this.realName)) {
      data.realName = this.realName
    }
    if (Helper.exists(this.companyName)) {
      data.companyName = this.companyName
    }
    if (Helper.exists(this.tradingPartnerCount)) {
      data.tradingPartnerCount = this.tradingPartnerCount
    }
    if (Helper.exists(this.tradeVolumeText)) {
      data.tradeVolumeText = this.tradeVolumeText
    }
    if (Helper.exists(this.hasCommonTrades)) {
      data.hasCommonTrades = this.hasCommonTrades
    }
    if (Helper.exists(this.tradeCountText)) {
      data.tradeCountText = this.tradeCountText
    }
    if (Helper.exists(this.feedbackScore)) {
      data.feedbackScore = this.feedbackScore
    }
    if (Helper.exists(this.feedbackCount)) {
      data.feedbackCount = this.feedbackCount
    }
    if (Helper.exists(this.unconfirmedFeedbackCount)) {
      data.unconfirmedFeedbackCount = this.unconfirmedFeedbackCount
    }
    if (Helper.exists(this.trustedByUsersCount)) {
      data.trustedByUsersCount = this.trustedByUsersCount
    }
    if (Helper.exists(this.blockedByUsersCount)) {
      data.blockedByUsersCount = this.blockedByUsersCount
    }
    if (this.identificationDate) {
      data.identificationDate = this.identificationDate
    }
    if (Helper.exists(this.trustedRealNameVerificationsCount)) {
      data.trustedRealNameVerificationsCount = this.trustedRealNameVerificationsCount
    }
    if (Helper.exists(this.untrustedRealNameVerificationsCount)) {
      data.untrustedRealNameVerificationsCount = this.untrustedRealNameVerificationsCount
    }
    if (Helper.exists(this.rejectedRealNameVerificationsCount)) {
      data.rejectedRealNameVerificationsCount = this.rejectedRealNameVerificationsCount
    }
    if (this.countryCodeByIpAddress) {
      data.countryCodeByIpAddress = this.countryCodeByIpAddress
    }
    if (this.countryCodeByPhoneNumber) {
      data.countryCodeByPhoneNumber = this.countryCodeByPhoneNumber
    }
    if (this.myFeedback) {
      data.myFeedback = this.myFeedback
    }
    if (Helper.exists(this.myFeedbackMessage)) {
      data.myFeedbackMessage = this.myFeedbackMessage
    }
    if (this.url) {
      data.url = this.url
    }
    if (Helper.exists(this.admin)) {
      data.admin = this.admin
    }
    if (this.lastOnline) {
      data.lastOnline = this.lastOnline
    }
    if (this.date) {
      data.date = this.date
    }
    return data
  }
}
