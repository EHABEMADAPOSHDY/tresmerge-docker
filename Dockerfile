FROM node:16 AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start_dev"]



FROM node:16 AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
