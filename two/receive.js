var amqp = require('amqp');

var connection = amqp.createConnection({ host: process.env.RABBITMQ_PORT_5672_TCP_ADDR });

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('ready handler fired');

  // Use the default 'amq.topic' exchange
  connection.queue('task_queue', { autoDelete: false, durable: true }, function(q){
      // Catch all messages
      q.bind('#');

      console.log('[n] Waiting for messages. To exit press CTRL+C');

      // Receive messages
      q.subscribe({ ack: true, prefetchCount: 1 }, function (message) {
        // Print messages to stdout
        var buf = new Buffer(message.data);
        var msg = buf.toString('utf-8');
        console.log('[n] Received \'' + msg + '\'');
        var pause = (msg.match(/\./g)||[]).length
        setTimeout(function() {
          console.log('[n] Done');
          q.shift();
        }, (pause * 1000));

      });
  });
});
