FROM 'node:lts'

WORKDIR /microservices/customer-api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD npm run dev
