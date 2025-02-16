## Build Stage
#FROM node:18-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#ENV VITE_API_BASE_URL ""
#RUN npm run build
#
## Production Stage
#FROM nginx:stable-alpine AS production
#COPY --from=build /app/dist /usr/share/nginx/html/ui
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_BASE_URL ""
EXPOSE 5173
