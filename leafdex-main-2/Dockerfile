# --- STAGE 1: BUILD STAGE ---
# Use a node image for the build environment (includes necessary build tools)
FROM node:22-slim AS build

WORKDIR /app

# Copy dependency files
# Inside Dockerfile.prod:
# Copies files from the source folder (relative to the build context) to the WORKDIR in the container
COPY leafDex_Web/package.json leafDex_Web/package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code (assuming build is run from directory above leafDex_Web)
COPY leafDex_Web/ .

# Run the production build command (this generates the optimized static files)
RUN npm run build

# --- STAGE 2: PRODUCTION/RUNTIME STAGE ---
# Use a minimal web server image to serve the compiled static files
FROM node:22-alpine 

# Set the working directory for the final image
WORKDIR /app

# Copy only the compiled production files and necessary dependencies
# 'FROM build' refers to the first stage
COPY --from=build /app/dist /usr/share/nginx/html 

# We will use 'serve' or 'lite-server' to serve the static content if it's a front-end app.
# If you are using Node/Express for the backend, copy your built server files instead.
# For a simple front-end: you need a static server (like Nginx or a lightweight Node server).
# Let's assume you're serving a simple front-end built to /dist:
# You must first install a lightweight static file server:
# RUN npm install -g serve

# EXPOSE port 3000 (or whatever your service listens on)
EXPOSE 3000

# Command to run the production server (e.g., serving the files)
# Replace this with the command that runs your actual backend server if you have one.
CMD ["serve", "-s", "/usr/share/nginx/html", "-l", "3000"]