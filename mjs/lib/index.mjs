import crypto from 'crypto'
import EventEmitter from 'events'
import fetch from 'node-fetch'
import FormData from 'form-data'
import Helper from '@darkwolf/helper.mjs'
import { UnixTimestamp } from '@darkwolf/time.mjs'
import types, {
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
} from './types/index.mjs'
import requests, {
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
} from './requests/index.mjs'
import errors, {
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
} from './errors/index.mjs'
import constants, {
  EventType,
  AdvertisementType,
  TradeType,
  TradeStatus,
  TradeRole,
  ReferenceType,
  FeedbackType,
  RealNameVerificationStatus,
  TransactionType
} from './constants/index.mjs'

export {
  types,
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
  OrderBook,
  requests,
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
  GetOrderBookRequest,
  errors,
  Error,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UserNotFoundError,
  AdvertisementNotFoundError,
  TradeNotFoundError,
  NotEnoughBalanceError,
  UnknownError,
  constants,
  EventType,
  AdvertisementType,
  TradeType,
  TradeStatus,
  TradeRole,
  ReferenceType,
  FeedbackType,
  RealNameVerificationStatus,
  TransactionType
}

export default class LocalBitcoins extends EventEmitter {
  static URL = 'https://localbitcoins.com'
  static settings = {
    ignoreErrors: false,
    autoRefreshToken: true
  }
  static types = types
  static Response = Response
  static RefreshToken = RefreshToken
  static User = User
  static Advertisement = Advertisement
  static PaymentDetails = PaymentDetails
  static Trade = Trade
  static Message = Message
  static Attachment = Attachment
  static Notification = Notification
  static RealNameVerification = RealNameVerification
  static OldWalletAddress = OldWalletAddress
  static Transaction = Transaction
  static WalletInfo = WalletInfo
  static InputFile = InputFile
  static PaymentMethod = PaymentMethod
  static Currency = Currency
  static Fees = Fees
  static OrderBook = OrderBook
  static requests = requests
  static RefreshTokenRequest = RefreshTokenRequest
  static RevokeTokenRequest = RevokeTokenRequest
  static GetMeRequest = GetMeRequest
  static VerifyPinRequest = VerifyPinRequest
  static GetAdvertisementsRequest = GetAdvertisementsRequest
  static GetMyAdvertisementsRequest = GetMyAdvertisementsRequest
  static GetAdvertisementRequest = GetAdvertisementRequest
  static GetAdvertisementsByIdsRequest = GetAdvertisementsByIdsRequest
  static CreateAdvertisementRequest = CreateAdvertisementRequest
  static EditAdvertisementRequest = EditAdvertisementRequest
  static DeleteAdvertisementRequest = DeleteAdvertisementRequest
  static SetAdvertisementPriceEquationRequest = SetAdvertisementPriceEquationRequest
  static SendFeedbackRequest = SendFeedbackRequest
  static GetUserRequest = GetUserRequest
  static GetMyTradesRequest = GetMyTradesRequest
  static GetTradeRequest = GetTradeRequest
  static GetTradesByIdsRequest = GetTradesByIdsRequest
  static CreateTradeRequest = CreateTradeRequest
  static SendMessageRequest = SendMessageRequest
  static GetMessagesRequest = GetMessagesRequest
  static GetRecentMessagesRequest = GetRecentMessagesRequest
  static CancelTradeRequest = CancelTradeRequest
  static DisputeTradeRequest = DisputeTradeRequest
  static MarkTradePaidRequest = MarkTradePaidRequest
  static MarkTradeRealNameVerificationRequest = MarkTradeRealNameVerificationRequest
  static MarkTradeIdentifiedRequest = MarkTradeIdentifiedRequest
  static ReleaseTradeRequest = ReleaseTradeRequest
  static ReleaseTradeWithPinRequest = ReleaseTradeWithPinRequest
  static DownloadAttachmentRequest = DownloadAttachmentRequest
  static GetNotificationsRequest = GetNotificationsRequest
  static MarkNotificationReadRequest = MarkNotificationReadRequest
  static GetUserRealNameVerificationsRequest = GetUserRealNameVerificationsRequest
  static GetWalletInfoRequest = GetWalletInfoRequest
  static GetWalletBalanceRequest = GetWalletBalanceRequest
  static GetWalletAddressRequest = GetWalletAddressRequest
  static SendBtcRequest = SendBtcRequest
  static SendBtcWithPinRequest = SendBtcWithPinRequest
  static GetPaymentMethodsRequest = GetPaymentMethodsRequest
  static GetCountryCodesRequest = GetCountryCodesRequest
  static GetCurrenciesRequest = GetCurrenciesRequest
  static CalculatePriceEquationRequest = CalculatePriceEquationRequest
  static GetFeesRequest = GetFeesRequest
  static GetTickerRequest = GetTickerRequest
  static GetTradingChartRequest = GetTradingChartRequest
  static GetOrderBookRequest = GetOrderBookRequest
  static errors = errors
  static Error = Error
  static BadRequestError = BadRequestError
  static UnauthorizedError = UnauthorizedError
  static ForbiddenError = ForbiddenError
  static NotFoundError = NotFoundError
  static UserNotFoundError = UserNotFoundError
  static AdvertisementNotFoundError = AdvertisementNotFoundError
  static TradeNotFoundError = TradeNotFoundError
  static NotEnoughBalanceError = NotEnoughBalanceError
  static UnknownError = UnknownError
  static constants = constants
  static EventType = EventType
  static AdvertisementType = AdvertisementType
  static TradeType = TradeType
  static TradeStatus = TradeStatus
  static TradeRole = TradeRole
  static ReferenceType = ReferenceType
  static FeedbackType = FeedbackType
  static RealNameVerificationStatus = RealNameVerificationStatus
  static TransactionType = TransactionType

  static from(options) {
    return new LocalBitcoins(options)
  }

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
