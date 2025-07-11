require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

// PostgreSQL connection pool with proper error handling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limit payload size

// Input validation middleware
const validateRecommendationInput = (req, res, next) => {
  const { age, income, dependents, riskTolerance } = req.body;
  
  // Check if all required fields are present
  if (!age || !income || !dependents || !riskTolerance) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['age', 'income', 'dependents', 'riskTolerance']
    });
  }

  // Validate data types and ranges
  if (!Number.isInteger(age) || age < 18 || age > 80) {
    return res.status(400).json({ 
      error: 'Age must be an integer between 18 and 80' 
    });
  }

  if (!Number.isInteger(income) || income < 20000 || income > 10000000) {
    return res.status(400).json({ 
      error: 'Income must be an integer between 20,000 and 10,000,000' 
    });
  }

  if (!Number.isInteger(dependents) || dependents < 0 || dependents > 10) {
    return res.status(400).json({ 
      error: 'Dependents must be an integer between 0 and 10' 
    });
  }

  if (!['Low', 'Medium', 'High'].includes(riskTolerance)) {
    return res.status(400).json({ 
      error: 'Risk tolerance must be Low, Medium, or High' 
    });
  }

  next();
};

// Rules-based recommendation logic (extensible for ML)
function getRecommendation({ age, income, dependents, riskTolerance }) {
  let type = 'Term Life';
  let coverage = income * 10; // Base coverage: 10x annual income
  let duration = 20;
  let explanation = '';

  // Adjust for dependents
  if (dependents > 0) {
    coverage += dependents * 250000; // Additional $250k per dependent
  }

  // Adjust for age
  if (age < 30) {
    coverage *= 1.2; // 20% more for younger people
  } else if (age > 50) {
    coverage *= 0.8; // 20% less for older people
  }

  // Adjust for risk tolerance
  switch (riskTolerance) {
    case 'Low':
      coverage *= 0.8;
      duration = 15;
      explanation = 'Conservative profile: moderate coverage, shorter term.';
      break;
    case 'Medium':
      duration = 20;
      explanation = 'Balanced profile: standard coverage and term.';
      break;
    case 'High':
      type = 'Whole Life';
      coverage *= 1.3;
      duration = 30;
      explanation = 'Aggressive profile: higher coverage, longer term, whole life.';
      break;
  }

  // Round coverage to nearest $1000
  coverage = Math.round(coverage / 1000) * 1000;

  return {
    type,
    coverage: `$${coverage.toLocaleString()}`,
    duration: `${duration} years`,
    explanation,
  };
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// POST /recommendation endpoint
app.post('/recommendation', validateRecommendationInput, async (req, res) => {
  const { age, income, dependents, riskTolerance } = req.body;
  
  try {
    const recommendation = getRecommendation({ age, income, dependents, riskTolerance });

    // Store submission in PostgreSQL with proper error handling
    try {
      const query = `
        INSERT INTO submissions (
          age, income, dependents, risk_tolerance, 
          recommendation_type, coverage, duration, explanation
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      
      const values = [
        age,
        income,
        dependents,
        riskTolerance,
        recommendation.type,
        recommendation.coverage,
        recommendation.duration,
        recommendation.explanation,
      ];

      const result = await pool.query(query, values);
      console.log(`Recommendation stored with ID: ${result.rows[0].id}`);
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Log the error but don't fail the request
      // In production, you might want to use a proper logging service
    }

    res.json({
      success: true,
      recommendation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Recommendation generation error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to generate recommendation'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  pool.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  pool.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Insurance Recommendation API running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
}); 