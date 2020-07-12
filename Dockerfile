FROM alpine:3.9

ENV NODE_VERSION 12.16.3
RUN apk add yarn

WORKDIR /src

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]