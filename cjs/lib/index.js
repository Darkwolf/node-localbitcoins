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

const {
  Response,
  RefreshToken,
  User,
  Advertisement,
  PaymentDetails,
  Trade,
  Message,
  Attachment,
  Notification,
  RealNameVerification,
  OldWalletAddress,
  Transaction,
  WalletInfo,
  InputFile,
  PaymentMethod,
  Currency,
  Fees,
  OrderBook
} = types
const {
  RefreshTokenRequest,
  RevokeTokenRequest,
  GetMeRequest,
  VerifyPinRequest,
  GetAdvertisementsRequest,
  GetMyAdvertisementsRequest,
  GetAdvertisementRequest,
  GetAdvertisementsByIdsRequest,
  CreateAdvertisementRequest,
  EditAdvertisementRequest,
  DeleteAdvertisementRequest,
  SetAdvertisementPriceEquationRequest,
  SendFeedbackRequest,
  GetUserRequest,
  GetMyTradesRequest,
  GetTradeRequest,
  GetTradesByIdsRequest,
  CreateTradeRequest,
  SendMessageRequest,
  GetMessagesRequest,
  GetRecentMessagesRequest,
  CancelTradeRequest,
  DisputeTradeRequest,
  MarkTradePaidRequest,
  MarkTradeRealNameVerificationRequest,
  MarkTradeIdentifiedRequest,
  ReleaseTradeRequest,
  ReleaseTradeWithPinRequest,
  DownloadAttachmentRequest,
  GetNotificationsRequest,
  MarkNotificationReadRequest,
  GetUserRealNameVerificationsRequest,
  GetWalletInfoRequest,
  GetWalletBalanceRequest,
  GetWalletAddressRequest,
  SendBtcRequest,
  SendBtcWithPinRequest,
  GetPaymentMethodsRequest,
  GetCountryCodesRequest,
  GetCurrenciesRequest,
  CalculatePriceEquationRequest,
  GetFeesRequest,
  GetTickerRequest,
  GetTradingChartRequest,
  GetOrderBookRequest
} = requests
const {
  Error,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UserNotFoundError,
  AdvertisementNotFoundError,
  TradeNotFoundError,
  NotEnoughBalanceError,
  UnknownError
} = errors
const {
  EventType,
  AdvertisementType,
  TradeType,
  TradeStatus,
  TradeRole,
  ReferenceType,
  FeedbackType,
  RealNameVerificationStatus,
  TransactionType
} = constants

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
    this.emit(EventType.REQUEST, request)
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
          uploadFiles = Object.values(params).some(param => param instanceof InputFile)
          if (uploadFiles) {
            body = Object.entries(params).reduce((form, [key, value]) => {
              if (Helper.exists(value)) {
                if (Helper.isObject(value)) {
                  if (value instanceof Boolean || value instanceof Number || value instanceof String) {
                    form.append(key, value.valueOf())
                  } else if (value instanceof InputFile) {
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
      let response = new Response({
        ok: false
      }, {
        localbitcoins: this,
        request,
        response: res
      })
      if (request instanceof DownloadAttachmentRequest && res.status === 200) {
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
            if (request instanceof RefreshTokenRequest) {
              response
                .setErrorCode(res.data.error)
                .setMessage(res.data.error_description || res.data.error)
            } else {
              response
                .setErrorCode(res.data.error.error_code)
                .setMessage(res.data.error.message)
              switch (response.errorCode) {
                case 2:
                case 41: throw new UnauthorizedError(response.message).setResponse(response)
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
      this.emit(EventType.ERROR, e)
      if (!this.settings.ignoreErrors) throw e
      return null
    }
  }

  async refreshToken() {
    const refreshToken = await new RefreshTokenRequest({
      localbitcoins: this
    }).send()
    this.setOAuth2({
      ...this.oauth2,
      ...refreshToken
    })
    return refreshToken
  }

  revokeToken() {
    return new RevokeTokenRequest({
      localbitcoins: this
    }).send()
  }

  getMe() {
    return new GetMeRequest({
      localbitcoins: this
    }).send()
  }

  verifyPin(pin) {
    return new VerifyPinRequest({
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  getAdvertisements(options) {
    return new GetAdvertisementsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getMyAdvertisements(options) {
    return new GetMyAdvertisementsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getAdvertisement(id) {
    return new GetAdvertisementRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getAdvertisementsByIds(ids) {
    return new GetAdvertisementsByIdsRequest({
      ids
    }, {
      localbitcoins: this
    }).send()
  }

  createAdvertisement(options) {
    return new CreateAdvertisementRequest(options, {
      localbitcoins: this
    }).send()
  }

  editAdvertisement(id, options) {
    return new EditAdvertisementRequest({
      ...options,
      id
    }, {
      localbitcoins: this
    }).send()
  }

  deleteAdvertisement(id) {
    return new DeleteAdvertisementRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  setAdvertisementPriceEquation(id, equation) {
    return new SetAdvertisementPriceEquationRequest({
      id,
      equation
    }, {
      localbitcoins: this
    }).send()
  }

  sendFeedback(username, feedback, message) {
    return new SendFeedbackRequest({
      username,
      feedback,
      message
    }, {
      localbitcoins: this
    }).send()
  }

  getUser(username) {
    return new GetUserRequest({
      username
    }, {
      localbitcoins: this
    }).send()
  }

  getMyTrades(options) {
    return new GetMyTradesRequest(options, {
      localbitcoins: this
    }).send()
  }

  getTrade(id) {
    return new GetTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getTradesByIds(ids) {
    return new GetTradesByIdsRequest({
      ids
    }, {
      localbitcoins: this
    }).send()
  }

  createTrade(advertisementId, amount, message) {
    return new CreateTradeRequest({
      advertisementId,
      amount,
      message
    }, {
      localbitcoins: this
    }).send()
  }

  sendMessage(tradeId, text, attachment) {
    return new SendMessageRequest({
      tradeId,
      text,
      attachment
    }, {
      localbitcoins: this
    }).send()
  }

  getMessages(tradeId) {
    return new GetMessagesRequest({
      tradeId
    }, {
      localbitcoins: this
    }).send()
  }

  getRecentMessages(options) {
    return new GetRecentMessagesRequest(options, {
      localbitcoins: this
    }).send()
  }

  cancelTrade(id) {
    return new CancelTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  disputeTrade(id, topic) {
    return new DisputeTradeRequest({
      id,
      topic
    }, {
      localbitcoins: this
    }).send()
  }

  markTradePaid(id) {
    return new MarkTradePaidRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeRealNameVerification(id, status) {
    return new MarkTradeRealNameVerificationRequest({
      id,
      status,
      confirmed: false
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeRealNameConfirmed(id) {
    return new MarkTradeRealNameVerificationRequest({
      id,
      status: RealNameVerificationStatus.MATCHES,
      confirmed: true
    }, {
      localbitcoins: this
    }).send()
  }

  markTradeIdentified(id) {
    return new MarkTradeIdentifiedRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  releaseTrade(id) {
    return new ReleaseTradeRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  releaseTradeWithPin(id, pin) {
    return new ReleaseTradeWithPinRequest({
      id,
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  downloadAttachment(tradeId, attachmentId) {
    return new DownloadAttachmentRequest({
      tradeId,
      attachmentId
    }, {
      localbitcoins: this
    }).send()
  }

  getNotifications() {
    return new GetNotificationsRequest({
      localbitcoins: this
    }).send()
  }

  markNotificationRead(id) {
    return new MarkNotificationReadRequest({
      id
    }, {
      localbitcoins: this
    }).send()
  }

  getUserRealNameVerifications(username) {
    return new GetUserRealNameVerificationsRequest({
      username
    }, {
      localbitcoins: this
    }).send()
  }

  getWalletInfo() {
    return new GetWalletInfoRequest({
      localbitcoins: this
    }).send()
  }

  getWalletBalance() {
    return new GetWalletBalanceRequest({
      localbitcoins: this
    }).send()
  }

  getWalletAddress() {
    return new GetWalletAddressRequest({
      localbitcoins: this
    }).send()
  }

  sendBtc(address, amount) {
    return new SendBtcRequest({
      address,
      amount
    }, {
      localbitcoins: this
    }).send()
  }

  sendBtcWithPin(address, amount, pin) {
    return new SendBtcWithPinRequest({
      address,
      amount,
      pin
    }, {
      localbitcoins: this
    }).send()
  }

  getPaymentMethods(options) {
    return new GetPaymentMethodsRequest(options, {
      localbitcoins: this
    }).send()
  }

  getCountryCodes() {
    return new GetCountryCodesRequest({
      localbitcoins: this
    }).send()
  }

  getCurrencies() {
    return new GetCurrenciesRequest({
      localbitcoins: this
    }).send()
  }

  calculatePriceEquation(equation) {
    return new CalculatePriceEquationRequest({
      equation
    }, {
      localbitcoins: this
    }).send()
  }

  getFees() {
    return new GetFeesRequest({
      localbitcoins: this
    }).send()
  }

  getTicker() {
    return new GetTickerRequest({
      localbitcoins: this
    }).send()
  }

  getTradingChart(currency) {
    return new GetTradingChartRequest({
      currency
    }, {
      localbitcoins: this
    }).send()
  }

  getOrderBook(currency) {
    return new GetOrderBookRequest({
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
LocalBitcoins.Response = Response
LocalBitcoins.RefreshToken = RefreshToken
LocalBitcoins.User = User
LocalBitcoins.Advertisement = Advertisement
LocalBitcoins.PaymentDetails = PaymentDetails
LocalBitcoins.Trade = Trade
LocalBitcoins.Message = Message
LocalBitcoins.Attachment = Attachment
LocalBitcoins.Notification = Notification
LocalBitcoins.RealNameVerification = RealNameVerification
LocalBitcoins.OldWalletAddress = OldWalletAddress
LocalBitcoins.Transaction = Transaction
LocalBitcoins.WalletInfo = WalletInfo
LocalBitcoins.InputFile = InputFile
LocalBitcoins.PaymentMethod = PaymentMethod
LocalBitcoins.Currency = Currency
LocalBitcoins.Fees = Fees
LocalBitcoins.OrderBook = OrderBook
LocalBitcoins.requests = requests
LocalBitcoins.RefreshTokenRequest = RefreshTokenRequest
LocalBitcoins.RevokeTokenRequest = RevokeTokenRequest
LocalBitcoins.GetMeRequest = GetMeRequest
LocalBitcoins.VerifyPinRequest = VerifyPinRequest
LocalBitcoins.GetAdvertisementsRequest = GetAdvertisementsRequest
LocalBitcoins.GetMyAdvertisementsRequest = GetMyAdvertisementsRequest
LocalBitcoins.GetAdvertisementRequest = GetAdvertisementRequest
LocalBitcoins.GetAdvertisementsByIdsRequest = GetAdvertisementsByIdsRequest
LocalBitcoins.CreateAdvertisementRequest = CreateAdvertisementRequest
LocalBitcoins.EditAdvertisementRequest = EditAdvertisementRequest
LocalBitcoins.DeleteAdvertisementRequest = DeleteAdvertisementRequest
LocalBitcoins.SetAdvertisementPriceEquationRequest = SetAdvertisementPriceEquationRequest
LocalBitcoins.SendFeedbackRequest = SendFeedbackRequest
LocalBitcoins.GetUserRequest = GetUserRequest
LocalBitcoins.GetMyTradesRequest = GetMyTradesRequest
LocalBitcoins.GetTradeRequest = GetTradeRequest
LocalBitcoins.GetTradesByIdsRequest = GetTradesByIdsRequest
LocalBitcoins.CreateTradeRequest = CreateTradeRequest
LocalBitcoins.SendMessageRequest = SendMessageRequest
LocalBitcoins.GetMessagesRequest = GetMessagesRequest
LocalBitcoins.GetRecentMessagesRequest = GetRecentMessagesRequest
LocalBitcoins.CancelTradeRequest = CancelTradeRequest
LocalBitcoins.DisputeTradeRequest = DisputeTradeRequest
LocalBitcoins.MarkTradePaidRequest = MarkTradePaidRequest
LocalBitcoins.MarkTradeRealNameVerificationRequest = MarkTradeRealNameVerificationRequest
LocalBitcoins.MarkTradeIdentifiedRequest = MarkTradeIdentifiedRequest
LocalBitcoins.ReleaseTradeRequest = ReleaseTradeRequest
LocalBitcoins.ReleaseTradeWithPinRequest = ReleaseTradeWithPinRequest
LocalBitcoins.DownloadAttachmentRequest = DownloadAttachmentRequest
LocalBitcoins.GetNotificationsRequest = GetNotificationsRequest
LocalBitcoins.MarkNotificationReadRequest = MarkNotificationReadRequest
LocalBitcoins.GetUserRealNameVerificationsRequest = GetUserRealNameVerificationsRequest
LocalBitcoins.GetWalletInfoRequest = GetWalletInfoRequest
LocalBitcoins.GetWalletBalanceRequest = GetWalletBalanceRequest
LocalBitcoins.GetWalletAddressRequest = GetWalletAddressRequest
LocalBitcoins.SendBtcRequest = SendBtcRequest
LocalBitcoins.SendBtcWithPinRequest = SendBtcWithPinRequest
LocalBitcoins.GetPaymentMethodsRequest = GetPaymentMethodsRequest
LocalBitcoins.GetCountryCodesRequest = GetCountryCodesRequest
LocalBitcoins.GetCurrenciesRequest = GetCurrenciesRequest
LocalBitcoins.CalculatePriceEquationRequest = CalculatePriceEquationRequest
LocalBitcoins.GetFeesRequest = GetFeesRequest
LocalBitcoins.GetTickerRequest = GetTickerRequest
LocalBitcoins.GetTradingChartRequest = GetTradingChartRequest
LocalBitcoins.GetOrderBookRequest = GetOrderBookRequest
LocalBitcoins.errors = errors
LocalBitcoins.Error = Error
LocalBitcoins.BadRequestError = BadRequestError
LocalBitcoins.UnauthorizedError = UnauthorizedError
LocalBitcoins.ForbiddenError = ForbiddenError
LocalBitcoins.NotFoundError = NotFoundError
LocalBitcoins.UserNotFoundError = UserNotFoundError
LocalBitcoins.AdvertisementNotFoundError = AdvertisementNotFoundError
LocalBitcoins.TradeNotFoundError = TradeNotFoundError
LocalBitcoins.NotEnoughBalanceError = NotEnoughBalanceError
LocalBitcoins.UnknownError = UnknownError
LocalBitcoins.constants = constants
LocalBitcoins.EventType = EventType
LocalBitcoins.AdvertisementType = AdvertisementType
LocalBitcoins.TradeType = TradeType
LocalBitcoins.TradeStatus = TradeStatus
LocalBitcoins.TradeRole = TradeRole
LocalBitcoins.ReferenceType = ReferenceType
LocalBitcoins.FeedbackType = FeedbackType
LocalBitcoins.RealNameVerificationStatus = RealNameVerificationStatus
LocalBitcoins.TransactionType = TransactionType
LocalBitcoins.from = options => new LocalBitcoins(options)

module.exports = LocalBitcoins
