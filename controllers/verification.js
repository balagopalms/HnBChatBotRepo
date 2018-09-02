module.exports = (req, res) => {
    const VERIFY_TOKEN = 'chatbotverificationhnb';
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