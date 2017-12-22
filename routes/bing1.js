var express = require('express');
var router = express.Router();



'use strict';

let https = require('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.
let subscriptionKey = '7e422f09725041e9b77cd63ce6c5e26e';

// Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
// search APIs.  In the future, regional endpoints may be available.  If you
// encounter unexpected authorization errors, double-check this host against
// the endpoint for your Bing Web search instance in your Azure dashboard.
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/search';


router.post('/', function (req, res, next) {
    let term = req.body.search;

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            console.log('\nRelevant Headers:\n');
            for (var header in response.headers)
                // header keys are lower-cased by Node.js
                if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                    console.log(header + ": " + response.headers[header]);
            var parsedBody = JSON.parse(body);
            body = JSON.stringify(parsedBody, null, '  ');
            var urls = parsedBody.webPages.value.map(function(item){
                return item.url;
            })


            res.send(urls);
           // console.log(body);
            console.log(req.body.search);
            console.log(urls);


        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };

    let bing_web_search = function (search) {
        console.log('Searching the Web for: ' + term);
        let request_params = {
            method: 'GET',
            hostname: host,
            path: path + '?q=' + encodeURIComponent(search),
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
            }
        };

        let req = https.request(request_params, response_handler);
        req.end();
    }

    if (subscriptionKey.length === 32) {
        bing_web_search(term);
    } else {
        console.log('Invalid Bing Search API subscription key!');
        console.log('Please paste yours into the source code.');
    }

});

module.exports = router;
