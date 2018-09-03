
const service = require('./serviceDeclaration');
const handlers = require('./intentHandlers');


module.exports = (senderId, result) => {

    if(result && result.metadata && result.metadata.intentName) {
        console.log("IntentName: " + result.metadata.intentName);

        switch( result.metadata.intentName) {
            case 'PASSWORD_RESET - emailId':
                handlers.handleChangePasswd(senderId, result);
                break;
            case 'POPULAR_PRODUCTS':
                handlers.handleShowDealProducts(senderId, result);
            default:
                service.sendTextMessage(senderId, result.fulfillment.speech);
        }
    }
    else {
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }
}