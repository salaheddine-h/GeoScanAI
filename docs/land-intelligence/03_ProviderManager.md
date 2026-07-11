# Provider Manager

## Purpose

Select and coordinate the external and internal providers required to satisfy an analysis request. The Provider Manager abstracts provider choice so the rest of the engine remains stable.

## Responsibilities

- Determine which providers are relevant for the request.
- Maintain provider availability and capability metadata.
- Prioritize preferred providers when multiple options exist.
- Enforce fallback ordering.
- Publish source selection decisions to downstream engines.

## Inputs

- Request context.
- Analysis type.
- Spatial extent.
- Dataset requirements.
- Provider health and capability state.

## Outputs

- Selected provider set.
- Provider execution order.
- Fallback plan.
- Source availability summary.

## Internal Workflow

- Read the request requirements.
- Determine which source categories are needed.
- Match categories to available providers.
- Apply precedence and fallback policy.
- Publish the provider plan to the collection layer.

## Decision Rules

- Use the smallest provider set that can satisfy the request.
- Prefer authoritative sources over redundant sources when both are available.
- Respect regional coverage and data freshness.
- Defer to cached or local context only when it remains valid.

## Dependencies

- Analysis Type Manager.
- Provider catalog.
- Provider health signals.
- Source availability metadata.

## Failure Cases

- No suitable provider available.
- Provider capability mismatch.
- Invalid geographic coverage.
- Inability to determine source precedence.

## Future Evolution

- Provider scoring based on quality and latency.
- Adaptive provider selection by use case.
- Regional provider specialization.
- Enterprise override policies.

## Open Questions

- Should provider precedence be global or request-specific.
- How to represent provider quality over time.
- Which sources may be treated as interchangeable.
