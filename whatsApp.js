const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    let resData = {
        status: true,
        message: 'Hello Everyone from Code 180. This API is working...'
    };
    return res.status(200).json(resData);
});

app.get('/sendMessage', (req, res) => {
    let resData = {
        status: false,
        answare: ''
    };
    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v18.0/277207345475405/messages',
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: process.env.TO,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: {
                        code: 'en_US'
                    }
                }
            },
            json: true
        };
        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answare = e;
        return res.status(200).json(resData);
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});
