# Tutorial Four

The fourth Rabbit MQ tutorial uses a direct exchange and multiple queues bound on different routing keys - http://www.rabbitmq.com/tutorials/tutorial-four-python.html

In this example, the producer will send messages with different routing keys to represent log levels - debug, info and error. The consumers can subscribe for which ever routing keys they want

# Running the example

## 1. Install the required dependancies

    npm install .


## 2. Start the first consumer process

  The first consumer is going to listen for just error logs

  In a terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js error

To end the consumer process, press Ctrl+C.

## 3. Start the second consumer process

  The second consumer is going to listen for all log levels

  In a different terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js debug info error

To end the consumer process, press Ctrl+C


## 4. Start the producer process

  We can use the producer to send different log level messages - these are actually routing keys in RabbitMQ.

  In a third terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js debug

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js info

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js warn

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js error

Note that the 3rd message sent - with the warn "log level" did not get displayed on either of the consumer because the warn routing key was not bound to any of the consumers. This message simple got dropped as there was no queue to put it on.
