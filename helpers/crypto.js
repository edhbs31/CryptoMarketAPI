const crypto = require('crypto');

class  CryptoHelpers{
  constructor() {
    this.CIPHER_KEY = process.env.CIPHER_KEY;
    this.ALGORITHM = 'aes-256-cbc';
    this.IV_KEY = process.env.IV_KEY;
  }
  // function for generate salt password
  async GenerateSaltPassword () {
    return crypto
    .createHmac('sha256', 'key')
    .update('json')
    .digest('base64');
  }
  async EncryptWithSHA256(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }

  // function encrypt with AES 256
  async EncryptWithAES256(password) {
    try {
      const iv = Buffer.from(this.IV_KEY);
      const secretKey = crypto.createCipheriv(this.ALGORITHM, Buffer.from(this.CIPHER_KEY), iv);
      let encrypted = secretKey.update(password, 'utf8', 'hex');
      encrypted += secretKey.final('hex');
      return encrypted;
    }catch (error) {
      throw error
    }
  }
  // function for decrypt with AES 256
  async  DecryptWithAES256(encryptedText) {
    try {
      const iv = Buffer.from(this.IV_KEY);
      const encryptedData = Buffer.from(encryptedText, 'hex');
      const decipher = crypto.createDecipheriv(this.ALGORITHM, Buffer.from(this.CIPHER_KEY), iv);
      let decrypted = decipher.update(encryptedData, null, 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      console.error('Error decrypting:', error);
      throw error
    }
  }
  
  
}
module.exports = {
  CryptoHelpers,
}