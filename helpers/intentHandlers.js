const service = require('./serviceDeclaration');
const PropertiesReader = require('properties-reader');
const templateMsgJSON = require('../jsonData/TemplateMsg.json');
const carouselJSON = require('../jsonData/NBCarousel.json');
var utf8 = require('utf8');

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
            var id = product.id;
            productJSON.buttons[1].payload = utf8.encode(id);
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
    //console.log(JSON.stringify(templateMsgJSON, null, 2));
    return templateMsgJSON;
}

module.exports = new IntentHandlers();