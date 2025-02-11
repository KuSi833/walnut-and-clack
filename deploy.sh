#!/bin/bash

set -e  # Exit on any error

# Ensure the .env file exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    exit 1
fi

# Copy necessary files
echo "Copying files to server..."
ssh phantom "mkdir -p ~/walnut-and-clack"
rsync -av --exclude 'node_modules' --exclude '.git' --exclude '.next' ./ phantom:~/walnut-and-clack/

# Deploy
echo "Deploying application..."
ssh phantom << 'ENDSSH'
set -e  # Exit on any error
cd ~/walnut-and-clack
docker-compose pull || true
docker-compose down

# Build and check for errors
if ! docker-compose up -d --build; then
    echo "Error: Deployment failed!"
    exit 1
fi
ENDSSH

if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Deployment failed!"
    exit 1
fi 