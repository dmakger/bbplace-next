FROM node:lts as dependencies
WORKDIR /app
#COPY package.json yarn.lock ./  
COPY package.json ./
RUN yarn install --mode update-lockfile
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# Билд config'a
COPY --from=builder /app/next.config.js ./next.config.js 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]
