---
name: refine-prompt
description: Refine user-written prompts into clear, precise English with explicit intent, constraints, scope, and success criteria. Use when the user asks Codex to improve, clarify, rewrite, disambiguate, or strengthen a prompt; when the user is not a native English speaker and wants better wording; when a prompt for a coding agent, AI agent, feature request, Spec Kit/specification workflow, implementation request, review request, or task brief may be vague, ambiguous, or likely to make an agent infer missing details; or when the user wants clarifying questions before finalizing a prompt.
---

# Refine Prompt

## Goal

Transform the user's draft into a prompt that another AI agent can execute with minimal inference. Improve English, collocations, grammar, structure, and precision without changing the user's intended meaning.

Use the broader `refine-prompt` behavior for any prompt-writing issue. For coding-agent feature prompts, apply the stricter feature workflow below.

## Core Workflow

1. Identify the target agent, task type, desired output, and any explicit constraints.
2. Detect ambiguity, missing facts, vague words, hidden assumptions, conflicting requirements, and places where an agent would need to infer intent.
3. Ask concise clarifying questions when required facts are missing. Do not finalize a prompt that still depends on a product, workflow, data, policy, or acceptance decision the user has not provided.
4. If the draft is clear enough, rewrite it in natural, precise English.
5. Preserve the user's intent and level of abstraction. Do not add technical decisions, requirements, examples, or constraints unless they are stated by the user or clearly labeled as optional questions.

## Clarification Rules

Ask questions before rewriting when any of these are unclear:

- The real objective or user problem.
- The target user, actor, or system boundary.
- Required behavior, edge cases, or acceptance criteria.
- Inputs, outputs, states, permissions, error handling, or data retention.
- Scope, non-goals, dependencies, or sequencing.
- The expected deliverable format.
- Any phrase such as "simple", "better", "optimized", "intuitive", "robust", "fast", "secure", "modern", "user-friendly", "as needed", or "etc." without concrete meaning.

Keep questions focused. Prefer 3-7 questions. If there are many gaps, ask only the questions needed to remove the biggest inference risks first.

## Feature Prompt Rules

When refining a feature description for a coding agent or Spec Kit-style workflow:

- Keep the prompt functional and product-oriented.
- Describe what the feature must do and how users should experience it.
- Include actors, user goals, main flows, alternate flows, validation rules, error states, permissions, and acceptance criteria when known.
- Include explicit non-goals when the draft implies boundaries.
- Do not choose architecture, frameworks, libraries, database schemas, API designs, file structures, implementation patterns, or test frameworks unless the user already provided them.
- Do not turn the feature prompt into an implementation plan.
- Replace vague feature language with observable behavior.

## Output Format

When clarification is needed, output:

```markdown
I need to clarify these points before writing the final prompt:

1. ...
2. ...
```

When the prompt can be rewritten, output:

```markdown
Refined prompt:

...

Notes:
- ...
```

Omit `Notes` when there is nothing important to flag. Use notes only for preserved assumptions, wording changes that may affect meaning, or optional improvements the user may want to decide later.

## Quality Checklist

Before finalizing, verify that the refined prompt:

- Uses clear, idiomatic English.
- Has one explicit objective.
- Defines the expected output.
- Avoids vague qualifiers or replaces them with observable criteria.
- Separates requirements from optional preferences.
- Avoids unnecessary technical choices.
- Contains no hidden assumptions presented as facts.
- Gives the receiving agent enough context to act without guessing.
