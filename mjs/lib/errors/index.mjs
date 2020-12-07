import Error from './Error.mjs'
import BadRequestError from './BadRequestError.mjs'
import UnauthorizedError from './UnauthorizedError.mjs'
import ForbiddenError from './ForbiddenError.mjs'
import NotFoundError from './NotFoundError.mjs'
import UserNotFoundError from './UserNotFoundError.mjs'
import AdvertisementNotFoundError from './AdvertisementNotFoundError.mjs'
import TradeNotFoundError from './TradeNotFoundError.mjs'
import NotEnoughBalanceError from './NotEnoughBalanceError.mjs'
import UnknownError from './UnknownError.mjs'

export {
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
}

export default class Errors {
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
}
