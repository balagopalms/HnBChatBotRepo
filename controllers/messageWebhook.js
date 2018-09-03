const processMessage = require('../helpers/processMessage');
const processPostBack = require('../helpers/processPostBack');

module.exports = (req, res) => {
    console.log("Request: " + JSON.stringify(req.body));
    if(req.body.object == 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if(event.message && event.message.text) {
                    processMessage(event);
                }
                if(event.postback) {
                    console.log("Postback Payload: " + JSON.stringify(event.postback.payload, null, 2))
                    processPostBack(event);
                }
            });
        });
        res.status(200).end();
    }
};