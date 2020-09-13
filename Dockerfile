FROM ubuntu:18.04

# Install base Ubuntu utils
RUN \
  apt-get clean && \
  apt-get update && \
  apt-get -y upgrade
RUN \
  apt-get install -y byobu curl git htop man unzip vim wget sudo

RUN adduser --disabled-password --gecos '' tower

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get install -y nodejs

RUN mkdir home/node && cd home/node
RUN ls -la

WORKDIR node

RUN ls -la


ADD server/ server/
ADD public/ public/
ADD src/ src/
ADD vk-hosting-config.json vk-hosting-config.json
ADD package.json package.json
ADD webpack.config.js webpack.config.js

RUN sudo chmod -R 777 /home/node
RUN npm install

RUN chown -R tower:tower /home/node
USER tower


EXPOSE 8000

CMD ["npm", "run", "start-back"]

