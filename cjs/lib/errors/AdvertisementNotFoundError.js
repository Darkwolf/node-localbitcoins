const NotFoundError = require('./NotFoundError')

class AdvertisementNotFoundError extends NotFoundError {
  constructor(id) {
    super(`Advertisement not found: '${id}'.`, AdvertisementNotFoundError.code)
    this.setName(AdvertisementNotFoundError.name)
  }
}
AdvertisementNotFoundError.name = 'AdvertisementNotFoundError'
AdvertisementNotFoundError.code = 'advertisement-not-found'

module.exports = AdvertisementNotFoundError
