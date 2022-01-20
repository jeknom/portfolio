FROM node:16-alpine3.14 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /portfolio
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine3.14 AS builder

WORKDIR /portfolio
COPY . .
COPY --from=deps /portfolio/node_modules ./node_modules
ARG DATABASE_URL ${DATABASE_URL}
RUN npm install && \
  npx prisma generate

FROM node:16-alpine3.14 AS runner

WORKDIR /portfolio

ENV ENVIRONMENT ${ENVIRONMENT}
ENV DATABASE_URL ${DATABASE_URL}
ENV NEXTAUTH_URL: ${NEXTAUTH_URL}
ENV AUTH_CLIENT_ID: ${AUTH_CLIENT_ID}
ENV AUTH_CLIENT_SECRET: ${AUTH_CLIENT_SECRET}

RUN addgroup -g 1001 -S nodejs && \
  adduser -S portfolio -u 1001

COPY --from=builder --chown=portfolio:nodejs /portfolio/* .

USER portfolio

EXPOSE 3000/tcp

CMD npm run dev