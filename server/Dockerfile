FROM node:20.12.2-alpine3.19 AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20.12.2-alpine3.19 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.12.2-alpine3.19 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm ci --production
EXPOSE 5001
CMD [ "npm", "run", "start" ]
