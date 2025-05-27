FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY backend/package.json backend/package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY backend/ /app/

# Expose port
EXPOSE 5000

# Command to run the app
CMD ["node", "app.js"]
