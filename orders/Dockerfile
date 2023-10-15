FROM node

WORKDIR /app/orders

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]