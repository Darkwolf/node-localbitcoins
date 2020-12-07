const Error = require('./Error')
const BadRequestError = require('./BadRequestError')
const UnauthorizedError = require('./UnauthorizedError')
const ForbiddenError = require('./ForbiddenError')
const NotFoundError = require('./NotFoundError')
const UserNotFoundError = require('./UserNotFoundError')
const AdvertisementNotFoundError = require('./AdvertisementNotFoundError')
const TradeNotFoundError = require('./TradeNotFoundError')
const NotEnoughBalanceError = require('./NotEnoughBalanceError')
const UnknownError = require('./UnknownError')

class Errors {}
Errors.Error = Error
Errors.BadRequestError = BadRequestError
Errors.UnauthorizedError = UnauthorizedError
Errors.ForbiddenError = ForbiddenError
Errors.NotFoundError = NotFoundError
Errors.UserNotFoundError = UserNotFoundError
Errors.AdvertisementNotFoundError = AdvertisementNotFoundError
Errors.TradeNotFoundError = TradeNotFoundError
Errors.NotEnoughBalanceError = NotEnoughBalanceError
Errors.UnknownError = UnknownError

module.exports = Errors
