# Vanitha Grocery POS System

A modern, full-stack Point of Sale (POS) system with native iOS app and desktop clients.

## 🎯 Features

- **Product Management**: Add, update, and manage products with SKU and pricing
- **Inventory Tracking**: Real-time inventory management
- **Sales Transactions**: Process sales with cart management
- **Payment Processing**: Support for multiple payment methods
- **Reporting**: Daily sales reports and analytics
- **User Management**: Staff accounts and role-based access
- **Receipt Generation**: Print or email receipts
- **Offline Mode**: iOS and desktop apps work offline, sync when connected
- **Real-time Sync**: Automatic data synchronization across devices
- **Barcode Scanning**: Integrated barcode scanner support

## 🛠️ Tech Stack

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- WebSocket (Socket.io) for real-time updates

### Frontend
- **Web/Desktop**: React 18 + TypeScript + Tailwind CSS
- **Desktop Wrapper**: Electron (Windows/Mac/Linux)
- **Mobile**: React Native (iOS/Android)

## 📁 Project Structure

```
pos-system/
├── backend/              # Node.js/Express API server
├── web/                  # React web application
├── desktop/              # Electron desktop app
├── mobile/               # React Native mobile app
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- For iOS: Xcode 13+
- For Desktop: Electron build tools

### Installation

```bash
# Clone repository
git clone https://github.com/jagan9812/pos-system.git
cd pos-system

# Install all dependencies
npm run install:all

# Setup database
cd backend
npm run migrate
npm run seed
```

### Development

**Start Backend + Web:**
```bash
npm run dev
```

**Start Desktop App:**
```bash
npm run dev:desktop
```

**Start Mobile App:**
```bash
npm run dev:mobile
```

## 📱 Building for Different Platforms

### iOS App
```bash
cd mobile
npm run build:ios
# Submit to App Store Connect
```

### Desktop (Windows/Mac/Linux)
```bash
cd desktop
npm run build:win   # Windows
npm run build:mac   # Mac
npm run build:linux # Linux
```

### Web
```bash
cd web
npm run build
# Deploy to Vercel, Netlify, or any static hosting
```

## 📚 Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions for each platform.

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- HTTPS/TLS encryption
- Secure password hashing (bcrypt)
- Audit logs

## 📊 Database

Core tables:
- `users` - Staff accounts and roles
- `products` - Product catalog
- `inventory` - Stock levels
- `transactions` - Sales records
- `transaction_items` - Line items
- `payments` - Payment records

## 🚢 Deployment

- **Backend**: Heroku, Railway, AWS, or Docker
- **Web**: Vercel, Netlify, AWS S3, CloudFront
- **Desktop**: GitHub Releases for auto-updates
- **iOS**: Apple App Store

## 🐛 Troubleshooting

Refer to [SETUP_GUIDE.md](./SETUP_GUIDE.md) for common issues and solutions.

## 📝 License

MIT License - See LICENSE file

## 👨‍💻 Author

jagan9812