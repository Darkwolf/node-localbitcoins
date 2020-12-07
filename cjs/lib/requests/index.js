const RefreshTokenRequest = require('./RefreshTokenRequest')
const RevokeTokenRequest = require('./RevokeTokenRequest')
const GetMeRequest = require('./GetMeRequest')
const VerifyPinRequest = require('./VerifyPinRequest')
const GetAdvertisementsRequest = require('./GetAdvertisementsRequest')
const GetMyAdvertisementsRequest = require('./GetMyAdvertisementsRequest')
const GetAdvertisementRequest = require('./GetAdvertisementRequest')
const GetAdvertisementsByIdsRequest = require('./GetAdvertisementsByIdsRequest')
const CreateAdvertisementRequest = require('./CreateAdvertisementRequest')
const EditAdvertisementRequest = require('./EditAdvertisementRequest')
const DeleteAdvertisementRequest = require('./DeleteAdvertisementRequest')
const SetAdvertisementPriceEquationRequest = require('./SetAdvertisementPriceEquationRequest')
const SendFeedbackRequest = require('./SendFeedbackRequest')
const GetUserRequest = require('./GetUserRequest')
const GetMyTradesRequest = require('./GetMyTradesRequest')
const GetTradeRequest = require('./GetTradeRequest')
const GetTradesByIdsRequest = require('./GetTradesByIdsRequest')
const CreateTradeRequest = require('./CreateTradeRequest')
const SendMessageRequest = require('./SendMessageRequest')
const GetMessagesRequest = require('./GetMessagesRequest')
const GetRecentMessagesRequest = require('./GetRecentMessagesRequest')
const CancelTradeRequest = require('./CancelTradeRequest')
const DisputeTradeRequest = require('./DisputeTradeRequest')
const MarkTradePaidRequest = require('./MarkTradePaidRequest')
const MarkTradeRealNameVerificationRequest = require('./MarkTradeRealNameVerificationRequest')
const MarkTradeIdentifiedRequest = require('./MarkTradeIdentifiedRequest')
const ReleaseTradeRequest = require('./ReleaseTradeRequest')
const ReleaseTradeWithPinRequest = require('./ReleaseTradeWithPinRequest')
const DownloadAttachmentRequest = require('./DownloadAttachmentRequest')
const GetNotificationsRequest = require('./GetNotificationsRequest')
const MarkNotificationReadRequest = require('./MarkNotificationReadRequest')
const GetUserRealNameVerificationsRequest = require('./GetUserRealNameVerificationsRequest')
const GetWalletInfoRequest = require('./GetWalletInfoRequest')
const GetWalletBalanceRequest = require('./GetWalletBalanceRequest')
const GetWalletAddressRequest = require('./GetWalletAddressRequest')
const SendBtcRequest = require('./SendBtcRequest')
const SendBtcWithPinRequest = require('./SendBtcWithPinRequest')
const GetPaymentMethodsRequest = require('./GetPaymentMethodsRequest')
const GetCountryCodesRequest = require('./GetCountryCodesRequest')
const GetCurrenciesRequest = require('./GetCurrenciesRequest')
const CalculatePriceEquationRequest = require('./CalculatePriceEquationRequest')
const GetFeesRequest = require('./GetFeesRequest')
const GetTickerRequest = require('./GetTickerRequest')
const GetTradingChartRequest = require('./GetTradingChartRequest')
const GetOrderBookRequest = require('./GetOrderBookRequest')

class Requests {}
Requests.RefreshTokenRequest = RefreshTokenRequest
Requests.RevokeTokenRequest = RevokeTokenRequest
Requests.GetMeRequest = GetMeRequest
Requests.VerifyPinRequest = VerifyPinRequest
Requests.GetAdvertisementsRequest = GetAdvertisementsRequest
Requests.GetMyAdvertisementsRequest = GetMyAdvertisementsRequest
Requests.GetAdvertisementRequest = GetAdvertisementRequest
Requests.GetAdvertisementsByIdsRequest = GetAdvertisementsByIdsRequest
Requests.CreateAdvertisementRequest = CreateAdvertisementRequest
Requests.EditAdvertisementRequest = EditAdvertisementRequest
Requests.DeleteAdvertisementRequest = DeleteAdvertisementRequest
Requests.SetAdvertisementPriceEquationRequest = SetAdvertisementPriceEquationRequest
Requests.SendFeedbackRequest = SendFeedbackRequest
Requests.GetUserRequest = GetUserRequest
Requests.GetMyTradesRequest = GetMyTradesRequest
Requests.GetTradeRequest = GetTradeRequest
Requests.GetTradesByIdsRequest = GetTradesByIdsRequest
Requests.CreateTradeRequest = CreateTradeRequest
Requests.SendMessageRequest = SendMessageRequest
Requests.GetMessagesRequest = GetMessagesRequest
Requests.GetRecentMessagesRequest = GetRecentMessagesRequest
Requests.CancelTradeRequest = CancelTradeRequest
Requests.DisputeTradeRequest = DisputeTradeRequest
Requests.MarkTradePaidRequest = MarkTradePaidRequest
Requests.MarkTradeRealNameVerificationRequest = MarkTradeRealNameVerificationRequest
Requests.MarkTradeIdentifiedRequest = MarkTradeIdentifiedRequest
Requests.ReleaseTradeRequest = ReleaseTradeRequest
Requests.ReleaseTradeWithPinRequest = ReleaseTradeWithPinRequest
Requests.DownloadAttachmentRequest = DownloadAttachmentRequest
Requests.GetNotificationsRequest = GetNotificationsRequest
Requests.MarkNotificationReadRequest = MarkNotificationReadRequest
Requests.GetUserRealNameVerificationsRequest = GetUserRealNameVerificationsRequest
Requests.GetWalletInfoRequest = GetWalletInfoRequest
Requests.GetWalletBalanceRequest = GetWalletBalanceRequest
Requests.GetWalletAddressRequest = GetWalletAddressRequest
Requests.SendBtcRequest = SendBtcRequest
Requests.SendBtcWithPinRequest = SendBtcWithPinRequest
Requests.GetPaymentMethodsRequest = GetPaymentMethodsRequest
Requests.GetCountryCodesRequest = GetCountryCodesRequest
Requests.GetCurrenciesRequest = GetCurrenciesRequest
Requests.CalculatePriceEquationRequest = CalculatePriceEquationRequest
Requests.GetFeesRequest = GetFeesRequest
Requests.GetTickerRequest = GetTickerRequest
Requests.GetTradingChartRequest = GetTradingChartRequest
Requests.GetOrderBookRequest = GetOrderBookRequest

module.exports = Requests
