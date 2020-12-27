const crypto = require('crypto')
const EventEmitter = require('events')
const fetch = require('node-fetch')
const FormData = require('form-data')
const Helper = require('@darkwolf/helper.cjs')
const { UnixTimestamp } = require('@darkwolf/time.cjs')
const types = require('./types')
const requests = require('./requests')
const errors = require('./errors')
const constants = require('./constants')

class LocalBitcoins extends EventEmitter {
  constructor(options = {}) {
    super()
    if (options.hmac) {
      this.setHmac(options.hmac.key, options.hmac.secret)
    } else if (options.oauth2) {
      this.setOAuth2(options.oauth2)
    }
    this.setSettings(options.settings)
  }

  setHmac(key, secret) {
    this.hmac = {
      key,
      secret
    }
    return this
  }

  setOAuth2(options = {}) {
    this.oauth2 = {
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      accessToken: options.accessToken,
      refreshToken: options.refreshToken,
      expiresIn: options.expiresIn
    }
    return this
  }

  setSettings(settings) {
    this.settings = {
      ...LocalBitcoins.settings,
      ...settings
    }
    return this
  }

  setIgnoreErrors(boolean) {
    this.settings.ignoreErrors = boolean
    return this
  }

  setAutoRefreshToken(boolean) {
    this.settings.autoRefreshToken = boolean
    return this
  }

  setAgent(agent) {
    this.settings.agent = agent
    return this
  }

  async request(request) {
    this.emit(constants.EventType.REQUEST, request)
    try {
      const method = request.method || 'GET'
      const endpoint = request.endpoint
      const url = `${LocalBitcoins.URL}${endpoint}`
      let headers
      let body
      let encodedParams
      let uploadFiles
      if (request.toParams) {
        const params = request.toParams()
        if (method === 'POST') {
          uploadFiles = Object.values(params).some(param => param instanceof types.InputFile)
          if (uploadFiles) {
            body = Object.entries(params).reduce((form, [key, value]) => {
              if (Helper.exists(value)) {
                if (Helper.isObject(value)) {
                  if (value instanceof Boolean || value instanceof Number || value instanceof String) {
                    form.append(key, value.valueOf())
                  } else if (value instanceof types.InputFile) {
                    form.append(key, value.file, value.name)
                  } else {
                    form.append(key, JSON.stringify(value))
                  }
                } else {
                  form.append(key, value)
                }
              }
              return form
            }, new FormData())
          }
        }
        if (!uploadFiles) {
          encodedParams = Object.entries(params).reduce((params, [key, value]) => {
            if (Helper.exists(value)) {
              params.append(key, value)
            }
            return params
          }, new URLSearchParams())
        }
      }
      if (request.authRequired) {
        if (this.hmac) {
          const nonce = Date.now()
          const message = `${nonce}${this.hmac.key}${endpoint}`
          const signature = crypto
            .createHmac('sha256', this.hmac.secret)
            .update(message)
            .update(uploadFiles ? body.getBuffer() : `${encodedParams || ''}`)
            .digest('hex')
            .toUpperCase()
          headers = {
            'Apiauth-Key': this.hmac.key,
            'Apiauth-Nonce': nonce,
            'Apiauth-Signature': signature
          }
        } else if (this.oauth2) {
          if (this.settings.autoRefreshToken && (!this.oauth2.accessToken || !this.oauth2.expiresIn || this.oauth2.expiresIn < new UnixTimestamp().addMinutes(1))) {
            await this.refreshToken()
          }
          headers = {
            'Authorization-Extra': `Bearer ${this.oauth2.accessToken}`
          }
        }
      }
      const res = await fetch(`${url}${method === 'GET' && encodedParams ? `?${encodedParams}` : ''}`, {
        method,
        headers,
        body: method === 'POST' ? body || encodedParams : undefined,
        agent: this.settings.agent
      })
      let response = new types.Response({
        ok: false
      }, {
        localbitcoins: this,
        request,
        response: res
      })
      if (request instanceof requests.DownloadAttachmentRequest && res.status === 200) {
        try {
          res.data = await res.blob()
          response
            .setOk(true)
            .setResult(res.data)
        } catch (e) {}
      } else {
        try {
          res.data = await res.json()
          if (res.data.error) {
            if (request instanceof requests.RefreshTokenRequest) {
              response
                .setErrorCode(res.data.error)
                .setMessage(res.data.error_description || res.data.error)
            } else {
              response
                .setErrorCode(res.data.error.error_code)
                .setMessage(res.data.error.message)
              switch (response.errorCode) {
                case 2:
                case 41: throw new errors.UnauthorizedError(response.message).setResponse(response)
              }
            }
          } else {
            response
              .setOk(true)
              .setResult(res.data)
          }
        } catch (e) {}
      }
      return response
    } catch (e) {
      this.emit(constants.EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  async refreshToken() {
    const refreshToken = await new requests.RefreshTokenRequest({
      localbitcoins: this
    }).send()
    this.setOAuth2({
      ...this.oauth2,
      ...refreshToken
    })
    return refreshToken
  }

  revokeToken() {
    return new requests.RevokeTokenRequest({
      localbitcoins: this
    }).send()
  }

  getMe() {
    return new requests.GetMeRequest({
      localbitcoins: this
    }).send()
  }

  verifyPin(pin) {
    return new requests.VerifyPinRequest({
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  getAdvertisements(options) {
    return new requests.GetAdvertisementsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getMyAdvertisements(options) {
    return new requests.GetMyAdvertisementsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getAdvertisement(id) {
    return new requests.GetAdvertisementRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getAdvertisementsByIds(ids) {
    return new requests.GetAdvertisementsByIdsRequest({
      ids
    }, {
      localbitcoins: this
    }).send()
  }

  createAdvertisement(options) {
    return new requests.CreateAdvertisementRequest(options, {
      localbitcoins: this
    }).send()
  }

  editAdvertisement(id, options) {
    return new requests.EditAdvertisementRequest({
      ...options,
      id
    }, {
      localbitcoins: this
    }).send()
  }

  deleteAdvertisement(id) {
    return new requests.DeleteAdvertisementRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  setAdvertisementPriceEquation(id, equation) {
    return new requests.SetAdvertisementPriceEquationRequest({
      id,
      equation
    }, {
      localbitcoins: this
    }).send()
  }

  sendFeedback(username, feedback, message) {
    return new requests.SendFeedbackRequest({
      username,
      feedback,
      message
    }, {
      localbitcoins: this
    }).send()
  }

  getUser(username) {
    return new requests.GetUserRequest({
      username
    }, {
      localbitcoins: this
    }).send()
  }

  getMyTrades(options) {
    return new requests.GetMyTradesRequest(options, {
      localbitcoins: this
    }).send()
  }

  getTrade(id) {
    return new requests.GetTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getTradesByIds(ids) {
    return new requests.GetTradesByIdsRequest({
      ids
    }, {
      localbitcoins: this
    }).send()
  }

  createTrade(advertisementId, amount, message) {
    return new requests.CreateTradeRequest({
      advertisementId,
      amount,
      message
    }, {
      localbitcoins: this
    }).send()
  }

  sendMessage(tradeId, text, attachment) {
    return new requests.SendMessageRequest({
      tradeId,
      text,
      attachment
    }, {
      localbitcoins: this
    }).send()
  }

  getMessages(tradeId) {
    return new requests.GetMessagesRequest({
      tradeId
    }, {
      localbitcoins: this
    }).send()
  }

  getRecentMessages(options) {
    return new requests.GetRecentMessagesRequest(options, {
      localbitcoins: this
    }).send()
  }

  cancelTrade(id) {
    return new requests.CancelTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  disputeTrade(id, topic) {
    return new requests.DisputeTradeRequest({
      id,
      topic
    }, {
      localbitcoins: this
    }).send()
  }

  markTradePaid(id) {
    return new requests.MarkTradePaidRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeRealNameVerification(id, status) {
    return new requests.MarkTradeRealNameVerificationRequest({
      id,
      status,
      confirmed: false
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeRealNameConfirmed(id) {
    return new requests.MarkTradeRealNameVerificationRequest({
      id,
      status: constants.RealNameVerificationStatus.MATCHES,
      confirmed: true
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeIdentified(id) {
    return new requests.MarkTradeIdentifiedRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  releaseTrade(id) {
    return new requests.ReleaseTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  releaseTradeWithPin(id, pin) {
    return new requests.ReleaseTradeWithPinRequest({
      id,
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  downloadAttachment(tradeId, attachmentId) {
    return new requests.DownloadAttachmentRequest({
      tradeId,
      attachmentId
    }, {
      localbitcoins: this
    }).send()
  }

  getNotifications() {
    return new requests.GetNotificationsRequest({
      localbitcoins: this
    }).send()
  }

  markNotificationRead(id) {
    return new requests.MarkNotificationReadRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getUserRealNameVerifications(username) {
    return new requests.GetUserRealNameVerificationsRequest({
      username
    }, {
      localbitcoins: this
    }).send()
  }

  getWalletInfo() {
    return new requests.GetWalletInfoRequest({
      localbitcoins: this
    }).send()
  }

  getWalletBalance() {
    return new requests.GetWalletBalanceRequest({
      localbitcoins: this
    }).send()
  }

  getWalletAddress() {
    return new requests.GetWalletAddressRequest({
      localbitcoins: this
    }).send()
  }

  sendBtc(address, amount) {
    return new requests.SendBtcRequest({
      address,
      amount
    }, {
      localbitcoins: this
    }).send()
  }

  sendBtcWithPin(address, amount, pin) {
    return new requests.SendBtcWithPinRequest({
      address,
      amount,
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  getPaymentMethods(options) {
    return new requests.GetPaymentMethodsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getCountryCodes() {
    return new requests.GetCountryCodesRequest({
      localbitcoins: this
    }).send()
  }

  getCurrencies() {
    return new requests.GetCurrenciesRequest({
      localbitcoins: this
    }).send()
  }

  calculatePriceEquation(equation) {
    return new requests.CalculatePriceEquationRequest({
      equation
    }, {
      localbitcoins: this
    }).send()
  }

  getFees() {
    return new requests.GetFeesRequest({
      localbitcoins: this
    }).send()
  }

  getTicker() {
    return new requests.GetTickerRequest({
      localbitcoins: this
    }).send()
  }

  getTradingChart(currency) {
    return new requests.GetTradingChartRequest({
      currency
    }, {
      localbitcoins: this
    }).send()
  }

  getOrderBook(currency) {
    return new requests.GetOrderBookRequest({
      currency
    }, {
      localbitcoins: this
    }).send()
  }
}
LocalBitcoins.URL = 'https://localbitcoins.com'
LocalBitcoins.settings = {
  ignoreErrors: false,
  autoRefreshToken: true
}
LocalBitcoins.types = types
LocalBitcoins.requests = requests
LocalBitcoins.errors = errors
LocalBitcoins.constants = constants
LocalBitcoins.from = options => new LocalBitcoins(options)
Object.defineProperty(LocalBitcoins, 'Response', {
  get: () => types.Response
})
Object.defineProperty(LocalBitcoins, 'RefreshToken', {
  get: () => types.RefreshToken
})
Object.defineProperty(LocalBitcoins, 'User', {
  get: () => types.User
})
Object.defineProperty(LocalBitcoins, 'Advertisement', {
  get: () => types.Advertisement
})
Object.defineProperty(LocalBitcoins, 'PaymentDetails', {
  get: () => types.PaymentDetails
})
Object.defineProperty(LocalBitcoins, 'Trade', {
  get: () => types.Trade
})
Object.defineProperty(LocalBitcoins, 'Message', {
  get: () => types.Message
})
Object.defineProperty(LocalBitcoins, 'Attachment', {
  get: () => types.Attachment
})
Object.defineProperty(LocalBitcoins, 'Notification', {
  get: () => types.Notification
})
Object.defineProperty(LocalBitcoins, 'RealNameVerification', {
  get: () => types.RealNameVerification
})
Object.defineProperty(LocalBitcoins, 'OldWalletAddress', {
  get: () => types.OldWalletAddress
})
Object.defineProperty(LocalBitcoins, 'Transaction', {
  get: () => types.Transaction
})
Object.defineProperty(LocalBitcoins, 'WalletInfo', {
  get: () => types.WalletInfo
})
Object.defineProperty(LocalBitcoins, 'InputFile', {
  get: () => types.InputFile
})
Object.defineProperty(LocalBitcoins, 'PaymentMethod', {
  get: () => types.PaymentMethod
})
Object.defineProperty(LocalBitcoins, 'Currency', {
  get: () => types.Currency
})
Object.defineProperty(LocalBitcoins, 'Fees', {
  get: () => types.Fees
})
Object.defineProperty(LocalBitcoins, 'OrderBook', {
  get: () => types.OrderBook
})
Object.defineProperty(LocalBitcoins, 'RefreshTokenRequest', {
  get: () => requests.RefreshTokenRequest
})
Object.defineProperty(LocalBitcoins, 'RevokeTokenRequest', {
  get: () => requests.RevokeTokenRequest
})
Object.defineProperty(LocalBitcoins, 'GetMeRequest', {
  get: () => requests.GetMeRequest
})
Object.defineProperty(LocalBitcoins, 'VerifyPinRequest', {
  get: () => requests.VerifyPinRequest
})
Object.defineProperty(LocalBitcoins, 'GetAdvertisementsRequest', {
  get: () => requests.GetAdvertisementsRequest
})
Object.defineProperty(LocalBitcoins, 'GetMyAdvertisementsRequest', {
  get: () => requests.GetMyAdvertisementsRequest
})
Object.defineProperty(LocalBitcoins, 'GetAdvertisementRequest', {
  get: () => requests.GetAdvertisementRequest
})
Object.defineProperty(LocalBitcoins, 'GetAdvertisementsByIdsRequest', {
  get: () => requests.GetAdvertisementsByIdsRequest
})
Object.defineProperty(LocalBitcoins, 'CreateAdvertisementRequest', {
  get: () => requests.CreateAdvertisementRequest
})
Object.defineProperty(LocalBitcoins, 'EditAdvertisementRequest', {
  get: () => requests.EditAdvertisementRequest
})
Object.defineProperty(LocalBitcoins, 'DeleteAdvertisementRequest', {
  get: () => requests.DeleteAdvertisementRequest
})
Object.defineProperty(LocalBitcoins, 'SetAdvertisementPriceEquationRequest', {
  get: () => requests.SetAdvertisementPriceEquationRequest
})
Object.defineProperty(LocalBitcoins, 'SendFeedbackRequest', {
  get: () => requests.SendFeedbackRequest
})
Object.defineProperty(LocalBitcoins, 'GetUserRequest', {
  get: () => requests.GetUserRequest
})
Object.defineProperty(LocalBitcoins, 'GetMyTradesRequest', {
  get: () => requests.GetMyTradesRequest
})
Object.defineProperty(LocalBitcoins, 'GetTradeRequest', {
  get: () => requests.GetTradeRequest
})
Object.defineProperty(LocalBitcoins, 'GetTradesByIdsRequest', {
  get: () => requests.GetTradesByIdsRequest
})
Object.defineProperty(LocalBitcoins, 'CreateTradeRequest', {
  get: () => requests.CreateTradeRequest
})
Object.defineProperty(LocalBitcoins, 'SendMessageRequest', {
  get: () => requests.SendMessageRequest
})
Object.defineProperty(LocalBitcoins, 'GetMessagesRequest', {
  get: () => requests.GetMessagesRequest
})
Object.defineProperty(LocalBitcoins, 'GetRecentMessagesRequest', {
  get: () => requests.GetRecentMessagesRequest
})
Object.defineProperty(LocalBitcoins, 'CancelTradeRequest', {
  get: () => requests.CancelTradeRequest
})
Object.defineProperty(LocalBitcoins, 'DisputeTradeRequest', {
  get: () => requests.DisputeTradeRequest
})
Object.defineProperty(LocalBitcoins, 'MarkTradePaidRequest', {
  get: () => requests.MarkTradePaidRequest
})
Object.defineProperty(LocalBitcoins, 'MarkTradeRealNameVerificationRequest', {
  get: () => requests.MarkTradeRealNameVerificationRequest
})
Object.defineProperty(LocalBitcoins, 'MarkTradeIdentifiedRequest', {
  get: () => requests.MarkTradeIdentifiedRequest
})
Object.defineProperty(LocalBitcoins, 'ReleaseTradeRequest', {
  get: () => requests.ReleaseTradeRequest
})
Object.defineProperty(LocalBitcoins, 'ReleaseTradeWithPinRequest', {
  get: () => requests.ReleaseTradeWithPinRequest
})
Object.defineProperty(LocalBitcoins, 'DownloadAttachmentRequest', {
  get: () => requests.DownloadAttachmentRequest
})
Object.defineProperty(LocalBitcoins, 'GetNotificationsRequest', {
  get: () => requests.GetNotificationsRequest
})
Object.defineProperty(LocalBitcoins, 'MarkNotificationReadRequest', {
  get: () => requests.MarkNotificationReadRequest
})
Object.defineProperty(LocalBitcoins, 'GetUserRealNameVerificationsRequest', {
  get: () => requests.GetUserRealNameVerificationsRequest
})
Object.defineProperty(LocalBitcoins, 'GetWalletInfoRequest', {
  get: () => requests.GetWalletInfoRequest
})
Object.defineProperty(LocalBitcoins, 'GetWalletBalanceRequest', {
  get: () => requests.GetWalletBalanceRequest
})
Object.defineProperty(LocalBitcoins, 'GetWalletAddressRequest', {
  get: () => requests.GetWalletAddressRequest
})
Object.defineProperty(LocalBitcoins, 'SendBtcRequest', {
  get: () => requests.SendBtcRequest
})
Object.defineProperty(LocalBitcoins, 'SendBtcWithPinRequest', {
  get: () => requests.SendBtcWithPinRequest
})
Object.defineProperty(LocalBitcoins, 'GetPaymentMethodsRequest', {
  get: () => requests.GetPaymentMethodsRequest
})
Object.defineProperty(LocalBitcoins, 'GetCountryCodesRequest', {
  get: () => requests.GetCountryCodesRequest
})
Object.defineProperty(LocalBitcoins, 'GetCurrenciesRequest', {
  get: () => requests.GetCurrenciesRequest
})
Object.defineProperty(LocalBitcoins, 'CalculatePriceEquationRequest', {
  get: () => requests.CalculatePriceEquationRequest
})
Object.defineProperty(LocalBitcoins, 'GetFeesRequest', {
  get: () => requests.GetFeesRequest
})
Object.defineProperty(LocalBitcoins, 'GetTickerRequest', {
  get: () => requests.GetTickerRequest
})
Object.defineProperty(LocalBitcoins, 'GetTradingChartRequest', {
  get: () => requests.GetTradingChartRequest
})
Object.defineProperty(LocalBitcoins, 'GetOrderBookRequest', {
  get: () => requests.GetOrderBookRequest
})
Object.defineProperty(LocalBitcoins, 'Error', {
  get: () => errors.Error
})
Object.defineProperty(LocalBitcoins, 'BadRequestError', {
  get: () => errors.BadRequestError
})
Object.defineProperty(LocalBitcoins, 'UnauthorizedError', {
  get: () => errors.UnauthorizedError
})
Object.defineProperty(LocalBitcoins, 'ForbiddenError', {
  get: () => errors.ForbiddenError
})
Object.defineProperty(LocalBitcoins, 'NotFoundError', {
  get: () => errors.NotFoundError
})
Object.defineProperty(LocalBitcoins, 'UserNotFoundError', {
  get: () => errors.UserNotFoundError
})
Object.defineProperty(LocalBitcoins, 'AdvertisementNotFoundError', {
  get: () => errors.AdvertisementNotFoundError
})
Object.defineProperty(LocalBitcoins, 'TradeNotFoundError', {
  get: () => errors.TradeNotFoundError
})
Object.defineProperty(LocalBitcoins, 'NotEnoughBalanceError', {
  get: () => errors.NotEnoughBalanceError
})
Object.defineProperty(LocalBitcoins, 'UnknownError', {
  get: () => errors.UnknownError
})
Object.defineProperty(LocalBitcoins, 'EventType', {
  get: () => constants.EventType
})
Object.defineProperty(LocalBitcoins, 'AdvertisementType', {
  get: () => constants.AdvertisementType
})
Object.defineProperty(LocalBitcoins, 'TradeType', {
  get: () => constants.TradeType
})
Object.defineProperty(LocalBitcoins, 'TradeStatus', {
  get: () => constants.TradeStatus
})
Object.defineProperty(LocalBitcoins, 'TradeRole', {
  get: () => constants.TradeRole
})
Object.defineProperty(LocalBitcoins, 'ReferenceType', {
  get: () => constants.ReferenceType
})
Object.defineProperty(LocalBitcoins, 'FeedbackType', {
  get: () => constants.FeedbackType
})
Object.defineProperty(LocalBitcoins, 'RealNameVerificationStatus', {
  get: () => constants.RealNameVerificationStatus
})
Object.defineProperty(LocalBitcoins, 'TransactionType', {
  get: () => constants.TransactionType
})

module.exports = LocalBitcoins
