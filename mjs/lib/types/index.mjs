import Response from './Response.mjs'
import RefreshToken from './RefreshToken.mjs'
import User from './User.mjs'
import Advertisement from './Advertisement.mjs'
import PaymentDetails from './PaymentDetails.mjs'
import Trade from './Trade.mjs'
import Message from './Message.mjs'
import Attachment from './Attachment.mjs'
import Notification from './Notification.mjs'
import RealNameVerification from './RealNameVerification.mjs'
import OldWalletAddress from './OldWalletAddress.mjs'
import Transaction from './Transaction.mjs'
import WalletInfo from './WalletInfo.mjs'
import InputFile from './InputFile.mjs'
import PaymentMethod from './PaymentMethod.mjs'
import Currency from './Currency.mjs'
import Fees from './Fees.mjs'
import OrderBook from './OrderBook.mjs'

export {
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
}

export default class Types {
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
}
