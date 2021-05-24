# base image
FROM node:14

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY . .
RUN npm install

# start app
CMD ["npm", "start"]

# docker build -t docker-react .
# docker run -d -p 3000:3000 docker-react