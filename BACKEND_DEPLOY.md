# Backend Deployment Guide

## Option 1: Railway (Recommended)
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select `trackit-backend` folder
7. Set environment variables:
   - `SECRET_KEY`: supersecret123
   - `PORT`: 5000

## Option 2: Render.com (Alternative)
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - **Name**: trackit-backend
   - **Root Directory**: trackit-backend
   - **Runtime**: Python 3
   - **Build Command**: pip install -r requirements.txt
   - **Start Command**: python app.py
6. Environment Variables:
   - `SECRET_KEY`: supersecret123

## Option 3: Heroku
```bash
cd trackit-backend
heroku create trackit-backend-[your-name]
heroku config:set SECRET_KEY=supersecret123
git add .
git commit -m "Deploy backend"
git push heroku main
```

## After Backend Deployment
1. Get your backend URL (e.g., https://trackit-backend-xxx.railway.app)
2. Update frontend config.js with the new URL
3. Redeploy frontend to Vercel

## Current Status
✅ Frontend: https://trackit-clean.vercel.app
⏳ Backend: Need to deploy