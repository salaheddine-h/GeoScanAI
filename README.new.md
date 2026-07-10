# GeoScanAI

GeoScanAI is an AI-powered Land Intelligence Platform built as a production-grade monorepo foundation. The repository is structured to support backend services, frontend applications, shared packages, infrastructure, datasets, and documentation while keeping implementation out of the scaffold phase.

## Infrastructure Overview

The repository is organized around an infrastructure-first workflow. The current focus is on the platform foundation, container topology, shared configuration, and service boundaries required for future development.

## Monorepo Structure

```text
GeoScanAI/
├── apps/
│   ├── backend/
│   └── frontend/
├── packages/
│   ├── shared/
│   ├── config/
│   └── types/
├── infra/
│   └── docker/
│       ├── nginx/
│       ├── postgres/
│       ├── redis/
│       └── minio/
├── docs/
├── datasets/
├── scripts/
└── .github/
```

## Docker Architecture

The Docker topology is defined in [docker-compose.yml](docker-compose.yml). It establishes a bridge network and named volumes for the core infrastructure services:

- Nginx as the reverse proxy entry point.
- Backend as the reserved NestJS workspace container.
- Frontend as the reserved Next.js workspace container.
- PostgreSQL with PostGIS for spatial persistence.
- Redis for caching and future queue coordination.
- MinIO for object storage.

The infrastructure is intentionally separated from application logic so that future service implementation can be introduced without changing the core deployment model.

## Development Commands

These commands assume Docker Compose is available in the environment.

```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

## Future Services

The monorepo is prepared for the following future additions:

- Backend application implementation under `apps/backend/`.
- Frontend application implementation under `apps/frontend/`.
- AI service workspace for model orchestration and inference support.
- Shared packages for reusable contracts and configuration.
- Infrastructure hardening for production deployment and TLS.
- CI/CD workflows, test automation, and release management.

## Current Status

The repository currently contains only the monorepo and infrastructure scaffold. No business logic, APIs, frontend pages, or AI implementation have been added.

## Documentation

- [docs/architecture](docs/architecture)
- [Roadmap](docs/Roadmap.md)
- [Vision](docs/Vision.md)
- [Architecture](docs/Architecture.md)

## Contribution Guide

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution expectations and scope discipline.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
