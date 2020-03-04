FROM node:alpine

EXPOSE 8080

WORKDIR ./home

COPY . ./

RUN npm install
RUN npm install node-sass

CMD npm run dev