#!/usr/bin/env python3
"""
TrackIt Web App Deployment Script
This script provides multiple deployment options for the TrackIt application.
"""

import os
import subprocess
import sys
import threading
import time
from pathlib import Path

class TrackItDeployer:
    def __init__(self):
        self.root_dir = Path(__file__).parent
        self.backend_dir = self.root_dir / "trackit-backend"
        self.frontend_dir = self.root_dir / "trackit-clean"
        
    def install_dependencies(self):
        """Install all dependencies for both backend and frontend"""
        print("🔧 Installing dependencies...")
        
        # Backend dependencies
        print("Installing Python dependencies...")
        subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", 
            str(self.backend_dir / "requirements.txt")
        ], check=True)
        
        # Frontend dependencies
        print("Installing Node.js dependencies...")
        subprocess.run([
            "npm", "install"
        ], cwd=self.frontend_dir, check=True)
        
        print("✅ Dependencies installed successfully!")
    
    def start_backend(self):
        """Start the Flask backend server"""
        print("🚀 Starting backend server...")
        os.chdir(self.backend_dir)
        
        # Set environment variables
        env = os.environ.copy()
        env['FLASK_ENV'] = 'development'
        env['FLASK_DEBUG'] = '1'
        
        # Start Flask server
        subprocess.Popen([
            sys.executable, "app.py"
        ], env=env)
        
        print("✅ Backend server started at http://localhost:5000")
        
    def start_frontend(self):
        """Start the React frontend server"""
        print("🚀 Starting frontend server...")
        
        # Start React dev server
        subprocess.Popen([
            "npm", "start"
        ], cwd=self.frontend_dir)
        
        print("✅ Frontend server started at http://localhost:3000")
        
    def build_frontend(self):
        """Build the React frontend for production"""
        print("🏗️  Building frontend for production...")
        
        subprocess.run([
            "npm", "run", "build"
        ], cwd=self.frontend_dir, check=True)
        
        print("✅ Frontend built successfully!")
        
    def dev_deploy(self):
        """Deploy for development with hot reload"""
        print("🔥 Starting development deployment...")
        
        # Start backend in background
        backend_thread = threading.Thread(target=self.start_backend)
        backend_thread.daemon = True
        backend_thread.start()
        
        # Wait a bit for backend to start
        time.sleep(2)
        
        # Start frontend in background
        frontend_thread = threading.Thread(target=self.start_frontend)
        frontend_thread.daemon = True
        frontend_thread.start()
        
        print("\n🎉 Development servers started!")
        print("Frontend: http://localhost:3000")
        print("Backend API: http://localhost:5000")
        print("\nPress Ctrl+C to stop servers...")
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Stopping servers...")
            
    def prod_deploy(self):
        """Deploy for production"""
        print("📦 Starting production deployment...")
        
        # Build frontend
        self.build_frontend()
        
        # Start backend in production mode
        os.chdir(self.backend_dir)
        env = os.environ.copy()
        env['FLASK_ENV'] = 'production'
        env['FLASK_DEBUG'] = '0'
        
        subprocess.run([
            sys.executable, "app.py"
        ], env=env)

def main():
    deployer = TrackItDeployer()
    
    if len(sys.argv) < 2:
        print("Usage: python deploy.py [dev|prod|install|build]")
        print("  dev     - Start development servers")
        print("  prod    - Start production server")
        print("  install - Install dependencies")
        print("  build   - Build frontend")
        return
    
    command = sys.argv[1]
    
    if command == "install":
        deployer.install_dependencies()
    elif command == "build":
        deployer.build_frontend()
    elif command == "dev":
        deployer.dev_deploy()
    elif command == "prod":
        deployer.prod_deploy()
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()