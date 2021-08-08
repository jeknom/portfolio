FROM node:14.17.4-alpine

RUN mkdir /opt/portfolio

WORKDIR /opt/portfolio

COPY . .

RUN npm install && npm run build

EXPOSE 3000/tcp

ENV ENVRIONMENT ${ENVIRONMENT}
ENV MYSQL_DATABASE ${MYSQL_DATABASE}
ENV MYSQL_ROOT_PASSWORD ${MYSQL_ROOT_PASSWORD}
ENV MYSQL_USER ${MYSQL_USER}
ENV MYSQL_PASSWORD ${MYSQL_PASSWORD}

CMD if [ "$ENVRIONMENT" = "production" ] ; then npm run start ; else npm run dev ; fi