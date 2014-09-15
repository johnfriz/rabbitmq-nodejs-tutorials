rabbitmq-nodejs-tutorials
=========================

Node.js implementation of the 6 Rabbit MQ tutorials from http://www.rabbitmq.com/getstarted.html - using docker for execution

# Setup
We will be using docker to run RabbitMQ and the node.js processes for these tutorials.

If you do not already have docker installed, check out https://docs.docker.com/ for details on what docker is and how to install it. 

## Installing Rabbit MQ
The first thing we will need to do is get Rabbit MQ itself installed. Doing this via docker is as simple as executing the following command:

    sudo docker run -d -p 5672:5672 -p 15672:15672 -v ${pwd}/rabbitmq/data/log:/data/log -v ${pwd}/rabbitmq/data/mnesia:/data/mnesia --name rabbitmq dockerfile/rabbitmq 

This will use the Rabbit MQ image from https://registry.hub.docker.com/u/dockerfile/rabbitmq/

This will pull down the Rabbit MQ image, expose the required ports, mount the data volumes (recommended for allowing you to see and access the data being stored by Rabbit MQ without the need to enter the container) and name the container (which we will need later to allow our Node.js applications to connect to the RabbitMQ container).

To view the docker admin console, navigate to http://<HOST IP ADDRESS>:15672/ - the default login is guest/guest


## Installing Node.js
Next we will need a Node.js docker image to allow us to run our Node.js applications. At the time of writing, the latest stable version of Node.js is 0.10.31, so let's use that version. If there is a later stable version you would like to use, feel free to do so, but be advised that these tutorials have only been tested against Node.js version 0.10.31

For Node.js, we will be using the following docker image: https://registry.hub.docker.com/_/node/

Each of the tutorials has a README with the exact docker commands to run, but the general syntax will be similar to the following:

    sudo docker run -it --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp --link rabbitmq:rabbitmq node:0.10.31 node your-daemon-or-script.js 

The -it parameters tell docker to run the container in interactive mode and to allocate a psudo tty session.

The --rm parameter tells docker to remove the container upon exit. This is to allow us to be able to run and re-run these Node.js applications without having to manually remove the conatiners each time.

The -v parameter tells docker to mount the current directory (identified as ${pwd} ) as the volume /usr/src/myapp - which is where the node.js image expects to find the Node source code. See https://docs.docker.com/userguide/dockervolumes/ for more details

The -w parameter tells the docker contains what working directory to use - note how this matches the volume we are mounting our source code against.

The --link parameter tells docker to make the rabbitmq container available to the Node.js container. See https://docs.docker.com/userguide/dockerlinks/ for more details

For a full list of the options available for the docker run command, execute the following:
  
    sudo docker run --help

For each tutorial we have at least one producer and one consumer so will need separate terminal sessions for each one.

At this time, we will downlaod the node.js docker images so it is available to us when we go to run our first tutorial. This is not absolutly necessary, but will significantly speed up the time taken to start the container. To do this, run the following command:

    sudo docker pull node:0.10.31


## Installing NPM
Since our Node.js source code exists outside of the docker container (and is being mounted as a volume), we will need to have npm (the Node.js package manager) installed on the same host that docker is running on. To install NPM (assuming you are using ubuntu), run the following command:

    sudo apt-get install npm