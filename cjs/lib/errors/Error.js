const CustomError = require('@darkwolf/custom-error.cjs')

class LocalBitcoinsError extends CustomError {
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
LocalBitcoinsError.name = 'LocalBitcoinsError'

module.exports = LocalBitcoinsError
