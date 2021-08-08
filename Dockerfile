FROM node:14.17.4-alpine

ARG ENV

RUN mkdir /opt/portfolio

WORKDIR /opt/portfolio

RUN npm install && npm run build

ENV ENVRIONMENT ${ENV}

EXPOSE 3000/tcp

CMD if [ "$ENV" = "production" ] ; then npm run start ; else npm run dev ; fi