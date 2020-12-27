class Constants {}
Object.defineProperty(Constants, 'EventType', {
  get: () => {
    if (!Constants._EventType) {
      Constants._EventType = require('./EventType')
    }
    return Constants._EventType
  }
})
Object.defineProperty(Constants, 'AdvertisementType', {
  get: () => {
    if (!Constants._AdvertisementType) {
      Constants._AdvertisementType = require('./AdvertisementType')
    }
    return Constants._AdvertisementType
  }
})
Object.defineProperty(Constants, 'TradeType', {
  get: () => {
    if (!Constants._TradeType) {
      Constants._TradeType = require('./TradeType')
    }
    return Constants._TradeType
  }
})
Object.defineProperty(Constants, 'TradeStatus', {
  get: () => {
    if (!Constants._TradeStatus) {
      Constants._TradeStatus = require('./TradeStatus')
    }
    return Constants._TradeStatus
  }
})
Object.defineProperty(Constants, 'TradeRole', {
  get: () => {
    if (!Constants._TradeRole) {
      Constants._TradeRole = require('./TradeRole')
    }
    return Constants._TradeRole
  }
})
Object.defineProperty(Constants, 'ReferenceType', {
  get: () => {
    if (!Constants._ReferenceType) {
      Constants._ReferenceType = require('./ReferenceType')
    }
    return Constants._ReferenceType
  }
})
Object.defineProperty(Constants, 'FeedbackType', {
  get: () => {
    if (!Constants._FeedbackType) {
      Constants._FeedbackType = require('./FeedbackType')
    }
    return Constants._FeedbackType
  }
})
Object.defineProperty(Constants, 'RealNameVerificationStatus', {
  get: () => {
    if (!Constants._RealNameVerificationStatus) {
      Constants._RealNameVerificationStatus = require('./RealNameVerificationStatus')
    }
    return Constants._RealNameVerificationStatus
  }
})
Object.defineProperty(Constants, 'TransactionType', {
  get: () => {
    if (!Constants._TransactionType) {
      Constants._TransactionType = require('./TransactionType')
    }
    return Constants._TransactionType
  }
})

module.exports = Constants
