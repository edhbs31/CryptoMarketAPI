'use strict'
const jwt = require('jsonwebtoken')
class Token {
  constructor(expiresIn) {
    this.expiresIn = expiresIn || '1h'
    this.payload = {}
    this.refresh_token = {}
  }

  setToken(payload) {
    this.payload = payload
  }

  setRefresh_token(payload) {
    this.refresh_token = payload
  }

  buildToken() {
    return jwt.sign({
      id: this.payload.id,
      email:this.payload.email,
      name:this.payload.name,
    }, process.env.JWT_KEY, { expiresIn: this.expiresIn })
  }

  buildRefreshToken(token) {
    // Build Refresh token using JWT with data token, user id and email for in any case if the token already expired, you can use refresh token for the authentication
    return jwt.sign({
      userID: this.payload.id,
      email: this.payload.email,
      id: token
    }, process.env.JWT_KEY, { expiresIn: '2h' })
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_KEY)
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_KEY)
  }
}

module.exports = Token