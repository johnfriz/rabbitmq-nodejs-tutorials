#!/usr/bin/env node

var amqp = require('amqp');

console.log('Starting to connect to Rabbit MQ...');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR }, {reconnect:false});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready for use. Connecting to "logs" exchange...');

  connection.exchange('logs', {type: 'fanout', autoDelete: false}, function(exchange){
    console.log('The "logs" exchange is now ready for use. Publishing message...');

    var message = 'hello world @ ' + new Date();
    exchange.publish('', message);

    console.log('Published message: "' + message + '"');
    // Allow 1 second for the message publishing to complete
    setTimeout(function() {

      console.log('Disconnecting...');

      connection.disconnect();

      console.log('Disconnected. Exiting...');
    }, 200);
  });
});
