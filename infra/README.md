# Infrastructure Overview

## Purpose

This directory contains the infrastructure architecture for GeoScanAI. It defines the container topology, service boundaries, network model, storage model, and local development workflow that will support future application work.

## Service Map

### Nginx

The reverse proxy entry point for local and future production-like environments. It is responsible for traffic entry, request routing, and future TLS termination.

- Port: `8080` on the host mapped to `80` in the container.
- Volumes: `nginx_cache`, `nginx_logs`.
- Network: `geoscanai` bridge network.

### Backend

The reserved workspace for the NestJS backend container. The service is defined at the infrastructure layer so the application stack can be connected later without changing the monorepo shape.

- Port: `3000` inside the container, exposed through Nginx.
- Volumes: none at this stage.
- Network: `geoscanai` bridge network.

### Frontend

The reserved workspace for the Next.js frontend container. The service is defined now so the application layer can be added without changing the base deployment topology.

- Port: `3001` inside the container, exposed through Nginx.
- Volumes: none at this stage.
- Network: `geoscanai` bridge network.

### PostgreSQL

Primary relational database with PostGIS enabled for geospatial persistence.

- Port: `5432`.
- Volume: `postgres_data`.
- Network: `geoscanai` bridge network.

### Redis

Shared cache and future queue coordination layer.

- Port: `6379`.
- Volume: `redis_data`.
- Network: `geoscanai` bridge network.

### MinIO

Object storage for reports, uploads, cached imagery references, and future derived assets.

- Port: `9000` for the S3-compatible API.
- Port: `9001` for the console.
- Volume: `minio_data`.
- Network: `geoscanai` bridge network.

## Ports

| Service | Host Port | Container Port |
|---|---:|---:|
| Nginx | 8080 | 80 |
| Backend | Reserved behind Nginx | 3000 |
| Frontend | Reserved behind Nginx | 3001 |
| PostgreSQL | 5432 | 5432 |
| Redis | 6379 | 6379 |
| MinIO API | 9000 | 9000 |
| MinIO Console | 9001 | 9001 |

## Volumes

The compose file uses named volumes so persistent data remains outside the container lifecycle.

- `postgres_data` for relational persistence.
- `redis_data` for Redis data persistence.
- `minio_data` for object storage.
- `nginx_cache` for proxy cache state.
- `nginx_logs` for proxy logs.

## Networks

All services participate in a single bridge network named `geoscanai`. This keeps service-to-service communication isolated while remaining simple for local development.

## Startup Order

1. PostgreSQL, Redis, and MinIO start first.
2. Backend connects once persistence and shared infrastructure are available.
3. Frontend starts after the backend contract exists.
4. Nginx starts as the public entry point and forwards traffic to the application tier.

## Development Workflow

1. Copy `.env.example` to `.env` and fill in environment values.
2. Start the infrastructure stack with Docker Compose.
3. Verify database, cache, object storage, and proxy availability.
4. Add backend and frontend implementation in the workspace folders under `apps/`.
5. Keep shared contracts and infrastructure settings aligned as the platform grows.

## Architectural Notes

- Infrastructure is isolated from application logic.
- The current compose file is intentionally scaffolded for future service implementation.
- The repository is arranged so additional services can be added without reworking the base topology.
- Production hardening, TLS, and application routing policies will be introduced in later phases.
