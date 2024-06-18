#Node 
#Comando para crear la imagen desde la carpeta raiz del proyecto:  docker build -t reactapp .
FROM node:lts-alpine as build-stage

RUN mkdir app 

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:1.27.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]