FROM node:6-onbuild

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#install dependencies
COPY package.json /usr/src/app
RUN npm install

RUN mkdir -p /dist/node_modules
RUN cp -r node_modules/* /dist/node_modules/
ENV NODE_PATH /dist/node_modules

# bundle source
COPY . /usr/src/app


EXPOSE 3000
CMD ["npm", "start"]
