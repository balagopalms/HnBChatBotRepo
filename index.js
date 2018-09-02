

'use strict'

const PORT = process.env.PORT || 3000

const app = require('./app');

app.listen(PORT, () => console.log('Webhook server is listening, port 3000'));