
const service = require('./serviceDeclaration');
const handlers = require('./intentHandlers');
const config = require('../config/config.json');


module.exports = (senderId, result) => {

    if(result && result.metadata && result.metadata.intentName) {
        console.log("IntentName: " + result.metadata.intentName);

        switch( result.metadata.intentName) {
            case config.intents.PASSWORD_RESET:
                handlers.handleChangePasswd(senderId, result);
                break;
            case config.intents.CATEGORY_CAROUSEL:
                handlers.handleShowDealProducts(senderId, result);
            default:
                service.sendTextMessage(senderId, result.fulfillment.speech);
        }
    }
    else {
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }
}