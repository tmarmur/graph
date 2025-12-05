# Employee Graph Visualization - Setup Guide

A sophisticated organizational efficiency platform that visualizes employee hierarchies, detects redundancy, and identifies automation opportunities using AI-powered analysis.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Quick Start

Get started in 2 minutes without any setup:

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000/demo` to see the fully functional demo with pre-configured organizational data. No environment variables required for demo mode.

## Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Git** (for repository management)
- Modern web browser (Chrome, Safari, Firefox, Edge)

### Optional (for production features)

- **Neo4j Aura** account (graph database)
- **Neon PostgreSQL** account (for advanced features) or use SQLite (built-in)
- **Google API** credentials for Gemini AI
- **Better Auth** setup for custom authentication

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/employee-graph-visualization.git
cd employee-graph-visualization
\`\`\`

### 2. Install Dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Or using pnpm (recommended):
\`\`\`bash
pnpm install
\`\`\`

### 3. Verify Installation

\`\`\`bash
npm run dev
\`\`\`

The app should start at `http://localhost:3000`.

## Environment Variables

The application works in **three modes** based on available environment variables:

### Mode 1: Demo Mode (Default)

No environment variables needed. The application uses static demo data.

**Try it:**
\`\`\`bash
npm run dev
# Visit http://localhost:3000/demo
\`\`\`

### Mode 2: Local Development with SQLite

Basic local development with SQLite database:

\`\`\`env
DATABASE_URL=file:./dev.db
\`\`\`

### Mode 3: Production with Full Stack

Complete setup with all features:

\`\`\`env
# Database (PostgreSQL via Neon)
DATABASE_URL=postgresql://user:password@host/database

# Neo4j Graph Database (for organizational structure)
NEO4J_URI=neo4j+s://your-instance.neo4jlabs.com
NEO4J_USERNAME=your-username
NEO4J_PASSWORD=your-password

# Google AI (for role analysis and recommendations)
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key

# Better Auth (for production authentication)
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
\`\`\`

### Create `.env.local` File

\`\`\`bash
# Development
echo "DATABASE_URL=file:./dev.db" > .env.local

# Or production - add your values
cat > .env.local << EOF
DATABASE_URL=postgresql://...
NEO4J_URI=neo4j+s://...
NEO4J_USERNAME=...
NEO4J_PASSWORD=...
GOOGLE_GENERATIVE_AI_API_KEY=...
EOF
\`\`\`

**Important:** Never commit `.env.local` to version control. It contains sensitive credentials.

## Database Setup

### Option 1: SQLite (Default - No Setup Required)

SQLite is built-in and requires no setup. Data is stored in `dev.db`.

**Perfect for:** Development, testing, demo mode

### Option 2: Neo4j Aura (Recommended for Production)

1. Sign up at [neo4j.com/cloud/aura](https://neo4j.com/cloud/aura)
2. Create a new Neo4j Aura instance
3. Copy your connection URI and credentials
4. Add to `.env.local`:

\`\`\`env
NEO4J_URI=neo4j+s://your-instance.neo4jlabs.com
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
\`\`\`

**Features:** Graph-based organizational analysis, relationship detection, bottleneck identification

### Option 3: Neon PostgreSQL (for Scalability)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL project
3. Copy your connection string
4. Add to `.env.local`:

\`\`\`env
DATABASE_URL=postgresql://user:password@ep-your-project.us-east-1.neon.tech/neondb
\`\`\`

5. Run initialization (optional):

\`\`\`bash
npm run init:db
\`\`\`

## Running the Application

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

- Main app: http://localhost:3000
- Demo mode: http://localhost:3000/demo
- API routes: http://localhost:3000/api/*

### Production Build

\`\`\`bash
npm run build
npm run start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## Features

### 1. Organization Chart Visualization

- **Interactive SVG-based org chart** showing employee hierarchy
- **Color-coded automation scores** (red/yellow/green)
- **Relationship visualization** between employees and departments
- **Responsive design** for all screen sizes

**Try it:** Visit `/demo` and click "Overview" tab

### 2. Efficiency Metrics Dashboard

Real-time organizational analysis:

- **Efficiency Score** - Overall org health (0-100)
- **Redundant Roles** - Identifies duplicate positions
- **Automation Potential** - % of work that could be automated
- **Cost Impact** - Estimated savings from optimization
- **Productivity Gains** - Expected improvement projections

### 3. AI-Powered Analysis

Google Gemini integration provides:

- **Role Automation Detection** - Which tasks can AI handle
- **Approval Chain Analysis** - Find unnecessary sign-offs
- **Role Consolidation** - Suggest role mergers
- **Organization Health** - Bottleneck identification and recommendations

**Requires:** `GOOGLE_GENERATIVE_AI_API_KEY` environment variable

### 4. Employee Management

Full CRUD operations for:

- Employee profiles (name, role, department, manager)
- Skills and responsibilities
- Direct reports and reporting structure
- Relationship mapping

### 5. API Endpoints

See [API Endpoints](#api-endpoints) section below.

## API Endpoints

### Employee Management

\`\`\`
GET     /api/employees           - List all employees
POST    /api/employees           - Create new employee
GET     /api/employees/:id       - Get employee details
PUT     /api/employees/:id       - Update employee
DELETE  /api/employees/:id       - Delete employee
\`\`\`

### Relationships

\`\`\`
GET     /api/relationships       - List all relationships
POST    /api/relationships       - Create relationship
\`\`\`

### Analysis & Metrics

\`\`\`
GET     /api/metrics/efficiency-report      - Get efficiency metrics
GET     /api/analysis/efficiency-score      - Calculate efficiency score
GET     /api/analysis/detect-redundancy     - Find redundant roles
\`\`\`

### AI Analysis (requires Google API key)

\`\`\`
POST    /api/ai/analyze-role               - Analyze role automation
POST    /api/ai/approval-chain             - Analyze approval workflows
POST    /api/ai/consolidation              - Suggest role consolidation
POST    /api/ai/org-efficiency             - Get overall org analysis
\`\`\`

### Example API Call

\`\`\`bash
# Get efficiency report
curl http://localhost:3000/api/metrics/efficiency-report

# Analyze a role for automation
curl -X POST http://localhost:3000/api/ai/analyze-role \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "1",
    "role": "Data Entry Specialist",
    "responsibilities": ["Data entry", "Report generation", "Email management"]
  }'
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables in project settings
4. Deploy

\`\`\`bash
# One-click deployment
vercel deploy
\`\`\`

### Environment Variables on Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

- `DATABASE_URL` - Your database connection string
- `NEO4J_URI` - Neo4j Aura URI
- `NEO4J_USERNAME` - Neo4j username
- `NEO4J_PASSWORD` - Neo4j password
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google AI API key

### Docker Deployment

Create `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Build and run:

\`\`\`bash
docker build -t employee-graph .
docker run -p 3000:3000 -e DATABASE_URL="your-db" employee-graph
\`\`\`

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
- For demo: Navigate to `/demo` page (doesn't need DB)
- Check `DATABASE_URL` environment variable is set correctly
- Verify database is accessible

### Issue: "Google AI API not configured"

**Solution:**
- AI features are optional; app works without them
- To enable: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Add to `.env.local`: `GOOGLE_GENERATIVE_AI_API_KEY=your-key`

### Issue: "Next.js build fails"

**Solution:**
- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

### Issue: "Port 3000 already in use"

**Solution:**
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

### Issue: "Demo page shows no data"

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check browser console for errors (F12)

## Project Structure

\`\`\`
employee-graph-visualization/
├── app/
│   ├── api/                    # API routes
│   │   ├── employees/          # Employee CRUD
│   │   ├── relationships/      # Relationship management
│   │   ├── metrics/            # Efficiency metrics
│   │   ├── analysis/           # Analysis algorithms
│   │   └── ai/                 # AI-powered endpoints
│   ├── auth/                   # Authentication pages
│   ├── demo/                   # Demo mode page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── dashboard/              # Dashboard components
│   │   ├── organization-chart.tsx
│   │   ├── efficiency-metrics.tsx
│   │   ├── efficiency-report.tsx
│   │   ├── ai-insights-panel.tsx
│   │   └── sidebar.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── db/                     # Database clients
│   │   ├── sqlite.ts
│   │   └── neo4j.ts
│   ├── ai/                     # AI integration
│   │   └── google-ai.ts
│   ├── efficiency/             # Efficiency calculations
│   │   └── scoring-engine.ts
│   ├── types/                  # TypeScript types
│   ├── demo-data.ts            # Demo data
│   └── utils.ts                # Utilities
├── public/                     # Static assets
├── scripts/                    # Database scripts
├── package.json
└── next.config.mjs
\`\`\`

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Database:** SQLite (default), Neo4j Aura (recommended), Neon PostgreSQL (optional)
- **AI:** Google Gemini API via Vercel AI SDK
- **Auth:** Better Auth (optional)
- **Charts:** Recharts
- **UI Components:** shadcn/ui
- **Analytics:** Vercel Analytics

## Support & Resources

- **Documentation:** [Next.js Docs](https://nextjs.org/docs)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Database:** [Neo4j](https://neo4j.com) | [Neon](https://neon.tech)
- **AI:** [Google Generative AI](https://ai.google.dev)
- **Deployment:** [Vercel](https://vercel.com)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Need help?** Check the [Troubleshooting](#troubleshooting) section or create an issue on GitHub.
