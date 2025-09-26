# 1. Use an official Node.js LTS base image
FROM node:18-alpine

# 2. Set working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --only=production

# 5. Copy the rest of your application code
COPY . .

# 6. Expose the port your app runs on (Express default 3000)
EXPOSE 3001

# 7. Define the command to run your app
CMD [ "node", "server.js" ]
