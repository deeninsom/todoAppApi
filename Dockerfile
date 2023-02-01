FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
# RUN npx sequelize init
# RUN npx sequelize db:migrate

COPY . .

EXPOSE 3030

CMD [ "npm", "start" ]

