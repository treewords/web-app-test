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

# build typescript
RUN npm run build

# expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
