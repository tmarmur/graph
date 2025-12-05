# Employee graph visualization

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/tms-projects-5b07fdc8/v0-employee-graph-visualization)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/jQfkkselppi)

## Overview

A sophisticated organizational efficiency platform that visualizes employee hierarchies, detects organizational bloat, identifies automation opportunities, and provides AI-powered recommendations for streamlining operations.

**Key Features:**
- Interactive organization chart visualization with real-time hierarchy mapping
- Automated redundancy detection and role consolidation analysis
- AI-powered recommendations using Google Gemini for workflow optimization
- Efficiency scoring engine identifying productivity bottlenecks
- Complete employee lifecycle management with relationship tracking
- Demo mode with pre-configured organizational data

**Status:** Fully functional - works with demo data out of the box, scales to production with environment variables.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000/demo` to see the live demo (no setup required).

## Full Setup Guide

For detailed installation, configuration, and deployment instructions, see **[SETUP.md](./SETUP.md)**.

Key sections:
- [Prerequisites & Installation](./SETUP.md#installation)
- [Environment Variables](./SETUP.md#environment-variables)
- [Database Setup](./SETUP.md#database-setup)
- [API Endpoints](./SETUP.md#api-endpoints)
- [Deployment](./SETUP.md#deployment)
- [Troubleshooting](./SETUP.md#troubleshooting)

## Deployment

Your project is live at:

**[https://vercel.com/tms-projects-5b07fdc8/v0-employee-graph-visualization](https://vercel.com/tms-projects-5b07fdc8/v0-employee-graph-visualization)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/jQfkkselppi](https://v0.app/chat/jQfkkselppi)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS 4 with shadcn/ui components
- **Databases:** SQLite (default), Neo4j Aura (recommended), Neon PostgreSQL (optional)
- **AI:** Google Gemini API via Vercel AI SDK
- **Auth:** Better Auth (optional)
- **Deployment:** Vercel

## Architecture

The platform consists of three main systems:

### 1. Organization Management
- Employee CRUD operations
- Hierarchical structure mapping
- Relationship and dependency tracking
- Department and team organization

### 2. Efficiency Analysis Engine
- Redundancy detection algorithm
- Automation potential scoring
- Approval chain analysis
- Cost impact calculations
- Organization health assessment

### 3. AI Analysis Layer
- Role automation recommendations
- Workflow optimization suggestions
- Role consolidation analysis
- Organizational bottleneck identification

## API Endpoints

All endpoints are documented in [SETUP.md - API Endpoints](./SETUP.md#api-endpoints).

Examples:
\`\`\`bash
# Get efficiency metrics
curl http://localhost:3000/api/metrics/efficiency-report

# List employees
curl http://localhost:3000/api/employees

# Analyze role for automation (requires Google API key)
curl -X POST http://localhost:3000/api/ai/analyze-role
\`\`\`

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | No | PostgreSQL/SQLite connection (uses SQLite by default) |
| `NEO4J_URI` | No | Neo4j graph database URI |
| `NEO4J_USERNAME` | No | Neo4j authentication |
| `NEO4J_PASSWORD` | No | Neo4j authentication |
| `GOOGLE_GENERATIVE_AI_API_KEY` | No | Google Gemini API for AI analysis |
| `BETTER_AUTH_SECRET` | No | Better Auth authentication secret |

**No environment variables are required to use demo mode.**

## Demo Data

The demo includes 14 employees across 4 departments:

- **CEO:** 1 Executive
- **Operations:** 4 employees (VP + team)
- **Engineering:** 5 employees (VP + engineers)
- **Sales & Marketing:** 3 employees (VP + team)
- **Finance:** 1 CFO

Pre-configured metrics show real-world optimization opportunities:
- 3 redundant roles identified
- 45% automation potential
- $287,000 estimated annual savings
- 6 AI-generated recommendations

## Features

### Organization Chart
- SVG-based interactive visualization
- Color-coded automation scores
- Click to view employee details
- Responsive design

### Efficiency Metrics
- Organization health score
- Redundancy detection
- Automation potential analysis
- Cost savings estimates
- Productivity projections

### AI Insights
- Role automation detection
- Approval chain optimization
- Role consolidation suggestions
- Organizational health assessment
- Actionable recommendations

### Employee Management
- Full CRUD operations
- Skill tracking
- Responsibility mapping
- Reporting structure management
- Relationship tracking

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please see [SETUP.md](./SETUP.md#contributing) for guidelines.

## License

MIT License - See LICENSE file for details

## Support

- **Setup Help:** See [SETUP.md - Troubleshooting](./SETUP.md#troubleshooting)
- **Issues:** Open an issue on GitHub
- **Documentation:** [SETUP.md](./SETUP.md)

---

**Want to modify this app?** Continue building on [v0.app](https://v0.app/chat/jQfkkselppi)
