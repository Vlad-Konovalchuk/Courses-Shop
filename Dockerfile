FROM node:10.15.0-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

COPY . /home/app

USER node
EXPOSE 3000

CMD ["npm", "run", "start:dev"]