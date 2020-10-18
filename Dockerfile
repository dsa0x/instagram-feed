# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:12.13.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY . ./
RUN npm ci --quiet && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:12.13.0-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://daredev:Laykay66%40!@cluster0-8liuy.mongodb.net/esocialpanel?retryWrites=true&w=majority
ENV PORT=3003

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build

CMD ["node", "/app/build/index.js"]