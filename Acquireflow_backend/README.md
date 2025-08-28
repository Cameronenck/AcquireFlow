# AcquireFlow Backend

A robust Node.js/Express backend API for AcquireFlow - a real estate lead generation platform with SMS/email capabilities.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Firebase integration
  - Role-based access control (Admin, Manager, Agent, User)
  - Password reset functionality

- **SMS Campaign Management**
  - Twilio integration for SMS delivery
  - Bulk SMS campaigns
  - Campaign scheduling and automation
  - Delivery tracking and analytics

- **Email Campaign Management**
  - SendGrid integration
  - Email templates
  - Campaign automation

- **Real Estate Integration**
  - MLS API integration
  - Property data management
  - Lead generation tools

- **Security & Performance**
  - Rate limiting
  - CORS configuration
  - Helmet security headers
  - Request compression
  - Comprehensive logging

## 🏗️ Architecture

```
src/
├── config/          # Configuration files (env, Firebase, Twilio)
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/          # Database models (Mongoose)
├── routes/          # API route definitions
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Firebase Admin SDK
- **SMS**: Twilio
- **Email**: SendGrid
- **Logging**: Winston
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 5+
- npm or yarn
- Twilio account (for SMS)
- SendGrid account (for email)
- Firebase project (for authentication)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd acquireflow-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/acquireflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@acquireflow.com

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@project.iam.gserviceaccount.com
```

### 4. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Run the application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Real Estate Co"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Firebase Login
```http
POST /api/v1/auth/login/firebase
Content-Type: application/json

{
  "idToken": "firebase_id_token_here"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

#### Get Profile
```http
GET /api/v1/auth/me
Authorization: Bearer <access_token>
```

### Health Check

```http
GET /health
```

## 🔧 Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Code Structure

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define database schemas and methods
- **Middlewares**: Handle cross-cutting concerns
- **Routes**: Define API endpoints
- **Types**: TypeScript interfaces and types

### Adding New Features

1. **Create Types**: Define interfaces in `src/types/`
2. **Create Model**: Define database schema in `src/models/`
3. **Create Service**: Implement business logic in `src/services/`
4. **Create Controller**: Handle HTTP requests in `src/controllers/`
5. **Create Routes**: Define endpoints in `src/routes/`
6. **Update App**: Register new routes in `src/app.ts`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring & Logging

The application includes comprehensive logging:

- **Request Logging**: All HTTP requests are logged
- **Error Logging**: Detailed error tracking with stack traces
- **Service Logging**: Business logic logging
- **Database Logging**: Database operation tracking

Logs are written to:
- Console (development)
- `logs/app.log` (all logs)
- `logs/error.log` (error logs only)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse and brute force attacks
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: Security headers and protection
- **Input Validation**: Request data validation with Joi
- **Password Hashing**: Bcrypt password encryption

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set in production:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/acquireflow
JWT_SECRET=very-long-secure-secret-key
```

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔮 Roadmap

- [ ] Campaign analytics dashboard
- [ ] Advanced audience targeting
- [ ] A/B testing for campaigns
- [ ] Webhook integrations
- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Multi-tenant support
- [ ] API rate limiting per user
- [ ] Campaign templates
- [ ] Integration marketplace

---

**Built with ❤️ by the AcquireFlow Team**
