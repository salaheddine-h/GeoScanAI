# GeoScanAI Analysis Engine

The **GeoScanAI Analysis Engine** is the Python-based geospatial intelligence service responsible for collecting, processing, analyzing, and interpreting geographic data.

It is a core component of the GeoScanAI platform and works alongside the NestJS backend.

> **Status:** Foundation phase. The engine currently provides the FastAPI service, health endpoint, Docker integration, and modular project structure. Geospatial providers and analysis stages will be implemented incrementally.

---

## Overview

GeoScanAI receives a geographic location from a user and transforms it into structured land intelligence.

The Python engine is responsible for the computational and geospatial side of this workflow.

```text
User
  │
  ▼
Frontend
  │
  ▼
NestJS Backend
  │
  │ Analysis Request
  ▼
┌──────────────────────────────┐
│      Python Engine           │
│                              │
│  Data Collection             │
│  Data Validation             │
│  Data Normalization          │
│  Geospatial Processing       │
│  Feature Extraction          │
│  Data Fusion                 │
│  Analysis                    │
│  Scoring                     │
│  AI Interpretation           │
└──────────────┬───────────────┘
               │
               ▼
        Analysis Result
               │
               ▼
          NestJS Backend
               │
               ▼
             User
```

---

## Responsibilities

The engine is designed to handle:

- Geospatial data processing
- External geospatial API integration
- Satellite and raster data processing
- Terrain analysis
- Weather and climate analysis
- Soil analysis
- Land-cover analysis
- Infrastructure and accessibility analysis
- Feature extraction
- Data fusion
- Land suitability scoring
- AI-assisted interpretation
- Structured analysis results

The engine focuses on **analysis**, while the NestJS backend handles the main application API, business logic, and orchestration.

---

## Integration with GeoScanAI Backend

The Python engine does not replace the NestJS backend. Each service has a clear responsibility:

| Service | Responsibility |
|---|---|
| Frontend | User interface and interaction |
| NestJS Backend | Public API, authentication, business logic, orchestration |
| Python Engine | Geospatial processing and analysis |
| PostgreSQL/PostGIS | Spatial data storage |
| Redis | Caching and asynchronous processing |
| MinIO | Object and file storage |

The communication flow is:

```text
Frontend
   ↓
Nginx
   ↓
NestJS Backend
   ↓
Python Engine
   ↓
External Data Providers
   ↓
Analysis Result
   ↓
NestJS Backend
   ↓
Frontend
```

Inside the Docker network, the engine is available through:

```text
http://engine:8000
```

---

# Architecture

The engine follows a modular architecture.

```text
engine/
│
├── app/
│   ├── analysis/
│   ├── api/
│   ├── models/
│   ├── providers/
│   ├── services/
│   └── main.py
│
├── tests/
│
├── Dockerfile
├── requirements.txt
└── README.md
```

### `app/`

Contains the Python application.

### `app/api/`

Contains HTTP endpoints exposed by the engine.

### `app/analysis/`

Contains the geospatial analysis logic.

Examples include:

- Terrain analysis
- Climate analysis
- Soil analysis
- Accessibility analysis
- Land suitability analysis

### `app/providers/`

Contains integrations with external data providers.

```text
providers/
├── weather/
├── osm/
├── terrain/
├── soil/
└── satellite/
```

Providers are isolated from the analysis logic so that a data source can be replaced without rewriting the analysis engine.

### `app/models/`

Contains data models and contracts used by the engine.

Examples:

- `AnalysisRequest`
- `AnalysisContext`
- `AnalysisResult`
- `TerrainData`
- `WeatherData`
- `SoilData`

### `app/services/`

Contains application-level services that coordinate providers, analysis stages, and other engine components.

---

# Analysis Pipeline

The engine follows the GeoScanAI land intelligence pipeline:

```text
Request
   ↓
Collect
   ↓
Validate
   ↓
Normalize
   ↓
Extract
   ↓
Fuse
   ↓
Analyze
   ↓
Score
   ↓
Interpret
   ↓
Report
```

Each stage should produce structured data that can be consumed by the next stage.

---

# Data Providers

The engine will integrate multiple sources of geographic information.

## Weather

Weather and climate information can provide:

```text
Temperature
Precipitation
Humidity
Wind
Climate statistics
Historical weather
```

## OpenStreetMap

Used to obtain geographic context such as:

```text
Roads
Buildings
Land use
Points of interest
Infrastructure
Nearby services
```

## Terrain

Terrain data can be used to calculate:

```text
Elevation
Slope
Aspect
Terrain accessibility
Drainage indicators
```

## Soil

Soil information can provide:

```text
Soil type
Texture
Organic properties
Water characteristics
Agricultural indicators
```

## Satellite / Earth Observation

Satellite data can provide:

```text
Land cover
Vegetation
Surface characteristics
Environmental indicators
Change detection
```

---

# Python Geospatial Stack

The engine is built around the Python geospatial ecosystem.

Current core dependencies include:

```text
FastAPI
Uvicorn
GeoPandas
Shapely
Rasterio
PyProj
NumPy
Pandas
HTTPX
Pydantic
```

### FastAPI

Provides the HTTP API used by the NestJS backend.

### GeoPandas

Used for vector geospatial data processing.

### Shapely

Used for geometric operations.

### Rasterio

Used for raster and satellite data processing.

### PyProj

Used for coordinate reference systems and transformations.

### NumPy

Used for numerical computation.

### Pandas

Used for structured data processing.

### HTTPX

Used to communicate with external APIs.

---

# API

The engine exposes an internal HTTP API.

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "geoscanai-engine"
}
```

## Analysis

The analysis endpoint is planned as:

```http
POST /analyze
```

Example request:

```json
{
  "latitude": 31.6295,
  "longitude": -7.9811,
  "inputType": "COORDINATES_ONLY"
}
```

The endpoint will progressively connect the request to the analysis pipeline and external data providers.

---

# Analysis Context

The `AnalysisContext` is the shared object passed through the analysis pipeline.

Conceptually:

```text
AnalysisContext
│
├── request
├── location
├── datasets
├── features
├── evidence
├── analysis
├── scores
└── interpretation
```

Each stage enriches the context instead of creating unrelated data structures.

Example:

```text
Request
  ↓
Context
  ↓
+ Weather Data
  ↓
+ Terrain Data
  ↓
+ Soil Data
  ↓
+ OSM Data
  ↓
+ Extracted Features
  ↓
+ Analysis Results
  ↓
+ Scores
  ↓
+ AI Interpretation
```

This makes the analysis pipeline traceable and easier to debug.

---

# AI Integration

AI is not intended to replace deterministic geospatial analysis.

The engine should first collect and calculate reliable geographic evidence.

```text
Geospatial Data
      ↓
Deterministic Analysis
      ↓
Features
      ↓
Scores
      ↓
AI Interpretation
      ↓
Human-readable Report
```

For example, the deterministic analysis may produce:

```json
{
  "terrainScore": 82,
  "accessibilityScore": 74,
  "climateScore": 61,
  "soilScore": 68,
  "overallScore": 72
}
```

The AI layer can then interpret these results and explain them in a human-readable form.

This separation keeps factual calculations independent from AI-generated interpretation.

---

# Docker

The engine runs as an independent Docker service.

Build:

```bash
docker compose build engine
```

Start:

```bash
docker compose up -d engine
```

Check status:

```bash
docker compose ps engine
```

View logs:

```bash
docker compose logs -f engine
```

The engine listens internally on:

```text
http://engine:8000
```

The service is intentionally kept internal to the Docker network and is not required to be publicly exposed.

---

# Local Development

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate it on Linux/macOS:

```bash
source .venv/bin/activate
```

Activate it on Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the development server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available locally at:

```text
http://localhost:8000
```

Health check:

```bash
curl http://localhost:8000/health
```

---

# Development Principles

### 1. Modular

Each provider and analysis component should have a clear responsibility.

### 2. Provider-independent

Analysis logic should not depend directly on a specific external API.

For example:

```text
WeatherProvider
      │
      ├── OpenMeteoProvider
      └── FutureWeatherProvider
```

### 3. Traceable

Important analysis results should have a clear data source and provenance.

### 4. Deterministic where possible

Geospatial calculations and scoring should be reproducible.

### 5. AI-assisted, not AI-dependent

AI should interpret evidence rather than invent geographic facts.

### 6. Testable

Providers, analysis modules, scoring algorithms, and services should be independently testable.

---

# Testing

Run tests with:

```bash
pytest
```

Tests should progressively cover:

```text
Provider integrations
Geospatial calculations
Data validation
Feature extraction
Scoring
Analysis pipeline
API endpoints
```

---

# Security

External API keys and secrets must never be committed to the repository.

Use environment variables for secrets, for example:

```env
OPENAI_API_KEY=
WEATHER_API_KEY=
```

Keep `.env` files excluded from Git and use `.env.example` for documented configuration.

---

# Future Development

The engine will progressively implement:

- [ ] Analysis context
- [ ] `/analyze` endpoint
- [ ] Provider abstraction
- [ ] Weather provider
- [ ] OpenStreetMap provider
- [ ] Terrain provider
- [ ] Soil provider
- [ ] Satellite data provider
- [ ] Geospatial feature extraction
- [ ] Data fusion
- [ ] Land suitability analysis
- [ ] Scoring engine
- [ ] AI interpretation
- [ ] Report generation
- [ ] Advanced machine learning
- [ ] Professional GIS file processing

---

# GeoScanAI

The engine is part of the **GeoScanAI** platform.

GeoScanAI aims to transform geographic data into understandable, evidence-backed land intelligence for location-based decisions.

```text
Location
   ↓
Data
   ↓
Geospatial Intelligence
   ↓
Analysis
   ↓
Score
   ↓
AI Interpretation
   ↓
Land Intelligence
```

For the complete platform architecture, see the main GeoScanAI documentation.
