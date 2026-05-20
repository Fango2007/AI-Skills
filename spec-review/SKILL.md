---
name: spec-review
description: Assess technical specifications, product requirements, architecture specs, API specs, design docs, RFCs, ADR bundles, and implementation plans against established engineering criteria. Use when Codex needs to review whether a technical spec is complete, clear, feasible, testable, secure, observable, architecturally sound, implementation-ready, or aligned with relevant methodologies such as ISO/IEC/IEEE 29148, INCOSE requirements guidance, SMART, INVEST, RFC 2119/8174, ISO/IEC 25010, ATAM, C4, arc42, OpenAPI, OWASP ASVS, NIST SSDF, STRIDE/LINDDUN, SRE, and acceptance-test practices.
---

# Spec Review

## Overview

Use this skill to evaluate a technical specification against the criteria that matter for its purpose and domain. Produce a practical review: strengths, gaps, risks, questions, readiness judgment, and concrete amendments.

## Assessment Workflow

1. Establish scope before scoring.
   - Identify spec type: requirements, architecture, API, data, security, migration, infrastructure, operational, AI/ML, or mixed.
   - Identify delivery stage: concept, discovery, implementation-ready, launch review, compliance review, or post-incident remediation.
   - Identify constraints: regulated domain, safety-critical behavior, privacy, migration risk, external API contract, uptime/SLO expectations, deadline, budget, and stakeholder approval needs.
   - If the user supplied acceptance criteria or organizational standards, treat them as primary criteria and use the bundled methodology catalog as a supplement.

2. Read the spec as an implementer, tester, operator, security reviewer, and stakeholder.
   - Extract goals, non-goals, actors, system boundaries, dependencies, requirements, interfaces, data flows, quality attributes, rollout plan, and open questions.
   - Distinguish explicit requirements from assumptions and inferred requirements.
   - Note ambiguous modal verbs; normalize requirement strength using RFC 2119/8174 terms only when the spec already uses or needs normative language.

3. Select relevant criteria.
   - Load `references/methodology-catalog.md` when the spec needs a deeper checklist or the domain is mixed.
   - Apply only relevant methodologies. Do not penalize a small implementation note for lacking enterprise architecture artifacts unless the requested review requires that rigor.
   - Add domain-specific checks when the spec mentions regulated, safety, financial, health, accessibility, AI, payment, identity, cryptography, or personal-data processing concerns.

4. Assess evidence, not vibes.
   - Mark each finding with severity: `Blocker`, `High`, `Medium`, `Low`, or `Note`.
   - Tie every material issue to quoted or paraphrased spec content, section names, line numbers, or missing evidence.
   - Prefer concrete rewrites or acceptance criteria over generic advice.

5. Judge readiness.
   - Use these readiness levels:
     - `Ready`: enough clarity and control exists for implementation or approval.
     - `Ready with conditions`: implementation can start if listed conditions are resolved.
     - `Needs revision`: important gaps would cause rework, disputes, or unverifiable outcomes.
     - `Not ready`: core goals, constraints, architecture, or safety/security obligations are missing.

## Core Criteria

Assess these dimensions unless clearly irrelevant:

- Purpose and scope: problem, goals, non-goals, stakeholders, users, success metrics, and decision context.
- Requirement quality: atomic, necessary, feasible, unambiguous, verifiable, traceable, prioritized, and conflict-free requirements.
- Functional behavior: user journeys, business rules, error cases, edge cases, state transitions, concurrency, failure modes, and backward compatibility.
- Interfaces and contracts: API schemas, data contracts, events, auth, idempotency, pagination, versioning, compatibility, and example payloads.
- Architecture and design: system boundaries, components, dependencies, data flow, deployment model, build-vs-buy rationale, tradeoffs, alternatives rejected, and ADR-worthy decisions.
- Quality attributes: performance, scalability, reliability, availability, maintainability, portability, usability, accessibility, interoperability, and resource constraints.
- Security and privacy: threat model, trust boundaries, secrets, identity, authorization, input validation, logging safety, data classification, retention, compliance, and abuse cases.
- Testability: acceptance criteria, negative tests, contract tests, migration tests, performance tests, security tests, observability-based checks, and test data needs.
- Operations: SLOs/SLIs, alerting, dashboards, runbooks, capacity, rollback, feature flags, incident response, support ownership, and cost controls.
- Delivery readiness: milestones, dependencies, sequencing, migration/backfill, rollout, release gates, documentation, owners, risks, and unresolved decisions.

## Output Format

Default to this structure unless the user requests another format:

1. `Verdict`: readiness level, one-sentence rationale, and confidence.
2. `Top Findings`: prioritized table with severity, criterion, issue, evidence, impact, and recommended fix.
3. `Criteria Coverage`: brief pass/partial/fail summary by dimension.
4. `Questions To Resolve`: only questions whose answers affect implementation, risk, or acceptance.
5. `Suggested Spec Amendments`: concise replacement text, acceptance criteria, diagrams, or missing sections.
6. `Methodologies Applied`: list the frameworks used and why; list intentionally skipped frameworks when that prevents over-review.

Keep the review direct. Do not rewrite the whole spec unless asked.

## References

- `references/methodology-catalog.md`: framework selection guide, scoring heuristics, and detailed checklist by spec type.
