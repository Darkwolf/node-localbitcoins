import EventType from './EventType.mjs'
import AdvertisementType from './AdvertisementType.mjs'
import TradeType from './TradeType.mjs'
import TradeStatus from './TradeStatus.mjs'
import TradeRole from './TradeRole.mjs'
import ReferenceType from './ReferenceType.mjs'
import FeedbackType from './FeedbackType.mjs'
import RealNameVerificationStatus from './RealNameVerificationStatus.mjs'
import TransactionType from './TransactionType.mjs'

export {
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

export default class Constants {
  static EventType = EventType
  static AdvertisementType = AdvertisementType
  static TradeType = TradeType
  static TradeStatus = TradeStatus
  static TradeRole = TradeRole
  static ReferenceType = ReferenceType
  static FeedbackType = FeedbackType
  static RealNameVerificationStatus = RealNameVerificationStatus
  static TransactionType = TransactionType
}
