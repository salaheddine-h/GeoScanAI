# Data Normalizer

## Purpose

Convert heterogeneous source data into a consistent internal representation that downstream engines can consume reliably. The Data Normalizer is the bridge between raw source acquisition and structured analysis.

## Responsibilities

- Standardize spatial references and coordinate systems.
- Normalize field names, units, and data structures.
- Align timestamps and acquisition context.
- Separate raw payloads from analysis-ready records.
- Maintain normalization provenance.

## Inputs

- Validated source payloads.
- Validation results.
- Acquisition metadata.
- Reference schemas.

## Outputs

- Normalized data objects.
- Canonical spatial context.
- Standardized metadata.
- Normalization trace records.

## Internal Workflow

- Accept the validated source set.
- Map each source to the internal canonical shape.
- Normalize units, labels, and coordinate references.
- Resolve structural differences across providers.
- Publish analysis-ready records.

## Decision Rules

- Preserve source meaning even when structures differ.
- Do not infer missing facts during normalization.
- Normalize only what can be represented with confidence.
- Keep raw and normalized forms traceable to each other.

## Dependencies

- Data Validator.
- Canonical schema definitions.
- Spatial reference policies.
- Source provenance metadata.

## Failure Cases

- Incompatible geometry representations.
- Unsupported units or coordinate systems.
- Incomplete schema mapping.
- Conflicting metadata across sources.

## Future Evolution

- Deeper schema harmonization across provider families.
- Regional normalization profiles.
- Semantic normalization for uploaded professional datasets.

## Open Questions

- Which transformations should be reversible.
- Whether every source family needs its own canonical profile.
- How much metadata should be carried forward by default.
