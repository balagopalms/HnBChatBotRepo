const service = require('./serviceDeclaration');

class IntentHandlers {

    handleAddToCart(senderId, payload) {
        console.log("handleAddToCart is called ");
        var data = {};
        data.productId = payload.id;
        data.senderId = senderId;
        data.variantId = 1;
        service.loginUser(data, addToCart);
    }
}

const addToCart = (response, data) => {
    console.log("addToCart method is called");
    console.log(response.cart.version);
    console.log(response.cart.id);
    data.variantId = 1;
    data.quantity = 1;
    data.cartId = response.cart.id;
    data.cartVersion = response.cart.version;
    service.addToCart(data, addToCartResHandler);
};

const addToCartResHandler = (response, data) => {
    console.log("Successfully Added Item to Cart");
    service.sendTextMessage(data.senderId, "Added Item to your Cart.");
};

module.exports = new IntentHandlers();