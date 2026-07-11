# Analysis Type Manager

## Purpose

Determine which Land Intelligence Engine path should execute based on the user intent, available inputs, and expected output depth. The Analysis Type Manager is the policy layer that separates simple public-data analysis from professional integrated analysis.

## Responsibilities

- Classify the requested analysis mode.
- Map user inputs to an allowed analysis profile.
- Preserve mode-specific requirements.
- Expose the chosen analysis contract to downstream engines.
- Support future analysis mode expansion.

## Inputs

- User-selected analysis mode.
- Input completeness.
- Dataset availability.
- Spatial request metadata.
- Product policy constraints.

## Outputs

- Analysis type decision.
- Mode-specific execution profile.
- Required upstream data contract.
- Analysis eligibility result.

## Internal Workflow

- Inspect the user-selected mode.
- Confirm the requested mode is supported.
- Compare the mode against available inputs.
- Load the mode-specific execution profile.
- Publish the decision to the request context.

## Decision Rules

- Satellite Analysis is chosen when only coordinate-based public-data analysis is needed.
- Integrated Analysis is chosen when uploaded professional datasets are part of the request.
- Unsupported or ambiguous modes must fail early.
- The decision must remain stable for the lifetime of the request.

## Dependencies

- Request Manager.
- Input validation state.
- Policy and feature configuration.
- Supported mode registry.

## Failure Cases

- Unsupported analysis mode.
- Missing analysis mode selection.
- Conflicting mode and input combination.
- Attempt to change mode after orchestration has started.

## Future Evolution

- More specialized modes for vertical use cases.
- Dynamic capability negotiation based on dataset availability.
- Policy-driven analysis routing for enterprise customers.

## Open Questions

- Should the platform allow mode switching after partial validation.
- How should future specialized modes be prioritized.
- Whether mode selection should support assisted recommendations.
