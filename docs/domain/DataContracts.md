# Data Contracts

## Purpose

Data Contracts define the major business objects exchanged across the Land Intelligence Engine. Each contract specifies ownership, usage, validation expectations, and future growth boundaries.

## Coordinates
- Purpose: represent the user-supplied spatial target.
- Producer: Request Manager.
- Consumers: Analysis Type Manager, Provider Manager, Data Validator, Spatial Analysis.
- Validation Rules: valid latitude and longitude ranges, supported geometry reference, non-null spatial target.
- Future Evolution: polygon and multi-geometry support with precision annotations.

## BoundingBox
- Purpose: define derived analysis extent for retrieval and analysis.
- Producer: Request Manager and spatial preprocessing stage.
- Consumers: Provider Manager, Data Collector, Spatial Analysis.
- Validation Rules: coherent min/max boundaries, valid coordinate reference, non-zero area unless point-mode policy allows.
- Future Evolution: dynamic extents, multi-scale bounding windows.

## SatelliteDataset
- Purpose: carry satellite imagery and related metadata for analysis.
- Producer: Data Collector.
- Consumers: Data Validator, Data Normalizer, Feature Extraction.
- Validation Rules: acquisition timestamp, source identity, coverage intersection with bounding extent.
- Future Evolution: richer spectral and temporal metadata contracts.

## TerrainDataset
- Purpose: provide elevation and terrain context.
- Producer: Data Collector.
- Consumers: Data Validator, Data Normalizer, Feature Extraction, Spatial Analysis.
- Validation Rules: spatial alignment with target extent, unit clarity, source provenance.
- Future Evolution: higher-resolution terrain derivatives and slope classes.

## WeatherDataset
- Purpose: provide meteorological context for interpretation.
- Producer: Data Collector.
- Consumers: Data Validator, Data Normalizer, Feature Extraction, AI Interpretation.
- Validation Rules: temporal window validity, geographic relevance, explicit source timestamp.
- Future Evolution: forecast and historical blending profiles.

## SoilDataset
- Purpose: provide soil and land-suitability context.
- Producer: DataCollector.
- Consumers: Data Validator, Data Normalizer, Feature Extraction, Spatial Analysis.
- Validation Rules: dataset coverage, confidence metadata, source version reference.
- Future Evolution: regional soil augmentations and category harmonization.

## UploadedDataset
- Purpose: represent user-provided professional geospatial assets.
- Producer: Request Manager and Data Collector.
- Consumers: Data Validator, Data Normalizer, Feature Extraction, Data Fusion.
- Validation Rules: supported format, ownership traceability, geometry compatibility, integrity status.
- Future Evolution: expanded professional formats and richer semantic classification.

## NormalizedDataset
- Purpose: canonical representation of validated source datasets.
- Producer: Data Normalizer.
- Consumers: Feature Extraction, Data Fusion, Spatial Analysis.
- Validation Rules: schema version conformity, source lineage map, unit normalization completeness.
- Future Evolution: mode-specific canonical profiles and regional schema variants.

## ExtractedFeature
- Purpose: deterministic feature signal derived from normalized evidence.
- Producer: Feature Extraction.
- Consumers: Data Fusion, Spatial Analysis, Scoring Engine, AI Interpretation.
- Validation Rules: feature lineage, feature confidence, supported feature taxonomy.
- Future Evolution: new feature families for specialized analysis modes.

## FusionResult
- Purpose: unified evidence model combining multi-source features.
- Producer: Data Fusion.
- Consumers: Spatial Analysis, Scoring Engine, AI Interpretation.
- Validation Rules: conflict resolution record, coverage summary, confidence envelope.
- Future Evolution: alternate evidence branch support and weighted fusion profiles.

## SpatialAnalysis
- Purpose: deterministic findings from geospatial reasoning.
- Producer: Spatial Analysis engine.
- Consumers: Scoring Engine, AI Interpretation, Report Generator.
- Validation Rules: finding taxonomy compliance, uncertainty indicators, geometry traceability.
- Future Evolution: temporal comparison and regional rule profiles.

## ScoreCard
- Purpose: decision-support scoring package.
- Producer: Scoring Engine.
- Consumers: AI Interpretation, Report Generator.
- Validation Rules: scoring profile ID, rationale completeness, confidence presence.
- Future Evolution: customizable score dimensions and vertical scorecards.

## AISummary
- Purpose: evidence-grounded narrative interpretation.
- Producer: AI Interpretation.
- Consumers: Report Generator.
- Validation Rules: references to supporting findings, caveat presence, recommendation bounds.
- Future Evolution: audience-specific narrative variants and multilingual outputs.

## Report
- Purpose: final user-facing intelligence output.
- Producer: Report Generator.
- Consumers: retrieval systems, user experience layer, audit workflows.
- Validation Rules: request linkage, source traceability, version metadata, publication status.
- Future Evolution: comparative portfolios, export variants, enterprise compliance sections.

## Contract Governance

- Contract meaning is owned by the producing engine.
- Consumers may validate but not reinterpret producer semantics.
- Version changes should be additive first.
- Deprecated fields require migration windows and explicit replacement guidance.
