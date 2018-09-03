

class IntentHandlers {

    handleAddToCart(event) {
        console.log("Called Add to Cart: " + event.postback.payload.id);
    }
}

module.exports = new IntentHandlers();