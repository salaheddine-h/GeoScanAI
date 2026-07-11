# AI Interpretation

## Purpose

Translate structured analysis and scoring output into human-readable intelligence, including findings, caveats, and recommended next steps. AI Interpretation should remain grounded in the evidence produced by earlier engines.

## Responsibilities

- Generate readable analytical summaries.
- Explain key findings and limitations.
- Reference the evidence basis for interpretations.
- Produce recommendations aligned with the analysis mode.
- Preserve uncertainty and confidence language.

## Inputs

- Spatial findings.
- Score package.
- Source provenance.
- Mode context.
- Report intent.

## Outputs

- AI summary.
- Recommendation set.
- Narrative caveats.
- Interpretation confidence markers.

## Internal Workflow

- Receive the scored evidence package.
- Select the appropriate interpretation frame.
- Convert structured findings into narrative form.
- Surface confidence and uncertainty.
- Publish the interpretation to report generation.

## Decision Rules

- AI output must remain grounded in upstream evidence.
- Recommendations should not exceed source confidence.
- Interpretation depth should vary by analysis mode.
- The system should prefer clarity over verbosity.

## Dependencies

- Scoring Engine.
- Provenance metadata.
- Interpretation policy.
- Report requirements.

## Failure Cases

- Insufficient evidence for responsible interpretation.
- Hallucinated or unsupported summary content.
- Misalignment between scores and narrative.
- Inability to preserve caveats.

## Future Evolution

- Mode-specific interpretation styles.
- Specialized models for vertical industries.
- Retrieval-augmented explanation layers.

## Open Questions

- How much of the underlying score logic should be exposed.
- Which recommendation types are allowed per mode.
- How to present uncertain or conflicting evidence.
