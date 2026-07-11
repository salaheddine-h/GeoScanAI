# Land Intelligence Engine v1

## Engine Communication

The Land Intelligence Engine works as a modular sequence of independent engines. Each engine receives a well-defined input contract, performs one responsibility, and produces a stable output for the next engine. The architecture is intentionally reusable so that each engine can later be invoked in other workflows without changing its internal purpose.

The communication model is primarily linear:

Request Manager -> Analysis Type Manager -> Provider Manager -> Data Collector -> Data Validator -> Data Normalizer -> Feature Extraction -> Data Fusion -> Spatial Analysis -> Scoring Engine -> AI Interpretation -> Report Generator

Some engines may also exchange side-channel metadata such as provenance, logging context, and confidence signals. Those side channels should not change the core execution order.

## Execution Order

1. Request Manager
2. Analysis Type Manager
3. Provider Manager
4. Data Collector
5. Data Validator
6. Data Normalizer
7. Feature Extraction
8. Data Fusion
9. Spatial Analysis
10. Scoring Engine
11. AI Interpretation
12. Report Generator

This order reflects the primary synchronous execution path for a land intelligence request. Each engine should remain independently testable even though the overall workflow is coordinated.

## Complete Lifecycle

- The request is accepted and turned into a stable execution context.
- The analysis mode is resolved and locked for the request.
- Providers are selected based on coverage, quality, and mode requirements.
- Public and uploaded data are collected.
- All inputs are validated and normalized.
- Features are extracted from the normalized evidence set.
- Evidence is fused into a single analytical view.
- Spatial relationships and land context are analyzed.
- Risk and suitability scores are produced.
- AI interprets the result into human-readable intelligence.
- The final report is generated and registered for retrieval.

## Synchronous Engines

These engines should be synchronous in the first version because they are part of the core request path and the user expects a coherent final result:

- Request Manager
- Analysis Type Manager
- Provider Manager
- Data Validator
- Data Normalizer
- Feature Extraction
- Data Fusion
- Spatial Analysis
- Scoring Engine
- AI Interpretation
- Report Generator

## Engines That Can Become Asynchronous

These engines can later become asynchronous when request volume, provider latency, or payload size increases:

- Data Collector
- Provider Manager
- Report Generator
- AI Interpretation
- Feature Extraction for expensive datasets
- Spatial Analysis for heavy geoprocessing workloads

A future asynchronous design should preserve the same contracts while moving execution into background job handling and progress tracking.

## Future Microservices

The following engines are strong candidates for independent microservices in a later phase:

- Data Collector
- Provider Manager
- AI Interpretation
- Report Generator
- Scoring Engine
- Spatial Analysis

The following engines are better kept close to the orchestration layer unless scale demands separation:

- Request Manager
- Analysis Type Manager
- Data Validator
- Data Normalizer
- Feature Extraction
- Data Fusion

## Design Principles

- Every engine owns one primary responsibility.
- No engine should depend on presentation concerns.
- No engine should require implementation details from a neighboring engine.
- Failure in one engine should be observable and attributable.
- Future service extraction should not change the public concept of the engine.
