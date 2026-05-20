# CryptoMarketAPI
CryptoMarket With Node Js And Mongo DB
## Installation
- Download Node.js 10.xxx or higher
- Create Mongo DB Account
- Download Postman
### How to use it
- npm install
- npm start
#### Environment
- export API_CRYPTO="https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
- export API_KEY_CRYPTO=""
- export JWT_KEY=""
- export DB_URI=""
- export DB_NAME=""
- export PORT=
- export IS_AES=
- export CIPHER_KEY=""
- export IV_KEY=""
- export CLIENT_KEY=""
#### Test
npm test crypto.test.js
##### API POSTMAN
- https://api.postman.com/collections/23989743-f8193b9b-2df5-421c-89f7-0aef91395673?access_key=PMAT-01HDF0W73EA7Q6PXAWR0E938BX 
- Variables:
	- {{client_key}} :  
	- {{api_key}}: 
	- {{server}}: localhost:3000/
	- {{x-access-token}}
