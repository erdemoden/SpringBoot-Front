# Use the official Node.js base image
FROM node:14.16.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the app source code
COPY . .

# Build the app
RUN npm run build

# Set the Node.js environment to production
ENV NODE_ENV production

# Install production dependencies only
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
