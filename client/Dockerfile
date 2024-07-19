FROM node:20.12.2-alpine3.19 AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20.12.2-alpine3.19 AS builder
WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG NEXT_PUBLIC_BACKEND_API_URL
ENV NEXT_PUBLIC_BACKEND_API_URL $NEXT_PUBLIC_BACKEND_API_URL
COPY package*.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.12.2-alpine3.19 AS production
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/build ./build
RUN npm ci --production
EXPOSE 3000
CMD [ "npm", "run", "start" ]
