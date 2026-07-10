# External Services

## Overview

GeoScanAI depends on a set of external geospatial and environmental providers to build useful land intelligence reports. Each provider contributes a different type of context, and each one should be isolated behind a stable internal abstraction.

## Provider Catalog

### Google Earth Engine

**Purpose**  
Provides access to large-scale geospatial datasets and analysis-ready earth observation data.

**Input**  
Spatial queries, bounding boxes, and dataset selection parameters.

**Output**  
Imagery, raster layers, derived geospatial context, and analysis-ready signals.

**Limitations**  
Provider-specific access constraints, dataset selection complexity, and the need for careful interpretation of derived products.

**Fallback Strategy**  
Use alternate satellite providers, cached imagery references, or lower-resolution source data when available.

### Copernicus

**Purpose**  
Provides earth observation assets and environmental context from the Copernicus ecosystem.

**Input**  
Spatial extents, time windows, and source selection criteria.

**Output**  
Satellite imagery, observation products, and environmental datasets.

**Limitations**  
Availability and latency can vary by product and region.

**Fallback Strategy**  
Use other satellite programs or cached products when Copernicus data is unavailable.

### Sentinel-1

**Purpose**  
Provides radar-based imagery that can support observation even when clouds limit optical coverage.

**Input**  
Spatial requests and temporal ranges.

**Output**  
Radar imagery and radar-derived land context.

**Limitations**  
Radar interpretation is less intuitive than optical imagery and often requires specialized handling.

**Fallback Strategy**  
Substitute optical imagery or historical cached observations when radar is not sufficient.

### Sentinel-2

**Purpose**  
Provides multispectral optical imagery for land cover and surface condition interpretation.

**Input**  
Spatial extents and acquisition windows.

**Output**  
Multispectral imagery suitable for vegetation, land cover, and surface analysis.

**Limitations**  
Cloud cover, atmospheric conditions, and revisit timing can affect usability.

**Fallback Strategy**  
Use Sentinel-1 or another optical source when Sentinel-2 imagery is incomplete.

### OpenStreetMap

**Purpose**  
Provides contextual map data for roads, buildings, places, and visible infrastructure references.

**Input**  
Coordinates, bounding areas, and map context queries.

**Output**  
Vector map features and location context.

**Limitations**  
Coverage and freshness vary by geography.

**Fallback Strategy**  
Use alternate cadastral, map, or geocoding sources when the map layer is sparse.

### SoilGrids

**Purpose**  
Provides soil property layers that inform suitability, agronomy, and environmental interpretation.

**Input**  
Spatial coordinates and bounding areas.

**Output**  
Soil characteristics, layers, and derived soil context.

**Limitations**  
Model-based data can be generalized and may not capture local variation.

**Fallback Strategy**  
Use regional soil datasets or mark the report with lower soil confidence.

### Open-Meteo

**Purpose**  
Provides weather and climate context for current or historical environmental interpretation.

**Input**  
Coordinates, dates, and weather query windows.

**Output**  
Forecasts, historical weather context, and climate signals.

**Limitations**  
Weather is time-sensitive and should not be treated as a static property of the land.

**Fallback Strategy**  
Use cached weather context or alternate meteorological sources if necessary.

## Future Providers

### LiDAR

High-resolution terrain and surface structure context for precision assessment.

### Drone

Local aerial capture for premium or site-specific validation workflows.

### GPR

Subsurface sensing for advanced geological or construction-related evaluation.

## Integration Principles

- Abstract all providers behind internal contracts.
- Preserve source metadata and acquisition time.
- Support graceful degradation when providers fail.
- Keep provider credentials isolated from application code and client access.
- Prefer source diversity over dependence on a single external system.
