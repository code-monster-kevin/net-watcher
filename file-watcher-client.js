'use strict';
const net = require('net');
const client = net.connect({ port: '60300' });
const ldj_client = require('./lib/ldj-client.js').connect(client);

ldj_client.on('message', message => {
  if (message.type === 'watching') {
    console.log(`Now watching ${message.file}`);
  } 
  else if (message.type === 'changed') {
    const filedate = new Date(message.timestamp);
    console.log(`File changed: ${filedate}`);
  } 
  else {
    throw Error(`Unrecognized message type: ${message.type}`);
  }
});