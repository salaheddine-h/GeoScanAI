# Pipeline Contract

## Purpose

Pipeline Contract defines how each Land Intelligence engine receives inputs, validates prerequisites, processes responsibilities, emits artifacts, and hands control to the next engine. It is the canonical handoff specification for v1.

## Contract Pattern

Every engine follows the same pattern:

Input -> Validation -> Processing -> Output -> Next Engine

## Engine Contracts

### 01 Request Manager
- Input: user analysis request, user scope, initial coordinates.
- Validation: request envelope completeness, identity traceability.
- Processing: create request identity and base analysis context.
- Output: request envelope, correlation metadata, lifecycle initialization.
- Next Engine: Analysis Type Manager.
- Dependencies: identity and project context.
- Produced Artifacts: requestId, analysisContext root, initial lifecycle log.

### 02 Analysis Type Manager
- Input: request envelope, user-selected mode, input availability.
- Validation: supported mode, mode-input compatibility.
- Processing: lock analysis mode and execution profile.
- Output: analysis mode decision, eligibility status.
- Next Engine: Provider Manager.
- Dependencies: policy registry, mode catalog.
- Produced Artifacts: mode contract, mode-specific constraints.

### 03 Provider Manager
- Input: analysis mode, spatial extent, source requirements.
- Validation: provider capability, regional coverage, fallback availability.
- Processing: build provider selection and fallback plan.
- Output: provider plan and precedence matrix.
- Next Engine: Data Collector.
- Dependencies: provider catalog, provider health state.
- Produced Artifacts: provider selection set, fallback chain.

### 04 Data Collector
- Input: provider plan, spatial extent, upload references, cache references.
- Validation: source reachability, reference validity.
- Processing: collect public and uploaded evidence.
- Output: raw source payload references with provenance.
- Next Engine: Data Validator.
- Dependencies: external providers, storage and cache.
- Produced Artifacts: collection bundle, acquisition metadata.

### 05 Data Validator
- Input: collection bundle, provenance metadata, validation policy.
- Validation: structural, spatial, metadata, format integrity checks.
- Processing: accept/reject source artifacts, produce validation outcomes.
- Output: validated source set and rejection report.
- Next Engine: Data Normalizer.
- Dependencies: format rules, policy profile.
- Produced Artifacts: validation report, accepted source subset.

### 06 Data Normalizer
- Input: validated sources, schema mappings, spatial reference rules.
- Validation: canonical mapping availability and semantic compatibility.
- Processing: transform sources into canonical normalized forms.
- Output: normalized dataset package.
- Next Engine: Feature Extraction.
- Dependencies: canonical schema definitions.
- Produced Artifacts: normalized datasets, normalization lineage map.

### 07 Feature Extraction
- Input: normalized package, feature policy, analysis mode.
- Validation: feature prerequisites and minimum source quality.
- Processing: derive features and confidence markers.
- Output: extracted feature package.
- Next Engine: Data Fusion.
- Dependencies: domain feature catalog.
- Produced Artifacts: feature set, feature provenance, feature confidence.

### 08 Data Fusion
- Input: feature package, source precedence rules, confidence policy.
- Validation: compatibility and minimum evidence coverage.
- Processing: merge multi-source evidence and resolve conflicts.
- Output: fused evidence model.
- Next Engine: Spatial Analysis.
- Dependencies: precedence policy, conflict strategy.
- Produced Artifacts: fusion result, conflict log, coverage summary.

### 09 Spatial Analysis
- Input: fused evidence model, geometry context, spatial rules.
- Validation: geometry integrity and spatial readiness.
- Processing: derive deterministic spatial findings.
- Output: spatial findings package.
- Next Engine: Scoring Engine.
- Dependencies: spatial rule set, contextual constraints.
- Produced Artifacts: spatial findings, uncertainty markers.

### 10 Scoring Engine
- Input: spatial findings, confidence markers, scoring profile.
- Validation: score policy compatibility and evidence sufficiency.
- Processing: generate risk and suitability scoring package.
- Output: score card and rationale.
- Next Engine: AI Interpretation.
- Dependencies: scoring policy and calibration profile.
- Produced Artifacts: score card, scoring rationale, score confidence.

### 11 AI Interpretation
- Input: score card, spatial findings, provenance, mode context.
- Validation: grounding completeness and interpretation policy checks.
- Processing: generate narrative interpretation and recommendations.
- Output: AI summary package.
- Next Engine: Report Generator.
- Dependencies: interpretation policy and guardrails.
- Produced Artifacts: narrative summary, recommendations, caveats.

### 12 Report Generator
- Input: AI summary package, score card, request metadata.
- Validation: report composition requirements and traceability completeness.
- Processing: assemble final report and report metadata.
- Output: report artifact and retrieval reference.
- Next Engine: terminal lifecycle transition.
- Dependencies: report policy and storage registration.
- Produced Artifacts: report record, report version, publication metadata.

## Dependency Model

- Upstream dependencies are explicit and versioned by contract.
- No engine may consume undeclared artifacts.
- Contract changes require backward compatibility planning.
- Mode-specific behavior is represented through policy fields, not custom engine wiring.

## Artifact Governance

- Every artifact must include source lineage references.
- Confidence fields are mandatory for non-trivial derived artifacts.
- Artifacts are append-only in Analysis Context.
- Artifact producer is the owner of semantic definition.
