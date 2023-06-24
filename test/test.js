const body = require('./body.json')
const cryptoLib = require('crypto');
require('dotenv').config()

const signature = 'sha1=ec0ed8956dacbbaad783eb25e87acf020772d73e'

// Create our HMAC token
const hmac = cryptoLib.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET);

// Update it with the JSON body
const digest = 'sha1=' + hmac.update(JSON.stringify(body)).digest('hex')

console.log(digest)
console.log(signature === digest)
