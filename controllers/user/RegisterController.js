/* eslint-disable camelcase */
const express = require('express');
//const Sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const {
  HttpSuccess,
  HttpinteralServerError,
  HttpInvalid,
} = require('../../HttpException/index');
const UserServices = require("../../services/UserServices");
const {
  CryptoHelpers,
} = require("../../helpers/crypto")
const gensalt = bcrypt.genSaltSync(10);

const router = express.Router();

router.post('/register', [
    check('name').not().isEmpty().withMessage('require'),
    check('email').not().isEmpty().withMessage('require'),
    check('password').not().isEmpty().withMessage('require'),
], async (req, res) => {
    const errors = validationResult(req);
    const maps = {};
    maps.result = false;
    maps.message = 'Error';
    if (!errors.isEmpty()) {
      maps.message = errors;
      return HttpInvalid(res, maps);
    }
    try {
      const name = req.body.name;
      const email = req.body.email;
      let password = req.body.password;
      // checking if email is on valid format
      const checkStringEmail = await UserServices.checkStringEmail(email)
      if(checkStringEmail == false) {
        return HttpInvalid(res, { message: 'Wrong email format' })
      }
      // find email if email exist or not
      const isExist = await UserServices.findUserEmail({email})
      if(isExist!= null) {
        return HttpInvalid(res, { message: 'email already registered' })
      }
      const cryptoHelpers = new CryptoHelpers();
      // check if IS_AES env is true or false
      if(process.env.IS_AES=="true") {
        // if env IS_AES true then password must be decrypted into original password
        password = await cryptoHelpers.DecryptWithAES256(password);
      }
      // generate random salt
      const salt = await cryptoHelpers.GenerateSaltPassword() 
      // combine original password with salt
      const newPassword = `${password}${salt}`
      // Encrypt original password with salt data using SHA  256 method (1 way encrypt)
      const encryptedData = await cryptoHelpers.EncryptWithSHA256(newPassword);
      // gensalt :Generate A salt  using the bcrypt.genSaltSync() function with 10 rounds of hashing.
      //hash  the synchronous encryptedData generated using the bcrypt.hashSync() function and the gensalt salt.
      const Encpassword = bcrypt.hashSync(encryptedData, gensalt);
      // create user into database
      const data = await UserServices.createUser({
        name,
        password:Encpassword,
        email,
        salt,
      });
      if (data==null) {
        return HttpinteralServerError(res, { message: 'Failed Create Data' })
      }
      return HttpSuccess(res, data);
      
    } catch (error) {
      console.log(error);
      const er = `Internal Server Error Error Catch ${error}`
      return HttpinteralServerError(res, { message: er });
    }
  });
  module.exports = router;
