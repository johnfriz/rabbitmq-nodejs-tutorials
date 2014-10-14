# Tutorial One

The first Rabbit MQ tutorial is a simple producer / consumer example - http://www.rabbitmq.com/tutorials/tutorial-one-python.html

# Running the example

## 1. Install the required dependancies

    npm install .


## 2. Start the first consumer process

  In a terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 npm run-script receive

To end the consumer process, press Ctrl+C

## 3. Start the second consumer process

  In a different terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 npm run-script receive

To end the consumer process, press Ctrl+C


# 3. Start the producer process

  In a third terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 npm run-script send

The producer process will exit as soon as it has put a message on the queue.