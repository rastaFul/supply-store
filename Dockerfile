FROM node:current-alpine3.12

WORKDIR /src

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]