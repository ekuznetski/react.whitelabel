FROM node:10.16.0-alpine

RUN npm config set unsafe-perm true
RUN npm install -g pm2
RUN mkdir -p /app 
WORKDIR /app/server/dist/
CMD pm2-runtime /app/server/dist/pm2_services.json
