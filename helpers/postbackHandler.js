const service = require('./serviceDeclaration');

const templateMsgJSON = require('../jsonData/TemplateMsg.json');
const cartViewJSON = require('../jsonData/CartView.json');

class IntentHandlers {

    handleAddToCart(senderId, payload) {
        console.log("handleAddToCart is called ");
        var data = {};
        data.productId = payload.id;
        data.senderId = senderId;
        data.variantId = payload.variantId;
        data.quantity = 1;
        service.loginUser(data, addToCart);
    }
}

const addToCart = (response, data) => {
    console.log("addToCart method is called");
    data.cartId = response.cart.id;
    data.cartVersion = response.cart.version;
    service.addToCart(data, addToCartResHandler);
};

const addToCartResHandler = (response, data) => {
    console.log("Successfully Added Item to Cart");
    service.sendTextMessage(data.senderId, "Added Item to your Cart. Here is your Cart.");
    showCartProducts(response, data.senderId);
};

function showCartProducts(response, senderId) {
    console.log('Showing Cart is called.');
    var message = JSON.parse(JSON.stringify(templateMsgJSON));  //clone the object.
    message.recipient.id = senderId;
    populateCartItemFbTemplate(response, message);
    service.sendTemplateMessage(senderId, message);
    message = {};
};

function populateCartItemFbTemplate(response, message) {
    var counter = 0;
    response.lineItems.some(
        product=>{
            var productJSON = JSON.parse(JSON.stringify(cartViewJSON)); //clone the object.
            var productName = product.name.en;
            console.log("Product Name: " + productName);
            productJSON.title = productName;
            var variant = product.variant;
            var quantity = product.quantity;
            variant.images.forEach(
                image => {
                    var imageURL = image.url;
                    console.log("Image URL: " + imageURL);
                    productJSON.image_url = imageURL;
                }
            );
            variant.prices.forEach(
                price => {
                    var priceAmount = price.value.centAmount/100;
                    var priceCurrency = price.value.currencyCode;
                    console.log("Product Price: " + priceAmount + priceCurrency);
                    productJSON.subtitle = priceCurrency + " " + priceAmount + " Qty. " + quantity;
                }
            )
            message.message.attachment.payload.elements.push(productJSON);
            counter++;
            console.log("counter: " + counter);
            return counter == 10;
        }
    );
}

module.exports = new IntentHandlers();