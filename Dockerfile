FROM node:20-alpine

WORKDIR /app

# Instala dependencias primero (mejor cache)
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

EXPOSE 8080

# Dev mode (usa tu script start:dev)
CMD ["npm", "run", "start:dev"]
