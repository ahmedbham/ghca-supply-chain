FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

# Set default environment variables
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]