# TrackIt Web App Deployment Guide

This guide provides multiple deployment options for the TrackIt CO2 tracking application.

## 🏗️ Application Architecture

- **Backend**: Flask API with JWT authentication (Port 5000)
- **Frontend**: React application (Port 3000 in dev, 80 in prod)
- **Database**: JSON file storage (co2_data.json)

## 🚀 Deployment Options

### Option 1: Local Development (Recommended for testing)

1. **Install dependencies**:
   ```bash
   python deploy.py install
   ```

2. **Start development servers**:
   ```bash
   python deploy.py dev
   ```

   This will start:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

3. **Access the application**:
   - Open http://localhost:3000 in your browser
   - Login with: username: `admin`, password: `1234`

### Option 2: Production Deployment with Docker

1. **Build and start containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

3. **Stop containers**:
   ```bash
   docker-compose down
   ```

### Option 3: Manual Production Setup

1. **Build frontend**:
   ```bash
   cd trackit-clean
   npm run build
   ```

2. **Start backend**:
   ```bash
   cd trackit-backend
   python app.py
   ```

3. **Serve frontend** (using a web server like nginx or serve):
   ```bash
   npx serve -s trackit-clean/build -p 3000
   ```

## 🌐 Cloud Deployment Options

### Heroku Deployment

1. **Create Heroku apps**:
   ```bash
   heroku create trackit-api --buildpack heroku/python
   heroku create trackit-web --buildpack heroku/nodejs
   ```

2. **Deploy backend**:
   ```bash
   cd trackit-backend
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a trackit-api
   git push heroku main
   ```

3. **Deploy frontend**:
   ```bash
   cd trackit-clean
   # Update API_URL in your React app to point to Heroku backend
   npm run build
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a trackit-web
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create app.yaml**:
   ```yaml
   name: trackit-app
   services:
   - name: api
     source_dir: trackit-backend
     github:
       repo: your-repo
       branch: main
     run_command: python app.py
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
     
   - name: web
     source_dir: trackit-clean
     github:
       repo: your-repo
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

### AWS EC2 Deployment

1. **Launch EC2 instance** (Ubuntu 22.04)
2. **Install Docker**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   ```
3. **Clone repository and deploy**:
   ```bash
   git clone <your-repo>
   cd trackit-app
   sudo docker-compose up -d
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-super-secret-key-here
FLASK_ENV=production
FLASK_DEBUG=0
DATABASE_URL=your-database-url-if-using-db
```

### Frontend Configuration

Update `trackit-clean/src/config.js`:

```javascript
const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com'
    : 'http://localhost:5000'
};

export default config;
```

## 🔐 Security Considerations

1. **Change default credentials** in production
2. **Use environment variables** for secrets
3. **Enable HTTPS** for production
4. **Implement rate limiting**
5. **Add input validation**
6. **Use a proper database** for production

## 📊 Monitoring

- **Logs**: Check application logs for errors
- **Health checks**: Implement `/health` endpoints
- **Metrics**: Monitor CPU, memory, and response times

## 🛠️ Troubleshooting

### Common Issues

1. **CORS errors**: Check flask-cors configuration
2. **Authentication fails**: Verify JWT secret key
3. **Frontend can't connect**: Check API URL configuration
4. **File permissions**: Ensure write access to data directory

### Debug Commands

```bash
# Check backend logs
python deploy.py dev

# Check frontend build
cd trackit-clean && npm run build

# Test API endpoints
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'
```

## 🚀 Next Steps

1. **Set up CI/CD pipeline** for automated deployments
2. **Add database** (PostgreSQL, MongoDB)
3. **Implement user management**
4. **Add SSL certificates**
5. **Set up monitoring and alerting**