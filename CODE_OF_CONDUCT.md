# Code of Conduct

## Our Pledge

We are committed to providing a welcoming, respectful, and collaborative environment for all contributors.

## Expected Behavior

- Be professional and constructive.
- Respect different vie# GeoScanAI environment template
# Copy this file to .env before starting the infrastructure stack.

COMPOSE_PROJECT_NAME=geoscanai
NODE_ENV=development
LOG_LEVEL=info

# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=3000
BACKEND_URL=http://localhost:3000
BACKEND_CORS_ORIGIN=http://localhost:8080

# Frontend
FRONTEND_HOST=0.0.0.0
FRONTEND_PORT=3001
FRONTEND_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=GeoScanAI
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:4000

# Database
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=geoscanai
POSTGRES_USER=geoscanai
POSTGRES_PASSWORD=geoscanai
DATABASE_URL=postgresql://geoscanai:geoscanai@postgres:5432/geoscanai
wpoints and experiences.
- Focus on the work, the architecture, and the facts.
- Communicate clearly and courteously.

## Unacceptable Behavior

- Harassment, discrimination, or exclusionary conduct.
- Abusive, demeaning, or threatening language.
- Deliberate disruption of collaboration.

## Enforcement

Project maintainers may remove content or restrict participation when necessary to preserve a productive environment.
