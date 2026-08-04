# GeoScanAI Backend

This workspace hosts the GeoScanAI platform API. It is built with NestJS and is responsible for the application-facing boundary around the land intelligence workflow.

## Role in the platform

The backend will coordinate request validation, provider access, analysis orchestration, and report delivery. Its intended boundaries are described in the [backend modules documentation](../../docs/architecture/BackendModules.md).

## Local development

```bash
npm install
npm run start:dev
```

## Quality checks

```bash
npm run lint
npm test
npm run test:e2e
```

For local service topology, environment expectations, and ports, see the repository [Infrastructure Overview](../../infra/README.md).
