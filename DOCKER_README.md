# Packet Vision - Docker Deployment

## 🐳 Docker Setup

This application is fully dockerized for easy deployment and distribution.

### Prerequisites

- Docker Desktop installed
- Docker Compose installed
- At least 4GB RAM available
- Ports 80, 5001, and 6379 available

### Quick Start

#### Windows
```bash
./start.bat
```

#### Linux/macOS
```bash
chmod +x start.sh
./start.sh
```

#### Manual Start
```bash
# Create logs directory
mkdir -p logs

# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f backend
```

### Access Points

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost/health
- **API Documentation**: http://localhost:5001/predict

### Services

1. **Backend** (Flask API)
   - Port: 5001
   - Health checks enabled
   - Auto-restart on failure

2. **Frontend** (Nginx)
   - Port: 80
   - Serves static files
   - Proxies API requests

3. **Redis** (Cache)
   - Port: 6379
   - Optional caching layer

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild specific service
docker-compose up --build [service-name]

# Scale backend
docker-compose up --scale backend=3 -d

# Remove all containers and volumes
docker-compose down -v

# Clean up images
docker system prune -a
```

### Environment Configuration

Edit `.env` file for custom configuration:

```env
FLASK_ENV=production
FLASK_DEBUG=False
FLASK_RUN_PORT=5001
SECRET_KEY=your-secret-key
```

### Troubleshooting

#### Port Conflicts
```bash
# Check what's using port 80
netstat -ano | findstr :80

# Use different port
docker-compose up -d --scale frontend=0
```

#### Container Health Issues
```bash
# Check container status
docker-compose ps

# View container logs
docker-compose logs backend

# Restart unhealthy containers
docker-compose restart backend
```

#### Memory Issues
```bash
# Check Docker memory usage
docker stats

# Increase Docker Desktop memory limit
# Docker Desktop > Settings > Resources > Memory
```

### Production Deployment

For production deployment:

1. Change `SECRET_KEY` in `.env`
2. Set `FLASK_ENV=production`
3. Configure SSL certificates
4. Set up proper logging
5. Configure firewall rules

### Performance Optimization

- Increase Docker memory allocation
- Use production WSGI server (Gunicorn)
- Enable Redis caching
- Configure load balancing

### Security Features

- Rate limiting enabled
- CORS properly configured
- Security headers added
- Input validation implemented
- Health checks monitoring

### Monitoring

```bash
# Monitor container health
docker-compose ps

# View real-time logs
docker-compose logs -f --tail=100

# Check resource usage
docker stats packet-vision-backend packet-vision-frontend
```
