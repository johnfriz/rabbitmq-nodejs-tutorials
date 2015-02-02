# Tutorial Five

The fifth Rabbit MQ tutorial uses a topic exchange and multiple queues bound on different routing key topics - http://www.rabbitmq.com/tutorials/tutorial-five-python.html

In this example, the producer will send messages with different routing keys to represent components - e.g. cron, kern, curl - and different log levels - debug, info and error. The consumers can subscribe for which ever routing keys they want

# Running the example

## 1. Install the required dependencies

    npm install .


## 2. Start the first consumer process

  The first consumer is going to listen for all messages

  In a terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js '#'

To end the consumer process, press Ctrl+C.

## 3. Start the second consumer process

  The second consumer is going to listen for all log levels for the cron component

  In a different terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js cron.*

To end the consumer process, press Ctrl+C


## 4. Start the third consumer process

  The third consumer is going to listen for all error messages and all debug for the curl component

  In a different terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js *.error curl.debug

To end the consumer process, press Ctrl+C


## 5. Start the producer process

  We can use the producer to send different log level messages - these are actually routing keys in RabbitMQ.

  In a third terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js cron.info

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js cron.error

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js foo.error

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js curl.warn

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js curl.debug

Note that the 4th message sent - curl.warn - only got displayed on the first consumer (the one matching all messages). Neither of the other two consumers patterns match curl.warn
