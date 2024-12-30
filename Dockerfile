# Stage 1: Build React App
FROM node:20.16.0 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm i

# Copy all source files and build the app
COPY . .
RUN npm run build:prod

# Stage 2: Serve the React app with nginx
FROM nginx:latest

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3000

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]