FROM node:10.16.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

CMD ["npm", "start"]

