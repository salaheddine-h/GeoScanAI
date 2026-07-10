# Data Sources

## Overview

GeoScanAI relies on external geospatial and environmental data to build meaningful land assessments. Each source contributes a different layer of context, and each source should be treated with explicit provenance, update cadence, and limitations.

## Google Earth Engine

**Purpose**  
Provide scalable access to large geospatial datasets and remote sensing products for analysis and feature extraction.

**Data Type**  
Satellite imagery, environmental layers, and derived raster and vector datasets.

**Advantages**  
Extensive dataset catalog, strong geospatial breadth, and access to analysis-ready information.

**Limitations**  
Requires careful dataset selection, interpretation discipline, and awareness of provider-specific usage constraints.

## Sentinel-1

**Purpose**  
Provide radar-based earth observation signals that remain useful even when cloud cover limits optical imagery.

**Data Type**  
Synthetic aperture radar imagery.

**Advantages**  
Useful in cloudy regions, supports surface change observation, and adds an alternate sensing modality.

**Limitations**  
Radar interpretation is less intuitive than optical imagery and often requires specialized preprocessing.

## Sentinel-2

**Purpose**  
Provide optical imagery for land cover, vegetation, and surface condition analysis.

**Data Type**  
Multispectral satellite imagery.

**Advantages**  
Strong spectral richness, broad coverage, and useful indicators for vegetation and land condition.

**Limitations**  
Cloud cover and atmospheric conditions can reduce effective usability.

## OpenStreetMap

**Purpose**  
Provide contextual map features such as roads, buildings, points of interest, and boundaries where available.

**Data Type**  
Crowdsourced vector map data.

**Advantages**  
Wide geographic coverage, open access, and useful contextual reference for human-readable reports.

**Limitations**  
Coverage quality varies by region and feature type, and data freshness can be inconsistent.

## SoilGrids

**Purpose**  
Provide soil-related context for land suitability, productivity, and environmental assessment.

**Data Type**  
Global soil property layers.

**Advantages**  
Useful for broad soil characterization and comparison across regions.

**Limitations**  
Typically model-based and generalized, so local precision can be limited.

## Open-Meteo

**Purpose**  
Provide weather and climate context that can influence land suitability and operational decision-making.

**Data Type**  
Weather forecasts and historical meteorological data.

**Advantages**  
Simple access to weather context, helpful for environmental and operational interpretation.

**Limitations**  
Weather data is time-sensitive and should not be treated as a static property of the land.

## Digital Elevation Models

**Purpose**  
Provide terrain and elevation context for slope, drainage, and accessibility analysis.

**Data Type**  
Raster elevation datasets.

**Advantages**  
Useful for terrain assessment, hydrological reasoning, and site suitability screening.

**Limitations**  
Resolution varies by source, and fine-grained terrain details may be smoothed or unavailable.

## Geological Data

**Purpose**  
Provide subsurface and geological context relevant to land stability, construction risk, and environmental assessment.

**Data Type**  
Geological maps, layers, and reference datasets.

**Advantages**  
Important for understanding foundational land constraints and physical context.

**Limitations**  
Regional coverage, format consistency, and update frequency vary significantly by jurisdiction.

## Source Strategy

- Prefer authoritative or widely recognized datasets.
- Record provenance and assumptions for every reportable insight.
- Distinguish between raw data, derived indicators, and AI interpretation.
- Avoid overstating precision when source resolution is coarse or generalized.
- Design the platform to tolerate missing or partial source availability.
