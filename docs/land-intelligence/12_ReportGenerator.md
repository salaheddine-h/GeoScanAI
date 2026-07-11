# Report Generator

## Purpose

Assemble the final land intelligence report from scores, interpretations, and evidence. The Report Generator is the last engine in the sequence and produces the user-facing outcome.

## Responsibilities

- Compose the final report structure.
- Format findings for the selected analysis mode.
- Include evidence, confidence, and caveat sections.
- Prepare report metadata and retrieval references.
- Support report versioning and future export formats.

## Inputs

- AI interpretation.
- Score package.
- Evidence summary.
- Request context.
- Report policy and templates.

## Outputs

- Smart report or advanced report.
- Report metadata.
- Retrieval reference.
- Report version record.

## Internal Workflow

- Read the final interpretation package.
- Compose the report narrative and structured sections.
- Attach source references and confidence notes.
- Register the report for retrieval and history.
- Publish the final report outcome.

## Decision Rules

- Reports must reflect the selected analysis mode.
- Every report must remain traceable to its request and sources.
- Report wording should stay professional and decision-oriented.
- Versioning should preserve previous report states when regenerated.

## Dependencies

- AI Interpretation.
- Scoring Engine.
- Storage and retrieval context.
- Report format policy.

## Failure Cases

- Missing interpretation or score package.
- Report assembly failure.
- Incomplete source traceability.
- Unsupported report structure.

## Future Evolution

- Comparative reports.
- Exportable briefing formats.
- Team and enterprise report bundles.
- Specialized templates by industry or analysis mode.

## Open Questions

- How many report types should be supported in v1.
- Whether reports should be regenerated or versioned by default.
- Which report sections are mandatory across all modes.
