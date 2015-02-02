# Tutorial Three

The third Rabbit MQ tutorial is a simple pub / sub example which uses an exchange and multiple queues - http://www.rabbitmq.com/tutorials/tutorial-three-python.html

# Running the example

## 1. Install the required dependancies

    npm install .


## 2. Start the first consumer process

  In a terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js queue1

To end the consumer process, press Ctrl+C.

## 3. Start the second consumer process

  In a different terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js queue2

To end the consumer process, press Ctrl+C


## 4. Start the producer process

  In a third terminal window, run:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js

The producer process will exit as soon as it has put a message on the queue.

# Advanced Example

We can combine the lessons from the task queue in example two with the exchange lessons learned here.

To do this, we can start more than one instance of the consumer with the same queue name. These instances will then connect to the queue in a task worker fashion

e.g. Run each of the following commands in a different terminal window:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js queue1

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js queue2

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node receive.js queue2

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node send.js


Note that the consumer connected to queue1 gets every message because it is the only consumer on the queue, while the messages are alternated between the consumers on queue two, because they are connected in a task worker pattern.
