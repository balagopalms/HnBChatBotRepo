const API_AI_TOKEN = 'ec4a634f004248bdb08bd20e0f0a8d4a';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAJpZCJzwtZAMBAARzK0S1BG1hpSEZCziqbcNDybgictya2tYNuhhe9ZB2GQd0gZBFECOdsnC4q75DlGAIj059d6EVRWEjE5Afeiu2kxg8NmHdawkTqE5xQ9BZB32zcBCdelwKqg3eELfuwqPm6c7AQh8SRAqFZCZCVJLxT8unY5xiDKVsQVwKyBKbdUKlLNveYZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        body: {
            recipient: { id: senderId },
            message: { text },
        },
        json: true
    });
};

const callCommerce = (emailId) => {
    request({
        uri: 'https://88289eab.ngrok.io/changepwd',
        method: 'POST',
        body: {
            email: { emailId }
        },
        json: true
    })
};
module.exports = (event) => {
    const senderId = event.sender.id;
    console.log("SenderId: " + senderId);
    const message = event.message.text;
    console.log("Message: " + message);
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'fbchatboth&b'});
    console.log("Sent request to DialogFlow");
    apiaiSession.on('response', (response) => {
        console.log("Got response from DialogFlow");
        const result = response.result.fulfillment.speech;
        console.log(response.result.metadata.intentName);
        console.log(response.result.parameters.email);
        if( response.result.metadata.intentName && 
                response.result.metadata.intentName == 'PASSWORD_RESET - emailId'
                && response.result.parameters.email ) {
            callCommerce(response.result.parameters.email);
            console.log("Called change password service");
        }
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', (error) => {
        console.log("Error while connecting to DialogFlow");
        console.log(error);
    });
    apiaiSession.end();
};