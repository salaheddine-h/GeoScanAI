# Analysis Context

## Purpose

Analysis Context is the canonical domain object shared by all Land Intelligence engines. It carries request identity, execution state, evidence artifacts, and final outputs across the full lifecycle. The objective is to guarantee traceability, consistency, and deterministic handoff between engines.

## Lifecycle

- The context is created once at request intake.
- Each engine reads from the current context and appends its own outputs.
- Existing fields are never removed.
- Engine-owned sections are append-only outside the owning engine.
- The context reaches terminal state when report generation completes or a terminal failure is recorded.

## Ownership

- Request-level identity fields are owned by Request Manager.
- Mode and eligibility fields are owned by Analysis Type Manager.
- Provider plan is owned by Provider Manager.
- Raw source payload references are owned by Data Collector.
- Validation results are owned by Data Validator.
- Canonical representations are owned by Data Normalizer.
- Feature outputs are owned by Feature Extraction.
- Unified evidence is owned by Data Fusion.
- Spatial findings are owned by Spatial Analysis.
- Scoring artifacts are owned by Scoring Engine.
- Narrative interpretation is owned by AI Interpretation.
- Final report artifacts are owned by Report Generator.

No engine may overwrite another engine-owned section except to append state-safe metadata such as processing timestamps, non-destructive warnings, or correlation references.

## Request Identity

### Request Identity

- Purpose: stable identity for one user-triggered operation.
- Fields: requestId, requestVersion, createdAt, initiatedBy, tenantScope.
- Rule: immutable after creation.

### Analysis Identity

- Purpose: identity for a specific analytical execution tied to one request.
- Fields: analysisId, analysisMode, analysisProfile, executionPolicy.
- Rule: analysisMode is locked once validated.

### User Identity

- Purpose: accountability, access scope, and audit context.
- Fields: userId, organizationId, projectId, roleSet.
- Rule: must be present before provider selection.

## Spatial Core

### Coordinates

- Includes source coordinate pair and optional user-provided geometry hints.
- Stores validation status and coordinate precision metadata.

### Bounding Box

- Stores derived analysis extent used for provider queries and spatial operations.
- Preserves derivation method and boundary assumptions.

## Data Acquisition and Provenance

### Providers

- Selected provider set, provider precedence, fallback chain, and provider health snapshot.

### Datasets

- Public dataset references, uploaded dataset references, acquisition timestamps, and coverage indicators.

### Cache References

- Cache keys, retrieval timestamps, and cache validity decisions.
- Must include data freshness rationale when cache is used.

## Transformation and Evidence

### Normalized Data

- Canonical representations produced by Data Normalizer.
- Includes schema version, unit normalization notes, and source lineage mapping.

### Extracted Features

- Structured features produced from normalized evidence.
- Includes feature confidence and source link metadata.

### Fusion Results

- Unified evidence package and conflict resolution outcomes.
- Includes coverage completeness and ambiguity markers.

### Spatial Results

- Deterministic spatial findings and contextual constraints.
- Includes uncertainty where spatial coverage is incomplete.

## Decision Outputs

### Scores

- Risk, suitability, confidence, and rationale artifacts.
- Includes scoring policy identifier and calibration context.

### AI Summary

- Evidence-grounded interpretation, caveats, and recommendations.
- Includes interpretation confidence and guardrail flags.

### Reports

- Final report references, report version, publication status, and retrieval metadata.

## Cross-Cutting Metadata

### Metadata

- Correlation IDs, timing metrics, policy versions, and execution annotations.

### Logs

- Structured event references for request lifecycle and engine-level diagnostics.
- The context stores log references, not raw log payloads.

## Extension Model

### Future Extensions

- New source families should be added as non-breaking extension sections.
- New engine outputs should append versioned subcontracts.
- Extension fields must not change meaning of existing canonical fields.
- Existing consumers should continue working when extension fields are absent.

## Context Integrity Rules

- One context per analysis execution.
- Append-only updates to preserve lineage.
- Explicit ownership boundaries by engine.
- No implicit field mutation by downstream engines.
- All outputs must remain traceable to request and source lineage.
