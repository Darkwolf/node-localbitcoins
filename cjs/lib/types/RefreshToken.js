const { UnixTimestamp } = require('@darkwolf/time.cjs')

class RefreshToken {
  constructor(data = {}) {
    this
      .setAccessToken(data.accessToken)
      .setRefreshToken(data.refreshToken)
      .setExpiresIn(data.expiresIn)
  }

  setAccessToken(token) {
    this.accessToken = token
    return this
  }

  setRefreshToken(token) {
    this.refreshToken = token
    return this
  }

  setExpiresIn(date) {
    this.expiresIn = date
    return this
  }

  toJSON() {
    const data = {}
    if (this.accessToken) {
      data.accessToken = this.accessToken
    }
    if (this.refreshToken) {
      data.refreshToken = this.refreshToken
    }
    if (this.expiresIn) {
      data.expiresIn = this.expiresIn
    }
    return data
  }
}
RefreshToken.fromParams = (params = {}) => {
  const data = {
    accessToken: params.access_token,
    refreshToken: params.refresh_token,
    expiresIn: params.expires_in
  }
  if (data.expiresIn) {
    data.expiresIn = new UnixTimestamp().addSeconds(parseInt(data.expiresIn)).seconds
  }
  return new RefreshToken(data)
}
RefreshToken.from = data => new RefreshToken(data)

module.exports = RefreshToken
