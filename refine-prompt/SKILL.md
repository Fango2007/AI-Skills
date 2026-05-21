---
name: refine-prompt
description: Refine user-written prompts into clear, idiomatic English while preserving the user's original intent, scope, and level of detail. Use when the user asks Codex to improve, clarify, rewrite, disambiguate, or strengthen a prompt; when the user is not a native English speaker and wants better wording; when a prompt for a coding agent, AI agent, feature request, Spec Kit/specification workflow, implementation request, review request, or task brief needs clearer language without adding new requirements or technical choices; or when the user wants clarifying questions before finalizing a prompt.
---

# Refine Prompt

## Goal

Transform the user's draft into a clearer prompt. Improve English, collocations, grammar, structure, and precision without changing the user's intended meaning or adding content the user did not provide.

Use the broader `refine-prompt` behavior for any prompt-writing issue. For coding-agent feature prompts, apply the stricter feature workflow below.

## Core Workflow

1. Identify the prompt's subject, intent, and explicitly stated requirements.
2. Improve wording, sentence structure, grammar, terminology, and readability.
3. Remove ambiguity only when it can be removed by rephrasing the user's existing content.
4. Preserve unresolved details as unresolved. Do not fill gaps with assumptions, examples, acceptance criteria, constraints, or agent-facing instructions.
5. Ask concise clarifying questions only when the prompt cannot be faithfully rewritten without choosing between multiple possible meanings.

## Clarification Rules

Ask questions before rewriting only when the user's wording has multiple plausible meanings and a rewrite would change the intended content.

Do not ask questions merely because a feature description omits details that another workflow step may define later, such as actors, edge cases, acceptance criteria, permissions, data retention, imports, exports, or non-goals.

Do not infer what the receiving agent expects. Do not add meta-instructions such as "keep this functional", "do not make technical choices", or "provide acceptance criteria" unless the user included that instruction in the draft.

Keep questions focused. Prefer 1-5 questions. If the user says another workflow step will resolve open points, refine the prompt without blocking and preserve those open points as written.

## Feature Prompt Rules

When refining a feature description for a coding agent or Spec Kit-style workflow:

- Keep the prompt functional and product-oriented.
- Preserve the user's stated requirements and level of detail.
- Rephrase vague wording only as far as the original meaning supports.
- Do not add actors, user goals, flows, validation rules, error states, permissions, acceptance criteria, non-goals, examples, or success criteria unless they are already present in the draft.
- Do not choose architecture, frameworks, libraries, database schemas, API designs, file structures, implementation patterns, or test frameworks.
- Do not turn the feature prompt into an implementation plan or a specification.
- Do not append instructions about how another agent should interpret the prompt unless the user explicitly asks for that.

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

Omit `Notes` by default. Use notes only to flag a wording ambiguity that could not be resolved without changing meaning.

## Quality Checklist

Before finalizing, verify that the refined prompt:

- Uses clear, idiomatic English.
- Preserves the user's original intent, scope, and level of detail.
- Does not expand the prompt with missing requirements.
- Does not add agent-facing meta-instructions.
- Keeps vague qualifiers when replacing them would require a new product decision.
- Avoids unnecessary technical choices.
- Contains no hidden assumptions presented as facts.
