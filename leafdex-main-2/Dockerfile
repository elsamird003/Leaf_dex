FROM node:22
WORKDIR /app
COPY leafDex_Web/package.json ./
RUN npm install

COPY leafDex_Web/ .

ENV PORT=3000

CMD ["npm", "run", "dev"]