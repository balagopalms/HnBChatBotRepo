const service = require('./serviceDeclaration');
var PropertiesReader = require('properties-reader');
var fs = require('fs');

class IntentHandlers {

    handleChangePasswd(senderId, result) {
        console.log("Email: " + result.parameters.email);
        service.changeCommercePasswd(result.parameters.email);
        console.log("Called change password service");
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }

    handleShowDealProducts(senderId, result) {
        console.log('Showing Deal Products..');
        service.getProductsUnderCategory('a148c0b0-9d86-448b-a9e5-0effa2b6499d', senderId, showDealProducts);
    }
}

const showDealProducts = (response, senderId) => {
    console.log('Show Deal Products Method is called.');
    var carouselJSON = JSON.parse(fs.readFileSync('jsonData/NBCarousel.json', 'utf8'));
    carouselJSON.recipient.id = senderId;
    service.sendTemplateMessage(senderId, carouselJSON);
};

module.exports = new IntentHandlers();