FROM node:16-alpine 
LABEL authors="Tamim Ibn Aman"
# update dependencies and install curl
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
# Create app directory
WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

RUN cp .env.example .env

CMD ["npm","start"]