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

# Create a temporary script for remote execution
REMOTE_SCRIPT=$(cat << 'EOF'
cd ~/walnut-and-clack
docker-compose pull || true
docker-compose down
if ! docker-compose up -d --build; then
    echo "Error: Deployment failed!"
    exit 1
fi
EOF
)

# Deploy
echo "Deploying application..."
if echo "$REMOTE_SCRIPT" | ssh phantom 'bash -s'; then
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Deployment failed!"
    exit 1
fi 