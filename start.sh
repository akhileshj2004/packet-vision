#!/bin/bash

echo "🚀 Building and starting Packet Vision application..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Build and start services
docker-compose up --build -d

echo "✅ Application started successfully!"
echo ""
echo "📱 Frontend: http://localhost"
echo "🔗 Backend API: http://localhost:5001"
echo "❤️ Health Check: http://localhost/health"
echo ""
echo "📊 To view logs:"
echo "   Backend: docker-compose logs -f backend"
echo "   Frontend: docker-compose logs -f frontend"
echo ""
echo "🛑 To stop: docker-compose down"
