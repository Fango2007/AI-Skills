# AI Skills

This repository contains reusable AI-agent skills. Each skill is a focused workflow packaged as a directory with a `SKILL.md` file, optional reference material, scripts, and agent configuration. They can be used with Codex, but the workflows are not inherently Codex-only.

## Skills

| Skill | Purpose |
| --- | --- |
| [`boost-agent-outcomes`](boost-agent-outcomes/SKILL.md) | Evaluates, compares, ranks, strengthens, and merges outputs from coding AI agents. Use it to find weak reasoning, missing assumptions, risky technology choices, logic gaps, test gaps, unsupported claims, or to synthesize multiple agent responses into a stronger engineering artifact. |
| [`linkedin-job-shortlist`](linkedin-job-shortlist/SKILL.md) | Extracts, evaluates, ranks, and exports LinkedIn job opportunities for a candidate. It defines careful LinkedIn browsing limits, a reviewed candidate baseline, qualification gates, requirement extraction, market requirement statistics, red flag detection, and spreadsheet output for shortlists. |
| [`public-writer`](public-writer/SKILL.md) | Helps shape AI-related LinkedIn post ideas while preserving the user's voice. It requires an interview-first workflow, challenges vague ideas, uses saved writing memory, and produces grounded outlines instead of generic social media copy. |
| [`refine-prompt`](refine-prompt/SKILL.md) | Rewrites user-written prompts into clearer, idiomatic English while preserving the original intent, scope, and level of detail. It improves wording without adding new requirements, assumptions, architecture choices, or hidden implementation instructions. |
| [`spec-review`](spec-review/SKILL.md) | Reviews technical specifications, product requirements, architecture docs, API specs, RFCs, ADRs, and implementation plans. It assesses completeness, clarity, feasibility, testability, security, observability, architecture quality, and implementation readiness using relevant engineering criteria. |

## Repository Layout

Each skill directory follows the same basic pattern:

- `SKILL.md`: primary skill instructions, trigger conditions, workflow, and output format.
- `agents/openai.yaml`: agent configuration for the skill.
- `references/`: optional supporting material used by the skill.
- `scripts/`: optional helper scripts used by the skill.

## Skill Details

### boost-agent-outcomes

Use this skill when multiple coding-agent outputs need to be assessed or combined. It supports four common modes:

- `diagnose`: identify strengths, weaknesses, reliability risks, and missing context.
- `merge`: synthesize the strongest supported ideas into one improved plan, review, or implementation direction.
- `boost`: create targeted feedback or a follow-up prompt for a weaker agent.
- `rank`: compare outputs and explain which is strongest, weakest, and why.

### linkedin-job-shortlist

Use this skill for LinkedIn job-search workflows that need structured scoring and safe browsing behavior. It limits detail-page inspection to small batches, waits between detail-page views, avoids older postings by default, stops on rate-limit or authentication warnings, and scopes extraction to the active job detail pane instead of whole-page text.

Before scoring, the skill loads or creates a candidate baseline at `outputs/linkedin_job_shortlist/candidate_baseline.yml`. The baseline separates resume-evidenced skills, adjacent capabilities, missing capabilities, and user-confirmed corrections so role scoring does not over-infer from a CV or from job-title similarity.

The scoring model covers AI relevance, hands-on engineering depth, role/title fit, location and work mode, compensation or contract fit, seniority, and red flags. It also applies qualification gates for central minimum requirements, production AI delivery, backend/product engineering depth, and missing stack evidence. Critical minimum gaps cap score and priority unless the user explicitly wants stretch roles.

For every screened job, the skill captures normalized atomic requirements by category, type, and evidence phrase. It uses those items to calculate requirement statistics across all detail pages screened in the run, including skipped jobs, so the output can show both candidate fit and observed market demand.

When spreadsheet output is requested, it creates a workbook with `Summary`, `Shortlist`, `Criteria`, and `Requirement Stats` sheets. The shortlist keeps concise gaps and red flags, while requirement statistics show category, requirement, frequency, percentage, requirement type, and example sources.

### public-writer

Use this skill when developing AI-related LinkedIn post ideas from the user's own thinking. It starts with a mandatory interview, reads saved writing memory when available, challenges weak or generic claims, and then returns several outline options with the core claim, reader promise, hook direction, beats, example, counterargument, and ending thought.

The skill is designed to avoid generic AI-writing patterns and preserve specific personal observations.

### refine-prompt

Use this skill when a prompt needs clearer wording without changing its meaning. It improves grammar, structure, terminology, and precision while leaving unresolved details unresolved. For coding-agent or Spec Kit-style feature prompts, it keeps the text product-oriented and avoids adding acceptance criteria, implementation plans, architecture, examples, or agent-facing instructions unless the user already included them.

### spec-review

Use this skill to assess whether a specification is ready for implementation, approval, launch, or further review. It reads the spec through multiple lenses: implementer, tester, operator, security reviewer, and stakeholder. Findings are prioritized by severity and tied to concrete evidence in the spec.

The skill can apply relevant methodology guidance, including requirements quality, API contracts, architecture review, security and privacy, operations, testability, and delivery readiness.
