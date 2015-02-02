var amqp = require('amqp');

var routingKeys = process.argv.slice(2);
if (routingKeys.length < 1) {
  console.error('Please provide one or more routing keys.');
  return process.exit(1);
}

console.log('Starting to connect to Rabbit MQ...');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR }, {reconnect:false});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready for use. Connecting to "logs" exchange...');

  connection.exchange('topic_logs', {type: 'topic', autoDelete: false}, function(exchange){

    console.log('The "topic_logs" exchange is now ready for use.');

    connection.queue('', function(q){
      console.log('Connected to new queue. Waiting for queue to become ready');

      for(var i = 0; i < routingKeys.length; i++) {
        var routingKey = routingKeys[i];
        q.bind('topic_logs', routingKey);
      }

      q.on('queueBindOk', function() {
        console.log('The queue is now ready for use. Subscribing for messages (Ctrl+c to disconnect)...');

        // Receive messages
        q.subscribe(function (message) {
          console.log('Received message... ');
          // Print messages to stdout
          var buf = new Buffer(message.data);
          console.log(buf.toString('utf-8'));
        });
      });
    });
  });
});
