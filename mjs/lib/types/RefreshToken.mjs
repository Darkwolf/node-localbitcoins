import { UnixTimestamp } from '@darkwolf/time.mjs'

export default class RefreshToken {
  static fromParams(params = {}) {
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

  static from(data) {
    return new RefreshToken(data)
  }

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
