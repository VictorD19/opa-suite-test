FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL_BASE
ENV NEXT_PUBLIC_API_URL_BASE=$NEXT_PUBLIC_API_URL_BASE

RUN npm run build

CMD ["npm", "start"]
