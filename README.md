# Insurance Recommendation System

A full-stack web application that provides personalized insurance recommendations based on user input. Built with Next.js frontend, Node.js/Express backend, and PostgreSQL database.

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Deployment**: Docker & Docker Compose

## ✨ Features

### Frontend

- ✅ Responsive UI with clean, modern design
- ✅ Well-structured React components with TypeScript
- ✅ Clean state management using React Hooks
- ✅ Form validation and error handling
- ✅ Loading states and user feedback

### Backend

- ✅ RESTful API with proper HTTP status codes
- ✅ Input validation and sanitization
- ✅ Extensible rules-based recommendation engine
- ✅ PostgreSQL integration with proper error handling
- ✅ CORS configuration for frontend communication
- ✅ Health check endpoint
- ✅ Graceful shutdown handling

### Database

- ✅ Clear schema design with proper data types
- ✅ Parameterized queries (no SQL injection)
- ✅ Timestamp tracking for submissions
- ✅ Proper indexing considerations

### Security

- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Non-root Docker containers
- ✅ Environment variable management
- ✅ Request size limiting

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd insurance-recommendation-system
   ```

2. **Start all services**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Health Check: http://localhost:4000/health
   - PostgreSQL Database: localhost:5432

### Option 2: Local Development

#### Prerequisites

- Node.js 18+
- PostgreSQL 15+ (or use Docker for database)
- npm or yarn

#### Database Setup

The application uses PostgreSQL 15 as the database. You can either:

**Option A: Use Docker for PostgreSQL only**

```bash
# Start only the PostgreSQL database
docker-compose up postgres -d
```

**Option B: Install PostgreSQL locally**

- Install PostgreSQL 15 on your system
- Create a database named `insurance_recommendations`
- Run the SQL script from `backend/init_db.sql`

#### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up PostgreSQL database**

   ```sql
   CREATE DATABASE insurance_recommendations;
   \c insurance_recommendations;

   CREATE TABLE IF NOT EXISTS submissions (
     id SERIAL PRIMARY KEY,
     age INTEGER NOT NULL,
     income INTEGER NOT NULL,
     dependents INTEGER NOT NULL,
     risk_tolerance VARCHAR(10) NOT NULL,
     recommendation_type VARCHAR(20) NOT NULL,
     coverage VARCHAR(32) NOT NULL,
     duration VARCHAR(16) NOT NULL,
     explanation TEXT NOT NULL,
     submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📊 API Documentation

### POST /recommendation

Generates a personalized insurance recommendation based on user input.

**Request Body:**

```json
{
  "age": 30,
  "income": 75000,
  "dependents": 2,
  "riskTolerance": "Medium"
}
```

**Response:**

```json
{
  "success": true,
  "recommendation": {
    "type": "Term Life",
    "coverage": "$1,250,000",
    "duration": "20 years",
    "explanation": "Balanced profile: standard coverage and term."
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /health

Health check endpoint for monitoring.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧠 Recommendation Algorithm

The system uses a rules-based algorithm that considers:

1. **Base Coverage**: 10x annual income
2. **Dependent Adjustment**: +$250,000 per dependent
3. **Age Adjustment**:
   - Under 30: +20% coverage
   - Over 50: -20% coverage
4. **Risk Tolerance**:
   - Low: 80% coverage, 15-year term
   - Medium: 100% coverage, 20-year term
   - High: 130% coverage, 30-year whole life

The algorithm is designed to be easily extensible for machine learning integration.

## 🔧 Development

### Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── src/app/             # App router pages
│   ├── Dockerfile           # Frontend Docker configuration
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── index.js            # Main server file
│   ├── Dockerfile          # Backend Docker configuration
│   ├── init_db.sql         # Database initialization
│   └── package.json
├── docker-compose.yml      # Multi-service orchestration
└── README.md              # This file
```

### Available Scripts

**Backend:**

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🐳 Docker Deployment

### Quick Start

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

For detailed deployment instructions including AWS, Vercel, and other platforms, see [DEPLOYMENT.md](./DEPLOYMENT.md).

The deployment guide covers:

- Docker Compose (local/production)
- AWS ECS with Fargate
- Vercel + Railway
- Environment variables setup
- Security checklist
- Cost estimates
- Troubleshooting guide

## 🔒 Security Considerations

- ✅ Input validation and sanitization
- ✅ Parameterized SQL queries
- ✅ CORS configuration
- ✅ Request size limiting
- ✅ Non-root Docker containers
- ✅ Environment variable management
- ✅ Error handling without information leakage

## 🧪 Testing

### Manual Testing

1. Start the application using Docker Compose
2. Navigate to http://localhost:3000
3. Fill out the form with various inputs
4. Verify recommendations are generated and stored
5. Check the health endpoint at http://localhost:4000/health

### API Testing

```bash
# Test health endpoint
curl http://localhost:4000/health

# Test recommendation endpoint
curl -X POST http://localhost:4000/recommendation \
  -H "Content-Type: application/json" \
  -d '{"age": 30, "income": 75000, "dependents": 2, "riskTolerance": "Medium"}'
```

## 📈 Monitoring

- Health check endpoint: `GET /health`
- Database connection monitoring
- Request/response logging
- Error tracking and logging

## 🚀 Future Enhancements

- [ ] Machine learning integration for better recommendations
- [ ] User authentication and session management
- [ ] Recommendation history and comparison
- [ ] Email notifications
- [ ] Admin dashboard for analytics
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] Performance monitoring and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions or issues, please open an issue in the repository or contact the development team.
