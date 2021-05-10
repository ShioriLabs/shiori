FROM node:16-alpine

RUN mkdir -p /usr/bin/shiori
WORKDIR /usr/bin/shiori

ENV PATH /usr/app/shiori/node_modules/.bin:$PATH
ENV PYTHONUNBUFFERED=1

# Install Build Tools
RUN apk add --update --no-cache build-base

# Install Python Build Tools
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install Project Dependencies
COPY package.json package-lock.json /usr/bin/shiori/
RUN npm ci

COPY . /usr/bin/shiori

CMD ["npm", "start"]
