# Initiate a container to build the application in.
FROM node:16.17.1 as base
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY package*.json ./

# Install the dependencies required to build the application.
RUN yarn install

# Copy the application source into the container.
COPY . .

# Build the application.
RUN yarn run build

# Uninstall the dependencies not required to run the built application.
RUN yarn prune --production

# Initiate a new container to run the application in.
FROM node:16.17.1
  ENV NODE_ENV=production
WORKDIR /app

# Copy everything required to run the built application into the new container.
COPY package.json .
COPY yarn.lock .

# Expose the web server's port.
EXPOSE 8000

# Run the application.
ENTRYPOINT yarn run start
