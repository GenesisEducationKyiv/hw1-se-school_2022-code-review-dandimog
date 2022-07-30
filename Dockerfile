FROM node:16.16.0-alpine
WORKDIR /Bitcoin
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "Crypto.js"]