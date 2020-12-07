import NotFoundError from './NotFoundError.mjs'

export default class AdvertisementNotFoundError extends NotFoundError {
  static name = 'AdvertisementNotFoundError'
  static code = 'advertisement-not-found'

  constructor(id) {
    super(`Advertisement not found: '${id}'.`, AdvertisementNotFoundError.code)
    this.setName(AdvertisementNotFoundError.name)
  }
}
