# Base image
FROM node:current-slim
# Create app directory
WORKDIR /app

EXPOSE 8005
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .
COPY yarn.lock .

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

