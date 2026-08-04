# 🌍 GeoScanAI

> AI-Powered Land Intelligence Platform

GeoScanAI is a production-grade platform that transforms raw geospatial data into actionable land intelligence.

Instead of manually collecting satellite imagery, terrain models, weather information, soil characteristics, and geographic datasets from multiple sources, GeoScanAI automatically gathers, processes, analyzes, and explains them through an intelligent analysis pipeline.

The platform is designed for engineers, researchers, investors, farmers, construction companies, government agencies, and anyone who needs to understand land before making decisions.

---

# 🎯 Vision

GeoScanAI aims to become the operating system for land intelligence.

Our mission is to make professional geospatial analysis accessible through artificial intelligence by combining multiple public datasets into a single intelligent report.

---

# ❓ The Problem

Today, understanding land requires collecting information from many different sources.

A typical analysis may involve:

- Satellite imagery
- Weather history
- Terrain elevation
- Soil composition
- Land cover
- Roads and infrastructure
- Geographic maps
- Environmental indicators

This process is expensive, slow, and usually requires GIS experts.

---

# 💡 Our Solution

GeoScanAI automates this workflow.

Users simply provide:

- Latitude & Longitude

or

- Draw an area on the map

or

- Upload professional geospatial datasets (Drone, GPR, LiDAR, GeoTIFF, etc.)

GeoScanAI automatically builds an intelligent report using AI and public geospatial datasets.

---

# 👥 User Types

## Standard User

Provides only:

- Latitude
- Longitude

GeoScanAI automatically retrieves all required datasets.

---

## Professional User

Provides:

- Coordinates
- GPR
- Drone imagery
- GeoTIFF
- LiDAR
- KML
- GeoJSON
- Other GIS datasets

GeoScanAI combines uploaded data with public datasets for deeper analysis.

---

# 🧠 Land Intelligence Engine

GeoScanAI is powered by a modular processing pipeline.

```
Request

↓

Request Manager

↓

Analysis Type Manager

↓

Provider Manager

↓

Data Collector

↓

Data Validator

↓

Data Normalizer

↓

Feature Extraction

↓

Data Fusion

↓

Spatial Analysis

↓

Scoring Engine

↓

AI Interpretation

↓

Report Generator
```

Each engine has a single responsibility and enriches the shared Analysis Context throughout the pipeline.

---

# 🛰️ Data Sources

The platform integrates multiple trusted geospatial providers.

Current planned providers include:

- Copernicus Sentinel
- Google Earth Engine
- OpenStreetMap
- Open-Meteo
- SoilGrids
- NASA DEM
- ESA WorldCover

Future integrations:

- Planet Labs
- Maxar
- Drone imagery
- GPR
- LiDAR

---

# 🏗️ Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

## Backend

- NestJS
- TypeScript

## Database

- PostgreSQL
- PostGIS

## Infrastructure

- Docker Compose
- Nginx
- Redis
- MinIO

## AI

- OpenAI
- Local LLMs (future)

---

# 📂 Repository Structure

```
GeoScanAI/

apps/
├── backend/
└── frontend/

packages/
├── shared/
├── config/
└── types/

infra/
└── docker/

docs/

datasets/

scripts/

.github/
```

---

# 🚀 Getting Started

Clone the repository.

```bash
git clone https://github.com/<your-org>/GeoScanAI.git
```

Start the infrastructure.

```bash
docker compose up -d
```

Check running services.

```bash
docker compose ps
```

Stop services.

```bash
docker compose down
```

---

# 📖 Documentation

Project documentation is available inside the `docs/` directory.

It includes:

- Vision
- Business Model
- System Architecture
- Backend Architecture
- Frontend Architecture
- Domain Layer
- Land Intelligence Engine
- External Providers
- AI Architecture
- Roadmap

---

# 🚧 Current Status

Current progress:

- ✅ Repository Foundation
- ✅ Documentation
- ✅ Architecture Blueprint
- ✅ Docker Infrastructure
- ✅ NestJS Backend Bootstrap
- ✅ Initial Analysis Endpoint

In Progress:

- 🚧 Land Intelligence Engine

Planned:

- Authentication
- Database
- External Providers
- AI Integration
- Dashboard
- Report Generator
- Production Deployment

---

# 🤝 Contributing

We welcome contributions that align with the project's architecture and engineering principles.

Please read the documentation before opening a pull request.

---

# 📜 License

This project is licensed under the MIT License.
