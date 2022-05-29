FROM node:16-alpine 
LABEL authors="Tamim Ibn Aman"
# Create app directory
WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

#RUN cp .env.example .env

CMD ["npm","start"]