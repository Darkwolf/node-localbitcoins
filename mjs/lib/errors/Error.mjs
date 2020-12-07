import CustomError from '@darkwolf/custom-error.mjs'

export default class LocalBitcoinsError extends CustomError {
  static name = 'LocalBitcoinsError'

  constructor(message, code) {
    super(message, code)
    this.setName(LocalBitcoinsError.name)
  }

  setRequest(request) {
    this.request = request
    return this
  }

  setResponse(response) {
    this.response = response
    return this
  }
}
