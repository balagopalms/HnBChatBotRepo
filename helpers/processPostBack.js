const service = require('./serviceDeclaration');
const handlers = require('./postbackHandler');

module.exports = (event) => {

    if(event.payload) {
        const action = event.payload.action;
        if(action) {
            switch(action) {
                case 'add_to_cart':
                    handlers.handleAddToCart(event);
                    break;
                default:
                    service.sendTextMessage(senderId, result.fulfillment.speech);
            }
        }
    }
};