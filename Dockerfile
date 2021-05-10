FROM node:16.1.0-alpine3.13

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH
ENV PYTHONUNBUFFERED=1

# Install Build Tools
RUN apk add --update --no-cache build-base && \
    apk add --update --no-cache python3 && \
    ln -sf python3 /usr/bin/python && \ 
    python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools

# Install Project Dependencies
COPY package.json package-lock.json /usr/app/
RUN npm ci

COPY . /usr/app

CMD ["npm", "start"]
