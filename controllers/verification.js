const config = require('../config/config.json');

module.exports = (req, res) => {
    const VERIFY_TOKEN = config.auth.FB_VERIFY_TOKEN;
    const hubChallenge = req.query['hub.challenge'];
    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] == VERIFY_TOKEN);

    if(hubMode && verifyTokenMatches) {
        res.status(200).send(hubChallenge);
    }
    else {
        res.status(403).end();
    }
};