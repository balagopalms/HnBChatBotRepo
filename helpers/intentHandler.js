
const service = require('./serviceDeclaration');


module.exports = (senderId, result) => {

    if(result.metadata && result.metadata.intentName) {
        console.log("IntentName: " + result.metadata.intentName);

        switch( result.metadata.intentName) {
            case 'PASSWORD_RESET - emailId':
                console.log("Email: " + result.parameters.email);
                service.changeCommercePasswd(result.parameters.email);
                console.log("Called change password service");
                service.sendTextMessage(senderId, result.fulfillment.speech);
                break;
            default:
                service.sendTextMessage(senderId, result.fulfillment.speech);
        }
    }
    else {
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }
}