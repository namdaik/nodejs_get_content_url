const express = require('express');
const app = express();
const http = require('http'),
https = require('https');
var url = require('url');

app.get('/', async (req, res) => {
	if(req.query.url) {
		var data =  await getScript(req.query.url); 
  		res.send(data);
	} else {
		res.send(200);
	}
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

const getScript = (url) => {
    return new Promise((resolve, reject) => {
        let client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }
        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};
