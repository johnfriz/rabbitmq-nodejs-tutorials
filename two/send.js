#!/usr/bin/env node

var amqp = require('amqp');

console.log('Starting to connect to Rabbit MQ...');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR }, {reconnect:false});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready for use. Connecting to "task_queue" queue...');

	connection.queue('task_queue', { autoDelete: false, durable: true }, function(q){
    console.log('Connected to "task_queue" queue. Waiting for queue to become ready');

    // Catch all messages
    q.bind('#');

    q.on('queueBindOk', function() {
      console.log('The "task_queue" queue is now ready for use. Publishing message...');

      var msg = new Date() + (process.argv.slice(2).join(' ') || 'Hello World') + '';
      connection.publish('task_queue', msg);

      console.log('Published messgae: "' + msg + '"');
      // Allow 1 second for the message publishing to complete
      setTimeout(function() {

        console.log('Published message. Disconnecting...');

        connection.disconnect();

        console.log('Disconnected. Exiting...');
      }, 1000);
    });
  });
});
