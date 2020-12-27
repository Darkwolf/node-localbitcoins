class Types {}
Object.defineProperty(Types, 'Response', {
  get: () => {
    if (!Types._Response) {
      Types._Response = require('./Response')
    }
    return Types._Response
  }
})
Object.defineProperty(Types, 'RefreshToken', {
  get: () => {
    if (!Types._RefreshToken) {
      Types._RefreshToken = require('./RefreshToken')
    }
    return Types._RefreshToken
  }
})
Object.defineProperty(Types, 'User', {
  get: () => {
    if (!Types._User) {
      Types._User = require('./User')
    }
    return Types._User
  }
})
Object.defineProperty(Types, 'Advertisement', {
  get: () => {
    if (!Types._Advertisement) {
      Types._Advertisement = require('./Advertisement')
    }
    return Types._Advertisement
  }
})
Object.defineProperty(Types, 'PaymentDetails', {
  get: () => {
    if (!Types._PaymentDetails) {
      Types._PaymentDetails = require('./PaymentDetails')
    }
    return Types._PaymentDetails
  }
})
Object.defineProperty(Types, 'Trade', {
  get: () => {
    if (!Types._Trade) {
      Types._Trade = require('./Trade')
    }
    return Types._Trade
  }
})
Object.defineProperty(Types, 'Message', {
  get: () => {
    if (!Types._Message) {
      Types._Message = require('./Message')
    }
    return Types._Message
  }
})
Object.defineProperty(Types, 'Attachment', {
  get: () => {
    if (!Types._Attachment) {
      Types._Attachment = require('./Attachment')
    }
    return Types._Attachment
  }
})
Object.defineProperty(Types, 'Notification', {
  get: () => {
    if (!Types._Notification) {
      Types._Notification = require('./Notification')
    }
    return Types._Notification
  }
})
Object.defineProperty(Types, 'RealNameVerification', {
  get: () => {
    if (!Types._RealNameVerification) {
      Types._RealNameVerification = require('./RealNameVerification')
    }
    return Types._RealNameVerification
  }
})
Object.defineProperty(Types, 'OldWalletAddress', {
  get: () => {
    if (!Types._OldWalletAddress) {
      Types._OldWalletAddress = require('./OldWalletAddress')
    }
    return Types._OldWalletAddress
  }
})
Object.defineProperty(Types, 'Transaction', {
  get: () => {
    if (!Types._Transaction) {
      Types._Transaction = require('./Transaction')
    }
    return Types._Transaction
  }
})
Object.defineProperty(Types, 'WalletInfo', {
  get: () => {
    if (!Types._WalletInfo) {
      Types._WalletInfo = require('./WalletInfo')
    }
    return Types._WalletInfo
  }
})
Object.defineProperty(Types, 'InputFile', {
  get: () => {
    if (!Types._InputFile) {
      Types._InputFile = require('./InputFile')
    }
    return Types._InputFile
  }
})
Object.defineProperty(Types, 'PaymentMethod', {
  get: () => {
    if (!Types._PaymentMethod) {
      Types._PaymentMethod = require('./PaymentMethod')
    }
    return Types._PaymentMethod
  }
})
Object.defineProperty(Types, 'Currency', {
  get: () => {
    if (!Types._Currency) {
      Types._Currency = require('./Currency')
    }
    return Types._Currency
  }
})
Object.defineProperty(Types, 'Fees', {
  get: () => {
    if (!Types._Fees) {
      Types._Fees = require('./Fees')
    }
    return Types._Fees
  }
})
Object.defineProperty(Types, 'OrderBook', {
  get: () => {
    if (!Types._OrderBook) {
      Types._OrderBook = require('./OrderBook')
    }
    return Types._OrderBook
  }
})

module.exports = Types
