FROM node:20-alpine

RUN npm install -g create-react-app
RUN npm install -g vite@4.4.6

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npx", "vite"]
