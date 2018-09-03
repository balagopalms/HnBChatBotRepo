const processMessage = require('../helpers/processMessage');

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
                }
            });
        });
        res.status(200).end();
    }
};