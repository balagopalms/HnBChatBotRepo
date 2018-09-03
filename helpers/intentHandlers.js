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
    var templateMsgJSON = require('../jsonData/TemplateMsg.json');
    const carouselJSON = require('../jsonData/NBCarousel.json');
    templateMsgJSON.recipient.id = senderId;
    populateFbTemplate(response, templateMsgJSON, carouselJSON);
    service.sendTemplateMessage(senderId, templateMsgJSON);
};

function populateFbTemplate(response, templateMsgJSON, carouselJSON) {
    response.results.forEach(
        product=>{
            var productJSON = JSON.parse(JSON.stringify(carouselJSON)); //clone the object.
            var productName = product.name.en;
            console.log("Product Name: " + productName);
            productJSON.title = productName;
            var masterVariant = product.masterVariant;
            masterVariant.images.forEach(
                image => {
                    var imageURL = image.url;
                    console.log("Image URL: " + imageURL);
                    productJSON.image_url = imageURL;
                }
            );
            masterVariant.prices.forEach(
                price => {
                    var priceAmount = price.value.centAmount/100;
                    var priceCurrency = price.value.currencyCode;
                    console.log("Product Price: " + priceAmount + priceCurrency);
                    productJSON.subtitle = priceAmount + priceCurrency;
                }
            )
            templateMsgJSON.message.attachment.payload.elements.push(productJSON);
        }
        
    );
}

module.exports = new IntentHandlers();