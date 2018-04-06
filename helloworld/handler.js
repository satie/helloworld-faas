"use strict"
const http = require('http');
const request = require('request');

module.exports = (context, callback) => {    
    request.get('http://gateway:8080/function/world').pipe(request.post('http://gateway:8080/function/hello', (e, r, b) => {
        callback(undefined, b);
    }));    
}