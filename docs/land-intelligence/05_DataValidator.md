# Data Validator

## Purpose

Ensure that all collected and uploaded inputs are structurally valid, policy-compliant, and suitable for downstream processing. The Data Validator protects the engine from malformed, incomplete, or misleading input.

## Responsibilities

- Validate coordinates, spatial bounds, and dataset references.
- Confirm file integrity and format compatibility.
- Check required metadata and provenance fields.
- Detect unsupported or unsafe inputs.
- Produce validation outcomes for each source.

## Inputs

- Raw source payloads.
- Uploaded dataset metadata.
- Request coordinates and spatial envelope.
- Validation policy rules.

## Outputs

- Validation status.
- Error and warning list.
- Accepted source set.
- Rejected source set.

## Internal Workflow

- Inspect every incoming source.
- Validate spatial and metadata constraints.
- Confirm file and dataset compatibility.
- Flag missing or ambiguous elements.
- Publish the validation result set.

## Decision Rules

- Reject clearly malformed or unsupported inputs.
- Allow partial success when some sources remain valid.
- Require explicit provenance for professional datasets.
- Use stricter checks for integrated analysis than for satellite analysis.

## Dependencies

- Request context.
- Data Collector.
- Source format registry.
- Validation policy rules.

## Failure Cases

- Invalid coordinates.
- Corrupt or unsupported file formats.
- Missing source metadata.
- Conflicting spatial references.
- Unclear dataset ownership or provenance.

## Future Evolution

- Richer dataset fingerprinting.
- Automated semantic classification of uploaded files.
- Policy-based validation profiles by customer segment.

## Open Questions

- Which validation failures should be recoverable.
- How strict file format checks should be for future formats.
- Whether validation should expose suggested fixes.
