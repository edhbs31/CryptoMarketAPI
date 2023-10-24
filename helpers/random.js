'use strict'
const randomstring = require("randomstring");

class Random {
  getRandomString(length) {
    return randomstring.generate({
      length: length,
      charset: 'alphanumeric'
    });
  }
  getRandomNumber(length) {
    return randomstring.generate({
      length: length,
      charset: 'numeric'
    });
  }
  getRandomHex(length) {
    return randomstring.generate({
      length: length,
      charset: 'hex'
    });
  }
}

module.exports = Random;