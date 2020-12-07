# LocalBitcoins API
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/localbitcoins.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/localbitcoins.cjs`
## Using
```javascript
// ECMAScript
import LocalBitcoins, {
  InputFile
} from '@darkwolf/localbitcoins.mjs'

// CommonJS
const LocalBitcoins = require('@darkwolf/localbitcoins.cjs')
const {
  InputFile
} = LocalBitcoins

// HMAC auth
const localbitcoins = new LocalBitcoins({
  hmac: {
    key,
    secret
  }
})
// OAuth2 client
// Client ID, Client Secret, and Refresh Token are required for auto refresh
const client = new LocalBitcoins({
  oauth2: {
    clientId,
    clientSecret,
    accessToken,
    refreshToken,
    expiresIn
  }
})

// Handling events
localbitcoins.on('request', request => {})
localbitcoins.on('response', response => {})
localbitcoins.on('error', error => {})

// Getting advertisements
const advertisements = await localbitcoins.getAdvertisements({
  currency: 'USD'
})
// Sending bitcoins
await localbitcoins.sendBtc(address, amount)
// Sending messages with attachments to the trade chat
// HMAC auth does not support ReadStream due to inability to compute the signature
const attachment = new InputFile(fs.readFileSync('photo.jpeg'), 'photo.jpeg')
await localbitcoins.sendMessage(tradeId, 'Ave, Darkwolf!', attachment)
// While using the OAuth2 client supports this
await client.sendMessage(tradeId, 'Ave, Darkwolf!', fs.createReadStream('photo.jpeg'))
```
## [API Documentation](https://github.com/Darkwolf/node-localbitcoins/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
