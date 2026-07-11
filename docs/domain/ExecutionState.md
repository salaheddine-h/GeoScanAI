# Execution State

## Purpose

Execution State defines the canonical lifecycle for a Land Intelligence analysis from request creation to final report completion. The state model provides deterministic orchestration, observability, retry control, and consistent status semantics across both Satellite Analysis and Integrated Analysis.

## State Sequence

NEW -> VALIDATED -> PROVIDERS_SELECTED -> COLLECTING -> COLLECTED -> NORMALIZING -> NORMALIZED -> FEATURE_EXTRACTION -> FEATURES_READY -> FUSION -> FUSED -> SPATIAL_ANALYSIS -> ANALYSIS_READY -> SCORING -> SCORED -> AI_INTERPRETATION -> REPORT_GENERATION -> COMPLETED

## State Definitions

### NEW
- Purpose: request accepted and context initialized.
- Entry Conditions: request identity and user scope created.
- Exit Conditions: structural input checks start.
- Possible Errors: missing identity, malformed request envelope.
- Retry Strategy: safe retry with same request identity after envelope correction.

### VALIDATED
- Purpose: input and access checks completed.
- Entry Conditions: coordinate and request validation passed.
- Exit Conditions: mode locked and request declared eligible.
- Possible Errors: invalid coordinates, unauthorized access, mode mismatch.
- Retry Strategy: retry after user correction or authorization recovery.

### PROVIDERS_SELECTED
- Purpose: provider plan and fallback strategy finalized.
- Entry Conditions: analysis mode and spatial extent available.
- Exit Conditions: provider plan published to collector.
- Possible Errors: no eligible providers, unsupported regional coverage.
- Retry Strategy: retry with fallback policy or degraded source profile.

### COLLECTING
- Purpose: active acquisition of required source data.
- Entry Conditions: provider plan accepted.
- Exit Conditions: acquisition completes or partial success marked.
- Possible Errors: provider timeout, source unavailability, stale cache mismatch.
- Retry Strategy: bounded retries by provider with fallback sources.

### COLLECTED
- Purpose: source acquisition complete for current attempt.
- Entry Conditions: collection returns at least minimum required dataset set.
- Exit Conditions: validation of collected artifacts begins.
- Possible Errors: insufficient coverage, provenance gaps.
- Retry Strategy: re-collect missing categories when policy allows.

### NORMALIZING
- Purpose: conversion to canonical representations in progress.
- Entry Conditions: validated source set accepted.
- Exit Conditions: canonical dataset package generated.
- Possible Errors: schema mismatch, coordinate reference conflict.
- Retry Strategy: retry with alternate normalization profile.

### NORMALIZED
- Purpose: canonical data available for feature derivation.
- Entry Conditions: normalization succeeded with required confidence.
- Exit Conditions: feature extraction begins.
- Possible Errors: canonical completeness below threshold.
- Retry Strategy: attempt selective recollection then renormalize.

### FEATURE_EXTRACTION
- Purpose: feature derivation actively executing.
- Entry Conditions: normalized datasets present.
- Exit Conditions: feature package produced.
- Possible Errors: unsupported source semantics, sparse signal extraction.
- Retry Strategy: retry extraction with reduced feature profile.

### FEATURES_READY
- Purpose: feature package is complete for fusion.
- Entry Conditions: minimum required feature categories met.
- Exit Conditions: fusion process starts.
- Possible Errors: missing mandatory feature family.
- Retry Strategy: backtrack to collection or normalization if recoverable.

### FUSION
- Purpose: multi-source evidence fusion in progress.
- Entry Conditions: feature package and precedence rules available.
- Exit Conditions: unified evidence model produced.
- Possible Errors: irreconcilable source conflict, low fusion confidence.
- Retry Strategy: rerun fusion with alternate precedence policy.

### FUSED
- Purpose: fused evidence ready for deterministic analysis.
- Entry Conditions: conflict handling completed.
- Exit Conditions: spatial analysis starts.
- Possible Errors: critical ambiguity unresolved.
- Retry Strategy: return to feature extraction only if missing evidence can be added.

### SPATIAL_ANALYSIS
- Purpose: deterministic spatial reasoning in progress.
- Entry Conditions: fused evidence model available.
- Exit Conditions: spatial findings generated.
- Possible Errors: insufficient geometry context, contradictory spatial signals.
- Retry Strategy: rerun with constrained spatial scope when policy permits.

### ANALYSIS_READY
- Purpose: spatial findings prepared for scoring.
- Entry Conditions: required finding categories produced.
- Exit Conditions: scoring starts.
- Possible Errors: findings incomplete for score policy.
- Retry Strategy: return to spatial analysis with adjusted thresholds.

### SCORING
- Purpose: risk and suitability scoring in progress.
- Entry Conditions: spatial findings and confidence markers available.
- Exit Conditions: score package emitted.
- Possible Errors: unsupported scoring profile, low confidence aggregate.
- Retry Strategy: retry with fallback scoring profile.

### SCORED
- Purpose: scoring artifacts finalized.
- Entry Conditions: score package accepted by policy checks.
- Exit Conditions: AI interpretation starts.
- Possible Errors: missing rationale or confidence fields.
- Retry Strategy: deterministic regeneration from same findings.

### AI_INTERPRETATION
- Purpose: evidence-grounded narrative generation in progress.
- Entry Conditions: scoring package and provenance available.
- Exit Conditions: summary, caveats, and recommendations produced.
- Possible Errors: unsupported narrative policy, confidence mismatch.
- Retry Strategy: regenerate interpretation with stricter grounding profile.

### REPORT_GENERATION
- Purpose: final report assembly and registration in progress.
- Entry Conditions: AI summary and score package accepted.
- Exit Conditions: report reference generated and retrievable.
- Possible Errors: template mismatch, report registration failure.
- Retry Strategy: deterministic rerender with same interpretation package.

### COMPLETED
- Purpose: request lifecycle successfully finalized.
- Entry Conditions: report generated, versioned, and linked to analysis context.
- Exit Conditions: none; terminal success state.
- Possible Errors: none within terminal success state.
- Retry Strategy: not applicable; new execution required for regeneration.

## State Governance Rules

- State transitions are forward-only for primary lifecycle events.
- Retries re-enter the same stage or a designated safe predecessor, not an arbitrary state.
- Every transition must be logged with timestamp and correlation references.
- Terminal failure handling should preserve the latest successful state for diagnostics.
