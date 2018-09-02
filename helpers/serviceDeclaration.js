
const FACEBOOK_ACCESS_TOKEN = 'EAAETHMOICOkBAIu7tEQL8zDfR5JMZAxJwbLDD9iWxh4QUJZCYPOSBDGTcBQiBpNNYxQkYkMejaMtWtxBwEdBe3d56rye0NALe6w3sgQ49y7FtOw5ZAJDoCRUB23tbyFsD1ZAFwXNqR0utxgwCppJ0cp11BPSytBup1j0qht7fUlYM7DKnSLMMIEY6zin3hUZD';

const request = require('request');

class Services {
    sendTextMessage (senderId, text) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body: {
                recipient: { id: senderId },
                message: { text },
            },
            json: true
        });
    }

    changeCommercePasswd (emailId) {
        request({
            uri: 'https://radiant-hollows-75895.herokuapp.com/changepwd',
            method: 'POST',
            body: {
                email: { emailId }
            },
            json: true
        })
    }
}

module.exports = new Services()