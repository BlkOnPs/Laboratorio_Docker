#COSTRUZIONE IMMAGINE
FROM node:22

WORKDIR /app

COPY package*.json ./
#Si copiano i files in /app (package.json, package-lock.json),
#per sfruttare la cache di Docker

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]