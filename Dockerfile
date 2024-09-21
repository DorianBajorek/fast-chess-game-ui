# docker build -t react-app .
# docker run -p 8000:8000 react-app

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "8000"]

EXPOSE 8000
