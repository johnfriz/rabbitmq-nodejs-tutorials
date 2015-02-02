# Tutorial One

The first Rabbit MQ tutorial is a simple producer / consumer example - http://www.rabbitmq.com/tutorials/tutorial-one-python.html

# Running the example

## 1. Install the required dependencies

    npm install .


## 2. Start the consumer process

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js

To end the consumer process, press Ctrl+C

## 3. Start the producer process

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js

The producer process will exit as soon as it has put a message on the queue.
