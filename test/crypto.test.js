const { CryptoHelpers } = require('../helpers/crypto');

describe('CryptoHelpers', () => {
  let cryptoHelpers;

  beforeEach(() => {
    cryptoHelpers = new CryptoHelpers();
  });

  test('GenerateSaltPassword generates a salted password', async () => {
    const saltedPassword = await cryptoHelpers.GenerateSaltPassword();
    expect(saltedPassword).toBeDefined();
  });

  test('EncryptWithSHA256 encrypts data with SHA-256', async () => {
    const encryptedData = await cryptoHelpers.EncryptWithSHA256('sampledata');
    expect(encryptedData).toBeDefined();
  });

  test('EncryptWithAES256 encrypts data with AES-256', async () => {
    const encryptedData = await cryptoHelpers.EncryptWithAES256('sensitiveinfo');
    expect(encryptedData).toBeDefined();
  });

  test('DecryptWithAES256 decrypts data encrypted with AES-256', async () => {
    const encryptedData = await cryptoHelpers.EncryptWithAES256('sensitiveinfo');
    const decryptedData = await cryptoHelpers.DecryptWithAES256(encryptedData);
    expect(decryptedData).toEqual('sensitiveinfo');
  });
});
