# Use an official Node runtime as a base image
FROM oven/bun

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the local code to the container
COPY . .

# Expose the port that Nuxt will run on
EXPOSE 3000

# Command to run your application
CMD ["bun", "run", "dev"]
