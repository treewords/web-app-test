# base image
FROM node:18-alpine

# create & set working directory
WORKDIR /app

# copy dependency files
COPY package*.json ./

# install dependencies
RUN npm install

# copy source files
COPY . .

# build app
RUN npm run build

# serve app
FROM nginx:1.23-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
