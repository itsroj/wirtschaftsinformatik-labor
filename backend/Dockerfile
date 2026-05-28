FROM node:18-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Prisma
COPY prisma ./prisma
RUN npx prisma generate

# Source code
COPY src ./src

EXPOSE 5000

CMD ["npm", "start"]
