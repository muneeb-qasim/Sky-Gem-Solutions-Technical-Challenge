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