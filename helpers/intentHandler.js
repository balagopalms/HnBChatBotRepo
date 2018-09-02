
const service = require('./serviceDeclaration');


module.exports = (senderId, result) => {

    if(result.metadata && result.metadata.intentName) {
        switch( result.metadata.intentName) {
            case 'PASSWORD_RESET - emailId':
                service.changeCommercePasswd(result.parameters.email);
                console.log("Called change password service");
                break;
            default:
                service.sendTextMessage(senderId, result);
        }
    }
    else {
        service.sendTextMessage(senderId, result);
    }
}