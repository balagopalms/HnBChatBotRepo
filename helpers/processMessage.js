const config = require('../config/config.json');

const API_AI_TOKEN = config.auth.API_AI_TOKEN;

const apiAiClient = require('apiai')(API_AI_TOKEN);
const intentHandler = require('./intentHandler');

module.exports = (event) => {
    const senderId = event.sender.id;
    console.log("SenderId: " + senderId);
    const message = event.message.text;
    console.log("Message: " + message);
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
    console.log("Sent request to DialogFlow");
    apiaiSession.on('response', (response) => {
        console.log("Got response from DialogFlow");
        intentHandler(senderId, response.result);
    });
    apiaiSession.on('error', (error) => {
        console.log("Error while connecting to DialogFlow");
        console.log(error);
    });
    apiaiSession.end();
};