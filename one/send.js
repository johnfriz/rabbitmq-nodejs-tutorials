#!/usr/bin/env node

var amqp = require('amqp');

console.log('Starting to connect to Rabbit MQ...');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR }, {reconnect:false});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready for use. Connecting to "hello" queue...');

	connection.queue('hello', { autoDelete: false }, function(q){
    console.log('Connected to "hello" queue. Waiting for queue to become ready');
    
    // Bind to all messages
    q.bind('#');
    
    q.on('queueBindOk', function() {
      console.log('The "hello" queue is now ready for use. Publishing message...');
   
      var message = 'hello world @ ' + new Date();
			connection.publish('hello', message);

      console.log('Published messgae: "' + message + '"');
      // Allow 1 second for the message publishing to complete
      setTimeout(function() {

        console.log('Published "hello world" message. Disconnecting...');

        connection.disconnect();
   
        console.log('Disconnected. Exiting...');
      }, 1000);      
 		});
  });
});