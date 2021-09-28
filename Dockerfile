FROM node:16.1.0-alpine3.13

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

# Install Project Dependencies
COPY package.json package-lock.json /usr/app/
RUN npm ci

COPY . /usr/app

CMD ["npm", "start"]
