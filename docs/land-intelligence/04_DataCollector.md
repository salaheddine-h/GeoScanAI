# Data Collector

## Purpose

Gather all required source data for an analysis request from public providers, cached sources, and uploaded datasets. The Data Collector is responsible for assembling the evidence set before normalization and analysis.

## Responsibilities

- Fetch data from selected providers.
- Collect supporting spatial and environmental context.
- Retrieve cached artifacts when valid.
- Assemble uploaded dataset references for integrated analysis.
- Preserve acquisition context and provenance.

## Inputs

- Request envelope.
- Provider plan.
- Spatial extent.
- Uploaded file references.
- Cache and storage references.

## Outputs

- Raw source payloads.
- Acquisition metadata.
- Provenance records.
- Collection completeness summary.

## Internal Workflow

- Receive the provider plan.
- Query external providers.
- Retrieve supporting internal artifacts.
- Collect uploaded dataset references when present.
- Package source responses with provenance metadata.

## Decision Rules

- Collect only the sources required for the selected analysis mode.
- Prefer fresh data when the request depends on current conditions.
- Use cached artifacts only when they remain valid for the request.
- Preserve source identity and acquisition time for every item.

## Dependencies

- Provider Manager.
- Storage and cache availability.
- Uploaded dataset registry.
- Network access to approved sources.

## Failure Cases

- Provider timeout.
- Partial data retrieval.
- Stale or invalid cache entry.
- Missing uploaded artifact reference.
- Incomplete provenance capture.

## Future Evolution

- Streaming acquisition for large spatial extents.
- Background collection for slow or rate-limited providers.
- Source prioritization by region and user tier.

## Open Questions

- How to represent partial collection success.
- Which sources should be cached by default.
- What acquisition data must be retained for audit.
