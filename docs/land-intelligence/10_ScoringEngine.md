# Scoring Engine

## Purpose

Convert spatial findings into interpretable scores that help users understand suitability, risk, and confidence. The Scoring Engine turns analysis output into a decision-support layer.

## Responsibilities

- Generate risk and suitability scores.
- Apply scoring policy across analysis modes.
- Normalize scores for report presentation.
- Expose score explanations and confidence notes.
- Maintain score comparability over time.

## Inputs

- Spatial findings.
- Feature confidence.
- Fusion confidence.
- Mode-specific scoring policy.

## Outputs

- Risk score.
- Suitability score.
- Confidence score.
- Score rationale.

## Internal Workflow

- Read structured spatial findings.
- Apply the selected scoring policy.
- Generate category-level scores.
- Consolidate score rationale.
- Publish the scoring package.

## Decision Rules

- Scores must reflect evidence quality.
- Low-confidence evidence should lower the overall certainty.
- Integrated analysis may expose richer scoring dimensions.
- Scoring must remain transparent and explainable.

## Dependencies

- Spatial Analysis.
- Confidence rules.
- Mode policies.
- Domain scoring model.

## Failure Cases

- Not enough evidence to score responsibly.
- Conflicting signals across score inputs.
- Unsupported scoring profile.
- Overly noisy or incomplete context.

## Future Evolution

- Vertical-specific score profiles.
- Comparative scoring across multiple properties.
- Customer-configurable scoring priorities.

## Open Questions

- Which scores are canonical versus optional.
- How much score precision the platform should expose.
- Whether score calibration should vary by geography.
