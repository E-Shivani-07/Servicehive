FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
ENV npm_config_unsafe_perm=true
RUN npm ci

COPY . .

RUN chmod +x ./node_modules/.bin/* || true
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
