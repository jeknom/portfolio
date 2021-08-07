FROM node:14.17.4-alpine

ARG ENV

RUN apk add sqlite
RUN mkdir /opt/portfolio

WORKDIR /opt/portfolio

COPY . .

RUN rm -rf node_modules && rm .env.local
RUN npm install
RUN npm run build
RUN touch portfolio.db

ENV ENVRIONMENT ${ENV}
ENV SQLITE_DATABASE_PATH /opt/portfolio/portfolio.db

EXPOSE 3000/tcp

CMD if [ "$ENV" = "production" ] ; then npm run start ; else npm run dev ; fi