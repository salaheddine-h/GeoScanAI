# Feature Extraction

## Purpose

Derive meaningful spatial and contextual signals from normalized data so the engine can reason about land characteristics in a structured way. Feature Extraction turns raw context into analytical evidence.

## Responsibilities

- Extract terrain, land-cover, weather, soil, and spatial context signals.
- Derive summary features from uploaded professional datasets.
- Produce comparable metrics across source types.
- Preserve provenance for each extracted feature.
- Separate factual features from interpretive outputs.

## Inputs

- Normalized data.
- Spatial context.
- Dataset classifications.
- Feature policy rules.

## Outputs

- Feature set.
- Feature confidence indicators.
- Source-linked feature metadata.
- Analysis-ready evidence.

## Internal Workflow

- Read the normalized source set.
- Identify extractable signals by source type.
- Derive structured features from each signal.
- Attach provenance and confidence metadata.
- Publish the feature set to the analysis layer.

## Decision Rules

- Only derive features supported by the available data.
- Avoid overstating precision beyond source quality.
- Preserve feature-source lineage.
- Support different feature depth by analysis mode.

## Dependencies

- Data Normalizer.
- Source semantics.
- Domain feature catalog.
- Confidence rules.

## Failure Cases

- No extractable signal in the source set.
- Inconsistent feature semantics across sources.
- Low-confidence or ambiguous feature derivation.
- Data insufficient for required feature categories.

## Future Evolution

- Mode-specific feature libraries.
- Learning-based feature ranking.
- Specialized features for vertical industries.

## Open Questions

- Which features are universal versus mode-specific.
- How to score low-confidence features.
- How to represent derived features from future sensors.
