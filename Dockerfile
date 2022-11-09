FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json /usr/app
RUN npm i
COPY . .
EXPOSE 5001
CMD ["node","index.js"]