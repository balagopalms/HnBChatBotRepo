
const FACEBOOK_ACCESS_TOKEN = 'EAAETHMOICOkBAIu7tEQL8zDfR5JMZAxJwbLDD9iWxh4QUJZCYPOSBDGTcBQiBpNNYxQkYkMejaMtWtxBwEdBe3d56rye0NALe6w3sgQ49y7FtOw5ZAJDoCRUB23tbyFsD1ZAFwXNqR0utxgwCppJ0cp11BPSytBup1j0qht7fUlYM7DKnSLMMIEY6zin3hUZD';
const COMMERCETOOL_AUTH = 'Bearer fAmDzrQsQ2vt41uV7_M4N1xgrE-d47kF';

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

    sendTemplateMessage(senderId, templateJson){
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body:templateJson,
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("FB Error: "+err);
                console.log("FB ResponseBody: "+res.statusCode);
                console.log("FB ResponseBody: "+res.body);
            }
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

    getProductsUnderCategory(categoryId, senderId, callBackMethod) {
        request({
            url: 'https://api.sphere.io/hnb-59/product-projections/search',
            qs: {filter: 'categories.id: subtree("' + categoryId +'")', limit:5},
            headers : {
                Authorization : COMMERCETOOL_AUTH
            },
            method: 'POST',		 
        }, function (err, res, body) {
            console.log("got response from CT");
            callBackMethod(body, senderId);
        });
    }
}

module.exports = new Services();