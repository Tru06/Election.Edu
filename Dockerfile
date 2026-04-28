# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including serve for static files
RUN npm install --omit=dev && npm install -g serve

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port for Cloud Run
EXPOSE 8080

# Set environment variable for port
ENV PORT=8080
ENV HOST=0.0.0.0

# Start the application with dynamic port
CMD ["sh", "-c", "serve -s build -l $PORT"]
