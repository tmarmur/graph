-- SQLite schema for user management and organizational data storage

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  organization_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  owner_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  manager_id TEXT,
  cost_annual REAL,
  skills TEXT,
  automation_score REAL DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  UNIQUE(organization_id, email)
);

-- Employee relationships (for Neo4j sync)
CREATE TABLE IF NOT EXISTS employee_relationships (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  source_employee_id TEXT NOT NULL,
  target_employee_id TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  strength REAL DEFAULT 1.0,
  is_approval_chain BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (source_employee_id) REFERENCES employees(id),
  FOREIGN KEY (target_employee_id) REFERENCES employees(id),
  UNIQUE(organization_id, source_employee_id, target_employee_id, relationship_type)
);

-- AI Analysis results cache
CREATE TABLE IF NOT EXISTS ai_analysis_results (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  analysis_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  result_data TEXT NOT NULL,
  confidence_score REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  UNIQUE(organization_id, analysis_type, target_id)
);

-- Efficiency metrics snapshots
CREATE TABLE IF NOT EXISTS efficiency_metrics (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  redundant_roles_count INTEGER,
  automation_potential_percent REAL,
  approval_chain_redundancy INTEGER,
  estimated_cost_savings REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Create indices for performance
CREATE INDEX IF NOT EXISTS idx_users_organization ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_employees_organization ON employees(organization_id);
CREATE INDEX IF NOT EXISTS idx_employees_manager ON employees(manager_id);
CREATE INDEX IF NOT EXISTS idx_relationships_organization ON employee_relationships(organization_id);
CREATE INDEX IF NOT EXISTS idx_analysis_organization ON ai_analysis_results(organization_id);
