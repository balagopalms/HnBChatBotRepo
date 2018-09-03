const processMessage = require('../helpers/processMessage');

module.exports = (req, res) => {
    console.log("Message: " + JSON.stringify(JSON.parse(req), null, 2));
    if(req.body.object == 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if(event.message && event.message.text) {
                    processMessage(event);
                }
            });
        });
        res.status(200).end();
    }
};