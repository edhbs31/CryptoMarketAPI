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
- export API_KEY_CRYPTO="b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c"
- export JWT_KEY="vecktwfpkigdiqtpyhlqptihwxgqmyszxmldyscwigsc"
- export DB_URI="mongodb+srv://user:admin123@cluster0.jvfu57r.mongodb.net/?retryWrites=true&w=majority"
- export DB_NAME="Crypto"
- export PORT=3000
- export IS_AES=true
- export CIPHER_KEY="kovgywjqwjlfxndwvxlscdfhhqyzyoab"
- export IV_KEY="labncrpoqlyhxtqc"
- export CLIENT_KEY="Q0N2bA-YQgWI8807lM55GPjNBoXrhvsaREck-6WLn0k"
#### Test
npm test crypto.test.js
##### API POSTMAN
- https://api.postman.com/collections/23989743-f8193b9b-2df5-421c-89f7-0aef91395673?access_key=PMAT-01HDF0W73EA7Q6PXAWR0E938BX 
- Variables:
	- {{client_key}} : UTBOMmJBLVlRZ1dJODgwN2xNNTVHUGpOQm9Ycmh2c2FSRWNrLTZXTG4waw== 
	- {{api_key}}: eyJpZCI6IjciLCJuYW1lIjoic2Nvb3Bfd2ViX2FwcHMifQ
	- {{server}}: localhost:3000/
	- {{x-access-token}}

###### Documentation
https://drive.google.com/file/d/1vxYG0Hmrh3jr1oIUOSUzff9wCBtDbZbN/view?usp=sharing 
