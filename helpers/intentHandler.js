
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
                break;
            case config.intents.NATURAL_BEAUTY:
                handlers.handleNaturalBeautyProducts(senderId, result);
                break;
            case config.intents.FOOD_DRINKS:
                handlers.handleFoodsDrinksProducts(senderId, result);
                break;
            case config.intents.STORE_LOCATOR:
                handlers.handleStoreLocator(senderId, result);   
                break;
            case config.intents.CUSTOMER_CARE:
                handlers.handleCustomerCare(senderId, result);
                break;
            case config.intents.OFFERS_DEALS:
                handlers.handleOffersAndDeals(senderId, result);
                break;                                
            default:
                service.sendTextMessage(senderId, result.fulfillment.speech);
        }
    }
    else {
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }
}