# Use an official Node runtime as the base image
FROM node:18-alpine

# Install xdg-utils (includes xdg-open)
RUN apk add --no-cache xdg-utils

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "start"]