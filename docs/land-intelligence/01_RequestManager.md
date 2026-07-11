# Request Manager

## Purpose

Coordinate the lifecycle of a land intelligence request from user submission to analysis orchestration. The Request Manager owns request identity, traceability, and execution context.

## Responsibilities

- Accept and register new analysis requests.
- Assign request identifiers and execution metadata.
- Preserve traceability across the full engine chain.
- Route requests to the correct analysis path.
- Track request state transitions.

## Inputs

- User intent to analyze land.
- Coordinates or spatial reference.
- Selected analysis type.
- Authentication and tenancy context.
- Optional uploaded asset references.

## Outputs

- Normalized request envelope.
- Execution context for downstream engines.
- Request status updates.
- Correlation identifiers for logging and reporting.

## Internal Workflow

- Receive the user request.
- Create a stable request context.
- Validate that the request is structurally complete.
- Determine the target analysis path.
- Forward the request to the next engine in sequence.
- Record lifecycle transitions for observability.

## Decision Rules

- Reject requests that cannot be traced to a valid user or project context.
- Preserve one canonical request identity across all downstream engines.
- Route by analysis mode rather than by presentation choice.
- Maintain request state even if downstream processing is partial.

## Dependencies

- Authentication context.
- Analysis type classification.
- Logging and monitoring substrate.
- Downstream engine availability.

## Failure Cases

- Missing or invalid request context.
- Duplicate or conflicting request submission.
- Unsupported analysis mode.
- Loss of traceability identifiers.
- Downstream orchestration failure.

## Future Evolution

- Asynchronous job registration.
- Cross-session request recovery.
- Multi-step request composition.
- Enterprise workflow approvals.

## Open Questions

- Should requests be globally unique or project-scoped.
- Which request states must be persisted long term.
- When should the system allow user cancellation.
- How should retries map to request identity.
