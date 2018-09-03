

class IntentHandlers {

    handleAddToCart(senderId, payload) {
        console.log("Called Add to Cart: " + payload.id);
    }
}

module.exports = new IntentHandlers();