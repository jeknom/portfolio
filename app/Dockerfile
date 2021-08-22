FROM node:14.17.4-alpine

RUN mkdir /opt/portfolio

WORKDIR /opt/portfolio

COPY . .

RUN npm install
RUN npx prisma generate
RUN npx next build

EXPOSE 3000/tcp

ENV ENVIRONMENT ${ENVIRONMENT}
ENV DATABASE_URL ${DATABASE_URL}
ENV SSL_CERT_KEY_FILENAME ${SSL_CERT_KEY_FILENAME}
ENV SSL_CERT_FILENAME ${SSL_CERT_FILENAME}
ENV SSL_CERT_BUNDLE_FILENAME ${SSL_CERT_BUNDLE_FILENAME}

CMD npx prisma generate && \
  if [ "$ENVIRONMENT" = "production" ] ; \
  then npm run start ; \
  else npm run dev ; \
  fi