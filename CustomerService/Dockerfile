FROM node:16

COPY . /app

# Working directory of the application
WORKDIR /app

# Copying over the required dependencies configuration. Usage of the wildcard (*) ensures that we copy over both
# package.json and package-lock.json where available
# Installing application dependencies
RUN npm install

# Bundle app source

CMD ["npm", "start"]
