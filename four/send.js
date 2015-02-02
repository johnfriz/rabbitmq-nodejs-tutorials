#!/usr/bin/env node
var amqp = require('amqp');

if( process.argv.length < 3) {
    console.error('Please provide a routing key (i.e. a "log level" for the message');
    return process.exit(1);
}

console.log('Starting to connect to Rabbit MQ...');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR }, {reconnect:false});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready for use. Connecting to "logs" exchange...');

  connection.exchange('direct_logs', {type: 'direct', autoDelete: false}, function(exchange){
    var routingKey = process.argv[2];

    console.log('The "direct_logs" exchange is now ready for use. Publishing message with routing key "' + routingKey + '"...');

    var message = routingKey + ' @ ' + new Date();
    exchange.publish(routingKey, message);

    console.log('Published messgae: "' + message + '"');
    // Allow 1 second for the message publishing to complete
    setTimeout(function() {

      console.log('Published "hello world" message to exchange. Disconnecting...');

      connection.disconnect();

      console.log('Disconnected. Exiting...');
    }, 200);
  });
});
