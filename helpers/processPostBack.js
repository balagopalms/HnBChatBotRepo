const service = require('./serviceDeclaration');
const handlers = require('./postbackHandler');
const utf8 = require('utf8');
const config = require('../config/config.json');

module.exports = (event) => {
    console.log("processPostBack");
    if(event.postback.payload) {
        var payload = JSON.parse(utf8.decode(event.postback.payload));
        const action = payload.action;
        console.log("Action: " + action);
        if(action) {
            switch(action) {
                case config.postback_actions.ADD_TO_CART:
                    handlers.handleAddToCart(event.sender.id, payload);
                    break;
                default:
                    console.log("Unhandled Postback");
            }
        }
    }
};