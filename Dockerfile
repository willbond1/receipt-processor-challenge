FROM node:16-alpine
WORKDIR /receipt-processor-challenge
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "build/index.js"]