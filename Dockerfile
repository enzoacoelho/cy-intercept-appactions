FROM cypress/included:latest

WORKDIR /e2e

COPY package.json .
COPY package-lock.json .
COPY cypress.config.js  .
COPY cypress ./cypress

RUN npm install

CMD ["cypress", "run"]