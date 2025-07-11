# Deployment Guide

This document provides deployment instructions for the Insurance Recommendation System.

## 🚀 Quick Deployment Options

### Option 1: Docker Compose (Local/Production)

**Prerequisites:**

- Docker and Docker Compose installed
- Git repository cloned

**Deploy:**

```bash
# Start all services
docker-compose up --build -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
# Database: localhost:5432
```

### Option 2: AWS ECS (Recommended for Production)

**Prerequisites:**

- AWS CLI configured
- Docker installed

**Steps:**

1. **Create ECR repositories:**

   ```bash
   aws ecr create-repository --repository-name insurance-frontend
   aws ecr create-repository --repository-name insurance-backend
   ```

2. **Build and push images:**

   ```bash
   docker build -t insurance-frontend ./frontend
   docker build -t insurance-backend ./backend
   # Tag and push to ECR (replace with your account ID)
   docker tag insurance-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-frontend:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/insurance-frontend:latest
   ```

3. **Create RDS PostgreSQL instance** (via AWS Console or CLI)

4. **Deploy to ECS** using the AWS Console or CLI

### Option 3: Vercel + Railway

**Frontend (Vercel):**

- Connect GitHub repository to Vercel
- Deploy automatically on push

**Backend (Railway):**

- Connect GitHub repository to Railway
- Set environment variables for database
- Deploy automatically

## 🔧 Environment Variables

**Backend (.env):**

```
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=4000
FRONTEND_URL=http://localhost:3000
NODE_ENV=production
```

## 📊 Database Setup

**PostgreSQL Schema:**

```sql
CREATE TABLE submissions (
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

## 🔒 Security Checklist

- [ ] Environment variables configured
- [ ] Database password is secure
- [ ] CORS settings updated for production domain
- [ ] SSL certificate installed (if using custom domain)
- [ ] Database backups configured

## 💰 Estimated Costs

**AWS ECS (Monthly):**

- RDS PostgreSQL: ~$15
- ECS Fargate: ~$30
- Load Balancer: ~$20
- **Total: ~$65/month**

**Vercel + Railway:**

- Vercel: Free tier available
- Railway: ~$5-20/month
- **Total: ~$5-20/month**

## 🚨 Troubleshooting

**Common Issues:**

1. **Database connection failed:** Check DATABASE_URL and network access
2. **CORS errors:** Update FRONTEND_URL in backend environment
3. **Build failures:** Check Dockerfile and dependencies

**Useful Commands:**

```bash
# Check application health
curl http://localhost:4000/health

# Test API endpoint
curl -X POST http://localhost:4000/recommendation \
  -H "Content-Type: application/json" \
  -d '{"age":30,"income":75000,"dependents":2,"riskTolerance":"Medium"}'

# View logs
docker-compose logs -f
```

## 📞 Support

For deployment issues:

1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Review security group settings (AWS)
