'use strict';
const fileservice = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
  throw Error('No file specified');
}

net.createServer(connection => {
  console.log('Subscriber connected');
  const message = JSON.stringify({ 'type':'watching', 'file': filename });
  connection.write(`${message}\n`);

  const fsmessage = JSON.stringify({ 'type': 'changed', 'timestamp': Date.now() });
  const watcher = fileservice.watch(filename, 
    () => connection.write(`${fsmessage}\n`));

  connection.on('close', () =>{
    console.log('Subscriber disconnected');
    watcher.close()
  });
}).listen(60300, () => console.log('Listening for subscribers'));
