# Vanitha POS - Complete Setup Guide

## 📋 Prerequisites

### All Platforms
- Node.js v16+ 
- npm v8+ or yarn v3+
- Git

### Backend/Web
- PostgreSQL 12+
- Redis 6+ (optional)

### Desktop (Electron)
- Windows: Visual Studio Build Tools
- Mac: Xcode Command Line Tools (`xcode-select --install`)
- Linux: Build essentials

### iOS (React Native)
- Mac running macOS 10.15+
- Xcode 13+
- CocoaPods (`sudo gem install cocoapods`)
- Watchman (`brew install watchman`)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/jagan9812/pos-system.git
cd pos-system
npm run install:all
```

### 2. Setup PostgreSQL

```bash
creatdb pos_db
cd backend
npm run migrate
npm run seed
```

### 3. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

---

## 🖥️ Desktop App

### Development
```bash
npm run dev:desktop
```

### Build
```bash
cd desktop
npm run build:win   # Windows
npm run build:mac   # Mac  
npm run build:linux # Linux
```

---

## 🌐 Web App

### Development
```bash
npm run dev:web
```
Access at `http://localhost:3000`

### Build
```bash
npm run build:web
```

---

## 📱 iOS App

### Development
```bash
cd mobile
npm run ios
```

### Build for App Store
```bash
cd mobile
npm run build:ios
open ios/VanithaPOS.xcworkspace
# In Xcode: Product → Archive → Upload
```

---

## 🔧 Backend API

### Development
```bash
npm run dev:backend
```
API runs on `http://localhost:5000`

---

## 📚 API Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Transactions
- `GET /api/transactions` - List sales
- `POST /api/transactions` - Create transaction

### Auth
- `POST /api/auth/login` - User login

---

## 🚢 Deployment

### Backend (Heroku)
```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:standard-0
git push heroku main
```

### Web (Vercel)
```bash
npm install -g vercel
vercel --prod
```

### Web (Netlify)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=web/build
```

---

## 🐛 Troubleshooting

### iOS Pod Install Fails
```bash
rm -rf ios/Pods ios/Podfile.lock
cd ios && pod install && cd ..
```

### Database Connection Issues
```bash
psql -U postgres -d postgres -c "SELECT 1"
```

### Port Already in Use
```bash
# Kill process on port 3000 or 5000
lsof -ti:3000 | xargs kill -9
```

---

## 📄 License

MIT License