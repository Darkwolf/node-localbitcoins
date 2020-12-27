class Errors {}
Object.defineProperty(Errors, 'Error', {
  get: () => {
    if (!Errors._Error) {
      Errors._Error = require('./Error')
    }
    return Errors._Error
  }
})
Object.defineProperty(Errors, 'BadRequestError', {
  get: () => {
    if (!Errors._BadRequestError) {
      Errors._BadRequestError = require('./BadRequestError')
    }
    return Errors._BadRequestError
  }
})
Object.defineProperty(Errors, 'UnauthorizedError', {
  get: () => {
    if (!Errors._UnauthorizedError) {
      Errors._UnauthorizedError = require('./UnauthorizedError')
    }
    return Errors._UnauthorizedError
  }
})
Object.defineProperty(Errors, 'ForbiddenError', {
  get: () => {
    if (!Errors._ForbiddenError) {
      Errors._ForbiddenError = require('./ForbiddenError')
    }
    return Errors._ForbiddenError
  }
})
Object.defineProperty(Errors, 'NotFoundError', {
  get: () => {
    if (!Errors._NotFoundError) {
      Errors._NotFoundError = require('./NotFoundError')
    }
    return Errors._NotFoundError
  }
})
Object.defineProperty(Errors, 'UserNotFoundError', {
  get: () => {
    if (!Errors._UserNotFoundError) {
      Errors._UserNotFoundError = require('./UserNotFoundError')
    }
    return Errors._UserNotFoundError
  }
})
Object.defineProperty(Errors, 'AdvertisementNotFoundError', {
  get: () => {
    if (!Errors._AdvertisementNotFoundError) {
      Errors._AdvertisementNotFoundError = require('./AdvertisementNotFoundError')
    }
    return Errors._AdvertisementNotFoundError
  }
})
Object.defineProperty(Errors, 'TradeNotFoundError', {
  get: () => {
    if (!Errors._TradeNotFoundError) {
      Errors._TradeNotFoundError = require('./TradeNotFoundError')
    }
    return Errors._TradeNotFoundError
  }
})
Object.defineProperty(Errors, 'NotEnoughBalanceError', {
  get: () => {
    if (!Errors._NotEnoughBalanceError) {
      Errors._NotEnoughBalanceError = require('./NotEnoughBalanceError')
    }
    return Errors._NotEnoughBalanceError
  }
})
Object.defineProperty(Errors, 'UnknownError', {
  get: () => {
    if (!Errors._UnknownError) {
      Errors._UnknownError = require('./UnknownError')
    }
    return Errors._UnknownError
  }
})

module.exports = Errors
