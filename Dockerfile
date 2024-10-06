#Build stage
FROM node:lts-alpine3.20 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

#Production stage
FROM node:lts-alpine3.20 AS production

WORKDIR /app

COPY package*.json .


RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]