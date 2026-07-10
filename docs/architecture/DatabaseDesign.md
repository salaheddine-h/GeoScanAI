# Database Design

## Overview

The database should support GeoScanAI as a traceable land intelligence platform with clear separation between identity, projects, analyses, reports, source references, and cached external data. The model should remain conceptual at this stage and should not prescribe any specific engine or SQL implementation.

## Core Entities

### Users

Represents authenticated people or future service identities that access the platform.

### Projects

Represents an organizational grouping for analyses, reports, and shared work.

### Analyses

Represents a single land analysis request and its processing lifecycle.

### Reports

Represents the generated output of an analysis, including narrative, status, and access references.

### Coordinates

Represents the spatial input associated with an analysis, such as point, polygon, or bounding geometry.

### SatelliteCache

Represents cached satellite imagery references, snapshots, or derived observations used to avoid repeated retrieval.

### Uploads

Represents user-submitted files or future geospatial assets associated with a project or analysis.

### Datasets

Represents registered data sources, dataset versions, provenance metadata, and availability state.

## Conceptual Relationships

### Users to Projects

A user may belong to one or more projects. A project may include multiple users in future collaboration scenarios.

### Projects to Analyses

A project can contain many analyses. Each analysis belongs to a single project for traceability and grouping.

### Analyses to Reports

An analysis can generate one or more reports over time, though the primary path is a single current report with versioned history as needed.

### Analyses to Coordinates

Each analysis is anchored by one primary spatial input and may include derived spatial envelopes such as bounding boxes or search areas.

### Analyses to SatelliteCache

An analysis may reference one or more cached satellite artifacts to improve performance and maintain provenance.

### Analyses to Uploads

An analysis may optionally reference uploaded files used as supporting context or future geospatial inputs.

### Analyses to Datasets

An analysis consumes one or more datasets, each with its own source type, freshness, and confidence characteristics.

## Design Considerations

- Keep analysis records immutable where possible so report history remains trustworthy.
- Preserve source provenance for every output.
- Separate raw source references from derived analysis artifacts.
- Allow multiple report generations from the same analysis input if the AI layer or report template changes.
- Support future tenancy, sharing, and access control without restructuring the core model.

## Data Integrity Principles

- Each report should point back to its originating analysis.
- Each analysis should reference the user, project, and spatial input that created it.
- Cached data should include source and time context.
- Uploaded files should be tied to ownership and retention policies.
- Dataset records should support version awareness and source traceability.
