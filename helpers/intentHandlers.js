const service = require('./serviceDeclaration');
const PropertiesReader = require('properties-reader');
const templateMsgJSON = require('../jsonData/TemplateMsg.json');
const carouselJSON = require('../jsonData/NBCarousel.json');
const config = require('../config/config.json');
var utf8 = require('utf8');

class IntentHandlers {

    handleChangePasswd(senderId, result) {
        console.log("Email: " + result.parameters.email);
        service.changeCommercePasswd(result.parameters.email);
        console.log("Called change password service");
        service.sendTextMessage(senderId, result.fulfillment.speech);
    }
        
    handleNaturalBeautyProducts(senderId, result) {
    	console.log('Showing Natural Beauty Products..');
    	service.getProductsUnderCategory(config.product_categories.NATURAL_BEAUTY_PRODUCTS, senderId, showDealProducts);
    }
    
    handleFoodsDrinksProducts(senderId, result) {
    	console.log('Showing Food & Drinks Products..');
    	service.getProductsUnderCategory(config.product_categories.FOOD_DRINKS, senderId, showDealProducts);
    }

    handleShowDealProducts(senderId, result) {
        console.log('Showing Deal Products..');
        service.getProductsUnderCategory(config.product_categories.OFFER_PRODUCTS, senderId, showDealProducts);
    }
    
    handleStoreLocator(senderId, result) {
        console.log('Showing Store locator');
        showStoreLocator(senderId);
    }
    
    handleCustomerCare(senderId, result) {
        console.log('Showing Customer care');
        showCustomerService(senderId);
    }
    
    handleOffersAndDeals(senderId, result) {
        console.log('Showing offers & deals');
        showOffersAndDeals(senderId);
    }
}

function showStoreLocator(senderId) {
	
	var message = JSON.parse(JSON.stringify(templateMsgJSON));  //clone the object.	
	var productJSON = JSON.parse(JSON.stringify(carouselJSON)); //clone the object.
	
	productJSON.title = "HNB Stores Information";
	productJSON.image_url = "https://www.allinlondon.co.uk/images/venues/images_all/12306336.jpg";
	productJSON.subtitle = "";
	productJSON.default_action.url = "https://www.hollandandbarrett.com";
	productJSON.default_action.webview_height_ratio = "compact";
	
	productJSON.buttons[0].url = "https://www.hollandandbarrett.com/stores/tottenham-court-road-3223?storeSearch=true";
	productJSON.buttons[0].title = "Visit us at store";
	
	productJSON.buttons.splice(1,1);
	
	message.recipient.id = senderId;
	message.message.attachment.payload.elements.push(productJSON)
	
	console.log("Data being sent to store locator "+JSON.stringify(message));
    service.sendTemplateMessage(senderId, message);
    message = {};
}

function showOffersAndDeals(senderId) {
	
	var message = JSON.parse(JSON.stringify(templateMsgJSON));  //clone the object.	
	var productJSON = JSON.parse(JSON.stringify(carouselJSON)); //clone the object.
	
	productJSON.title = "Deals & Offers !";
	productJSON.image_url = "https://images.hollandandbarrettimages.co.uk/promotionuploads_new/hb/atg/p_1718/p13/offers/p13_puregym_offers_mob.png";
	productJSON.subtitle = "";
	productJSON.default_action.url = "https://www.hollandandbarrett.com/shop/offers/";
	productJSON.default_action.webview_height_ratio = "compact";
	
	productJSON.buttons[0].url = "https://www.hollandandbarrett.com/shop/offers/big-deals-better-than-half-price/#icmp=Offer_OFF_1_P13_2_big_deals";
	productJSON.buttons[0].title = " Half Price !";
	
	productJSON.buttons[1].url = "https://www.hollandandbarrett.com/shop/brands/hairburst/#icmp=Offer_OFF_3_P13_1_hairburst";
	productJSON.buttons[1].title = "Mix & Match !";
	productJSON.buttons[1].type = 'web_url';
	productJSON.buttons[1].payload = "";
	
	message.recipient.id = senderId;
	message.message.attachment.payload.elements.push(productJSON)
	
	console.log("Data being sent for offers & deals "+JSON.stringify(message));
    service.sendTemplateMessage(senderId, message);
    message = {};
}

function showCustomerService(senderId) {
	
	var message = JSON.parse(JSON.stringify(templateMsgJSON));  //clone the object.	
	var productJSON = JSON.parse(JSON.stringify(carouselJSON)); //clone the object.
	
	productJSON.title = "HNB Delivery & Returns";
	productJSON.image_url = "https://edelivery.net/files/cache/2018/04/collect/2768335965.jpg";
	productJSON.subtitle = "";
	productJSON.default_action.url = "https://www.hollandandbarrett.com";
	productJSON.default_action.webview_height_ratio = "compact";
	
	productJSON.buttons[0].url = "https://www.hollandandbarrett.com/info/delivery-and-returns";
	productJSON.buttons[0].title = "More details here !";
	
	productJSON.buttons.splice(1,1);
	
	message.recipient.id = senderId;
	message.message.attachment.payload.elements.push(productJSON)
	
	console.log("Data being sent to customer service "+JSON.stringify(message));
    service.sendTemplateMessage(senderId, message);
    message = {};
}

const showDealProducts = (response, senderId) => {
    var message = JSON.parse(JSON.stringify(templateMsgJSON));  //clone the object.
    message.recipient.id = senderId;
    populateFbTemplate(response, message);
    service.sendTemplateMessage(senderId, message);
    message = {};
};

function populateFbTemplate(response, message) {
    response.results.forEach(
        product=>{
            var productJSON = JSON.parse(JSON.stringify(carouselJSON)); //clone the object.
            var productName = product.name.en;
            console.log("Product Name: " + productName);
            productJSON.title = productName;
            var payload = {};
            payload.id = product.id;
            payload.action = config.postback_actions.ADD_TO_CART;
            var masterVariant = product.masterVariant;
            var variantId = masterVariant.id;
            payload.variantId = variantId;
            productJSON.buttons[1].payload = JSON.stringify(payload);
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
                    productJSON.subtitle = priceCurrency+" "+ priceAmount;
                }
            )
            message.message.attachment.payload.elements.push(productJSON);
        }
    );
    //console.log(JSON.stringify(templateMsgJSON, null, 2));
    //return message;
}

module.exports = new IntentHandlers();