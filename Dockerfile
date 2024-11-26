FROM node:16-alpine
WORKDIR /receipt-processor-challenge
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["nodemon", "-L", "build/index.js"]