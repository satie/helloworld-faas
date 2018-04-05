"use strict"
const http = require('http');

module.exports = (context, callback) => {    
    world().then((name) => {
        hello(name).then((data) => {
            callback(undefined, data);
        });
    });    
}

const hello = (name) => {
    return new Promise(function(resolve, reject) {
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/function/hello',
            method: 'POST',
            headers: {
                'Content-Type': 'text/data',
                'Content-Length': Buffer.byteLength(name)
            }
        };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                resolve(body);
            }); 
        });
        req.on('error', (e) => {
            reject(e);
        });

        req.write(name);
        req.end();
    });
};

const world  = () => {
    return new Promise(function(resolve, reject) {
        http.get('http://localhost:8080/function/world', res => {
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {            
                resolve(body);
            });
        });
    }); 
};
