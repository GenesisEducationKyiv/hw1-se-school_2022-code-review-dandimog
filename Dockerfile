FROM node:16.16.0-alpine
WORKDIR /Bitcoin
COPY package.json .
COPY tsconfig.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "app.js"]