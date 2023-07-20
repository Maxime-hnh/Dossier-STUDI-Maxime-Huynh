FROM node:16.15

RUN apt-get update && apt-get install -y rsync

WORKDIR /app
COPY . .
RUN rm -rf server/build && mkdir -p server/build

# prepare server app
WORKDIR /app/server
RUN npm install


# prepare client app
WORKDIR /app/client
RUN npm install
RUN npm run build 
RUN rsync -rvlptzEog build/ ../server/build/ 


# run server
ENV TZ Europe/Paris
WORKDIR /app/server
EXPOSE 8000
CMD [ "npm","run", "start-server" ]
 