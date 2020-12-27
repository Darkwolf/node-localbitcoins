class Requests {}
Object.defineProperty(Requests, 'RefreshTokenRequest', {
  get: () => {
    if (!Requests._RefreshTokenRequest) {
      Requests._RefreshTokenRequest = require('./RefreshTokenRequest')
    }
    return Requests._RefreshTokenRequest
  }
})
Object.defineProperty(Requests, 'RevokeTokenRequest', {
  get: () => {
    if (!Requests._RevokeTokenRequest) {
      Requests._RevokeTokenRequest = require('./RevokeTokenRequest')
    }
    return Requests._RevokeTokenRequest
  }
})
Object.defineProperty(Requests, 'GetMeRequest', {
  get: () => {
    if (!Requests._GetMeRequest) {
      Requests._GetMeRequest = require('./GetMeRequest')
    }
    return Requests._GetMeRequest
  }
})
Object.defineProperty(Requests, 'VerifyPinRequest', {
  get: () => {
    if (!Requests._VerifyPinRequest) {
      Requests._VerifyPinRequest = require('./VerifyPinRequest')
    }
    return Requests._VerifyPinRequest
  }
})
Object.defineProperty(Requests, 'GetAdvertisementsRequest', {
  get: () => {
    if (!Requests._GetAdvertisementsRequest) {
      Requests._GetAdvertisementsRequest = require('./GetAdvertisementsRequest')
    }
    return Requests._GetAdvertisementsRequest
  }
})
Object.defineProperty(Requests, 'GetMyAdvertisementsRequest', {
  get: () => {
    if (!Requests._GetMyAdvertisementsRequest) {
      Requests._GetMyAdvertisementsRequest = require('./GetMyAdvertisementsRequest')
    }
    return Requests._GetMyAdvertisementsRequest
  }
})
Object.defineProperty(Requests, 'GetAdvertisementRequest', {
  get: () => {
    if (!Requests._GetAdvertisementRequest) {
      Requests._GetAdvertisementRequest = require('./GetAdvertisementRequest')
    }
    return Requests._GetAdvertisementRequest
  }
})
Object.defineProperty(Requests, 'GetAdvertisementsByIdsRequest', {
  get: () => {
    if (!Requests._GetAdvertisementsByIdsRequest) {
      Requests._GetAdvertisementsByIdsRequest = require('./GetAdvertisementsByIdsRequest')
    }
    return Requests._GetAdvertisementsByIdsRequest
  }
})
Object.defineProperty(Requests, 'CreateAdvertisementRequest', {
  get: () => {
    if (!Requests._CreateAdvertisementRequest) {
      Requests._CreateAdvertisementRequest = require('./CreateAdvertisementRequest')
    }
    return Requests._CreateAdvertisementRequest
  }
})
Object.defineProperty(Requests, 'EditAdvertisementRequest', {
  get: () => {
    if (!Requests._EditAdvertisementRequest) {
      Requests._EditAdvertisementRequest = require('./EditAdvertisementRequest')
    }
    return Requests._EditAdvertisementRequest
  }
})
Object.defineProperty(Requests, 'DeleteAdvertisementRequest', {
  get: () => {
    if (!Requests._DeleteAdvertisementRequest) {
      Requests._DeleteAdvertisementRequest = require('./DeleteAdvertisementRequest')
    }
    return Requests._DeleteAdvertisementRequest
  }
})
Object.defineProperty(Requests, 'SetAdvertisementPriceEquationRequest', {
  get: () => {
    if (!Requests._SetAdvertisementPriceEquationRequest) {
      Requests._SetAdvertisementPriceEquationRequest = require('./SetAdvertisementPriceEquationRequest')
    }
    return Requests._SetAdvertisementPriceEquationRequest
  }
})
Object.defineProperty(Requests, 'SendFeedbackRequest', {
  get: () => {
    if (!Requests._SendFeedbackRequest) {
      Requests._SendFeedbackRequest = require('./SendFeedbackRequest')
    }
    return Requests._SendFeedbackRequest
  }
})
Object.defineProperty(Requests, 'GetUserRequest', {
  get: () => {
    if (!Requests._GetUserRequest) {
      Requests._GetUserRequest = require('./GetUserRequest')
    }
    return Requests._GetUserRequest
  }
})
Object.defineProperty(Requests, 'GetMyTradesRequest', {
  get: () => {
    if (!Requests._GetMyTradesRequest) {
      Requests._GetMyTradesRequest = require('./GetMyTradesRequest')
    }
    return Requests._GetMyTradesRequest
  }
})
Object.defineProperty(Requests, 'GetTradeRequest', {
  get: () => {
    if (!Requests._GetTradeRequest) {
      Requests._GetTradeRequest = require('./GetTradeRequest')
    }
    return Requests._GetTradeRequest
  }
})
Object.defineProperty(Requests, 'GetTradesByIdsRequest', {
  get: () => {
    if (!Requests._GetTradesByIdsRequest) {
      Requests._GetTradesByIdsRequest = require('./GetTradesByIdsRequest')
    }
    return Requests._GetTradesByIdsRequest
  }
})
Object.defineProperty(Requests, 'CreateTradeRequest', {
  get: () => {
    if (!Requests._CreateTradeRequest) {
      Requests._CreateTradeRequest = require('./CreateTradeRequest')
    }
    return Requests._CreateTradeRequest
  }
})
Object.defineProperty(Requests, 'SendMessageRequest', {
  get: () => {
    if (!Requests._SendMessageRequest) {
      Requests._SendMessageRequest = require('./SendMessageRequest')
    }
    return Requests._SendMessageRequest
  }
})
Object.defineProperty(Requests, 'GetMessagesRequest', {
  get: () => {
    if (!Requests._GetMessagesRequest) {
      Requests._GetMessagesRequest = require('./GetMessagesRequest')
    }
    return Requests._GetMessagesRequest
  }
})
Object.defineProperty(Requests, 'GetRecentMessagesRequest', {
  get: () => {
    if (!Requests._GetRecentMessagesRequest) {
      Requests._GetRecentMessagesRequest = require('./GetRecentMessagesRequest')
    }
    return Requests._GetRecentMessagesRequest
  }
})
Object.defineProperty(Requests, 'CancelTradeRequest', {
  get: () => {
    if (!Requests._CancelTradeRequest) {
      Requests._CancelTradeRequest = require('./CancelTradeRequest')
    }
    return Requests._CancelTradeRequest
  }
})
Object.defineProperty(Requests, 'DisputeTradeRequest', {
  get: () => {
    if (!Requests._DisputeTradeRequest) {
      Requests._DisputeTradeRequest = require('./DisputeTradeRequest')
    }
    return Requests._DisputeTradeRequest
  }
})
Object.defineProperty(Requests, 'MarkTradePaidRequest', {
  get: () => {
    if (!Requests._MarkTradePaidRequest) {
      Requests._MarkTradePaidRequest = require('./MarkTradePaidRequest')
    }
    return Requests._MarkTradePaidRequest
  }
})
Object.defineProperty(Requests, 'MarkTradeRealNameVerificationRequest', {
  get: () => {
    if (!Requests._MarkTradeRealNameVerificationRequest) {
      Requests._MarkTradeRealNameVerificationRequest = require('./MarkTradeRealNameVerificationRequest')
    }
    return Requests._MarkTradeRealNameVerificationRequest
  }
})
Object.defineProperty(Requests, 'MarkTradeIdentifiedRequest', {
  get: () => {
    if (!Requests._MarkTradeIdentifiedRequest) {
      Requests._MarkTradeIdentifiedRequest = require('./MarkTradeIdentifiedRequest')
    }
    return Requests._MarkTradeIdentifiedRequest
  }
})
Object.defineProperty(Requests, 'ReleaseTradeRequest', {
  get: () => {
    if (!Requests._ReleaseTradeRequest) {
      Requests._ReleaseTradeRequest = require('./ReleaseTradeRequest')
    }
    return Requests._ReleaseTradeRequest
  }
})
Object.defineProperty(Requests, 'ReleaseTradeWithPinRequest', {
  get: () => {
    if (!Requests._ReleaseTradeWithPinRequest) {
      Requests._ReleaseTradeWithPinRequest = require('./ReleaseTradeWithPinRequest')
    }
    return Requests._ReleaseTradeWithPinRequest
  }
})
Object.defineProperty(Requests, 'DownloadAttachmentRequest', {
  get: () => {
    if (!Requests._DownloadAttachmentRequest) {
      Requests._DownloadAttachmentRequest = require('./DownloadAttachmentRequest')
    }
    return Requests._DownloadAttachmentRequest
  }
})
Object.defineProperty(Requests, 'GetNotificationsRequest', {
  get: () => {
    if (!Requests._GetNotificationsRequest) {
      Requests._GetNotificationsRequest = require('./GetNotificationsRequest')
    }
    return Requests._GetNotificationsRequest
  }
})
Object.defineProperty(Requests, 'MarkNotificationReadRequest', {
  get: () => {
    if (!Requests._MarkNotificationReadRequest) {
      Requests._MarkNotificationReadRequest = require('./MarkNotificationReadRequest')
    }
    return Requests._MarkNotificationReadRequest
  }
})
Object.defineProperty(Requests, 'GetUserRealNameVerificationsRequest', {
  get: () => {
    if (!Requests._GetUserRealNameVerificationsRequest) {
      Requests._GetUserRealNameVerificationsRequest = require('./GetUserRealNameVerificationsRequest')
    }
    return Requests._GetUserRealNameVerificationsRequest
  }
})
Object.defineProperty(Requests, 'GetWalletInfoRequest', {
  get: () => {
    if (!Requests._GetWalletInfoRequest) {
      Requests._GetWalletInfoRequest = require('./GetWalletInfoRequest')
    }
    return Requests._GetWalletInfoRequest
  }
})
Object.defineProperty(Requests, 'GetWalletBalanceRequest', {
  get: () => {
    if (!Requests._GetWalletBalanceRequest) {
      Requests._GetWalletBalanceRequest = require('./GetWalletBalanceRequest')
    }
    return Requests._GetWalletBalanceRequest
  }
})
Object.defineProperty(Requests, 'GetWalletAddressRequest', {
  get: () => {
    if (!Requests._GetWalletAddressRequest) {
      Requests._GetWalletAddressRequest = require('./GetWalletAddressRequest')
    }
    return Requests._GetWalletAddressRequest
  }
})
Object.defineProperty(Requests, 'SendBtcRequest', {
  get: () => {
    if (!Requests._SendBtcRequest) {
      Requests._SendBtcRequest = require('./SendBtcRequest')
    }
    return Requests._SendBtcRequest
  }
})
Object.defineProperty(Requests, 'SendBtcWithPinRequest', {
  get: () => {
    if (!Requests._SendBtcWithPinRequest) {
      Requests._SendBtcWithPinRequest = require('./SendBtcWithPinRequest')
    }
    return Requests._SendBtcWithPinRequest
  }
})
Object.defineProperty(Requests, 'GetPaymentMethodsRequest', {
  get: () => {
    if (!Requests._GetPaymentMethodsRequest) {
      Requests._GetPaymentMethodsRequest = require('./GetPaymentMethodsRequest')
    }
    return Requests._GetPaymentMethodsRequest
  }
})
Object.defineProperty(Requests, 'GetCountryCodesRequest', {
  get: () => {
    if (!Requests._GetCountryCodesRequest) {
      Requests._GetCountryCodesRequest = require('./GetCountryCodesRequest')
    }
    return Requests._GetCountryCodesRequest
  }
})
Object.defineProperty(Requests, 'GetCurrenciesRequest', {
  get: () => {
    if (!Requests._GetCurrenciesRequest) {
      Requests._GetCurrenciesRequest = require('./GetCurrenciesRequest')
    }
    return Requests._GetCurrenciesRequest
  }
})
Object.defineProperty(Requests, 'CalculatePriceEquationRequest', {
  get: () => {
    if (!Requests._CalculatePriceEquationRequest) {
      Requests._CalculatePriceEquationRequest = require('./CalculatePriceEquationRequest')
    }
    return Requests._CalculatePriceEquationRequest
  }
})
Object.defineProperty(Requests, 'GetFeesRequest', {
  get: () => {
    if (!Requests._GetFeesRequest) {
      Requests._GetFeesRequest = require('./GetFeesRequest')
    }
    return Requests._GetFeesRequest
  }
})
Object.defineProperty(Requests, 'GetTickerRequest', {
  get: () => {
    if (!Requests._GetTickerRequest) {
      Requests._GetTickerRequest = require('./GetTickerRequest')
    }
    return Requests._GetTickerRequest
  }
})
Object.defineProperty(Requests, 'GetTradingChartRequest', {
  get: () => {
    if (!Requests._GetTradingChartRequest) {
      Requests._GetTradingChartRequest = require('./GetTradingChartRequest')
    }
    return Requests._GetTradingChartRequest
  }
})
Object.defineProperty(Requests, 'GetOrderBookRequest', {
  get: () => {
    if (!Requests._GetOrderBookRequest) {
      Requests._GetOrderBookRequest = require('./GetOrderBookRequest')
    }
    return Requests._GetOrderBookRequest
  }
})

module.exports = Requests
