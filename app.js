'use strict'

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const changePasswordController = require('./controllers/changePassword');
const dialogFlowTestController = require('./controllers/dialogFlowTest');

app.get('/', verificationController);
app.post('/', messageWebhookController);
app.post('/changepwd', changePasswordController);
app.get('/dialogflowtest', dialogFlowTestController);

module.exports = app;