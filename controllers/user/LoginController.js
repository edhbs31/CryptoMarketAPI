const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const {
  HttpSuccess,
  HttpinteralServerError,
  HttpInvalid,
  HttpNotFound,
} = require('../../HttpException/index');
const UserServices = require("../../services/UserServices");
const Token = require('../../helpers/token');
const {
  CryptoHelpers,
} = require("../../helpers/crypto")

/**
 * Stored a newly created resource in storage.
 *
 * @request body of Object type
 */
router.post(
  '/action',
  [
    check('email').not().isEmpty().withMessage('require'),
    check('password').not().isEmpty().withMessage('require'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try{
      const email =  req.body.email
      let originalPassword = req.body.password
      // check if string is on correct email format
      const checkStringEmail = await UserServices.checkStringEmail(email)
      if(checkStringEmail == false) {
        return HttpInvalid(res, { message: 'Wrong email format' })
      }
      // find email in database
      const findAdmin = await UserServices.findData({
        email,
      });
      if (findAdmin==null) {
        return HttpNotFound(res, { message: 'data admin not found' })
      }
      const cryptoHelpers = new CryptoHelpers();
      // check if IS AES ENV is true or false
      // If IS_AES equals true then password must be decrypted into original password
      if(process.env.IS_AES=="true") {
        originalPassword = await cryptoHelpers.DecryptWithAES256(originalPassword);
      }
      // concate original password and salt
      const passwordGroup = `${originalPassword}${findAdmin.salt}`;
      // encrypt original password with SHA 256
      const encryptedData = await cryptoHelpers.EncryptWithSHA256(passwordGroup);
      // compare the ecrypt data with password in database
      const checkPassword = bcrypt.compareSync(
        encryptedData,
        findAdmin.password,
      );
      if(!checkPassword){
        return HttpInvalid(res, { message: 'Wrong password' })
      }
      // declare token helpers
      const Newtoken = new Token();
      Newtoken.setToken(findAdmin);
      // build token 
      const token = Newtoken.buildToken();
      // build refresh token
      const refreshToken = Newtoken.buildRefreshToken(token);
      // return
      return HttpSuccess(res, {
        username : findAdmin.username,
        token : token,
        refreshToken : refreshToken
      });
    } catch (error) {
      console.log(error);
      return HttpinteralServerError(res, {
        message: `Internal Server Error ${error}`
      });
    }
  },
);
module.exports = router;
