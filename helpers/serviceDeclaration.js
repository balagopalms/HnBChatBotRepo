
const config = require('../config/config.json');

const FACEBOOK_ACCESS_TOKEN = config.auth.FACEBOOK_ACCESS_TOKEN;
const COMMERCETOOL_AUTH = config.auth.COMMERCETOOL_AUTH;
const WEBHOOK_URL = config.url.WEBHOOK_URL;
const COMMERCETOOL_BASE_URL = config.url.COMMERCETOOL_BASE_URL;
const CT_USERID = config.auth.CT_USERID;
const CT_PASSWORD = config.auth.CT_PASSWORD;

const request = require('request');

class Services {
    sendTextMessage (senderId, text) {
        request({
            url: config.url.FACEBOOK_GRAPH + '/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body: {
                recipient: { id: senderId },
                message: { text },
            },
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        });
    }

    sendTemplateMessage(senderId, templateJson){
        request({
            url: config.url.FACEBOOK_GRAPH + '/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body:templateJson,
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        });
    }

    changeCommercePasswd (emailId) {
        request({
            uri: WEBHOOK_URL + '/changepwd',
            method: 'POST',
            body: {
                email: { emailId }
            },
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        })
    }

    getProductsUnderCategory(categoryId, senderId, callBackMethod) {
        request({
            url: COMMERCETOOL_BASE_URL + '/product-projections/search',
            qs: {filter: 'categories.id: subtree("' + categoryId +'")', limit:5},
            headers : {
                Authorization : COMMERCETOOL_AUTH
            },
            method: 'POST',		 
        }, function (err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
                return;
            }
            console.log("got response from CT");
            var result = JSON.parse(body);
            callBackMethod(result, senderId);
        });
    }

    loginUser(data, callBackHandler) {
        console.log("loginUser method is called.");
        request({
            url: COMMERCETOOL_BASE_URL + '/login',
            headers : {
                Authorization : COMMERCETOOL_AUTH
            },
            body: {
                email: CT_USERID,
                password: CT_PASSWORD
            },
            json: true,
            method: 'POST'
        }, function (err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
                return;
            }
            console.log("got response from CT");
            var response = JSON.parse(JSON.stringify(body));
            callBackHandler(response, data);
        });
    }

    addToCart(data, callBackHandler) {
        console.log("addToCart service method is called.");
        request({
            url: COMMERCETOOL_BASE_URL + '/carts/' + data.cartId,
            headers : {
                Authorization : COMMERCETOOL_AUTH
            },
            body: {
                version: data.cartVersion,
                actions: [{
                    action: "addLineItem",
                    productId: data.productId,
                    variantId: data.variantId,
                    quantity: data.quantity
                }]
            },
            json: true,
            method: 'POST'
        }, function (err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ res.body);
                return;
            }
            console.log("got response from CT");
            var response = JSON.parse(JSON.stringify(body));
            callBackHandler(response, data);
        });
    }
}

module.exports = new Services();