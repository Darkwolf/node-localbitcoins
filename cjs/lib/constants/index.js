const EventType = require('./EventType')
const AdvertisementType = require('./AdvertisementType')
const TradeType = require('./TradeType')
const TradeStatus = require('./TradeStatus')
const TradeRole = require('./TradeRole')
const ReferenceType = require('./ReferenceType')
const FeedbackType = require('./FeedbackType')
const RealNameVerificationStatus = require('./RealNameVerificationStatus')
const TransactionType = require('./TransactionType')

class Constants {}
Constants.EventType = EventType
Constants.AdvertisementType = AdvertisementType
Constants.TradeType = TradeType
Constants.TradeStatus = TradeStatus
Constants.TradeRole = TradeRole
Constants.ReferenceType = ReferenceType
Constants.FeedbackType = FeedbackType
Constants.RealNameVerificationStatus = RealNameVerificationStatus
Constants.TransactionType = TransactionType

module.exports = Constants
