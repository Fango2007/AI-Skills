# Technical Specification Assessment Methodology Catalog

Use this catalog to select criteria for a technical specification review. Apply the smallest set that covers the spec's risk and purpose.

## Methodology Selection

| Spec focus | Primary methods | Use to check |
| --- | --- | --- |
| Requirements or PRD | ISO/IEC/IEEE 29148, INCOSE Guide to Writing Requirements, SMART, INVEST, RFC 2119/8174 | Requirement quality, ambiguity, necessity, verifiability, priority, normative language |
| Agile user stories | INVEST, BDD/Gherkin, Definition of Ready/Done, MoSCoW | Story independence, negotiability, value, estimation, acceptance criteria, priority |
| Architecture or system design | C4, arc42, ATAM, 4+1 views, ADR practice, ISO/IEC 25010 | Boundaries, views, tradeoffs, quality attributes, risks, decisions, deployment |
| API or integration | OpenAPI/AsyncAPI/GraphQL conventions, JSON Schema, RFC 2119/8174, consumer-driven contract testing | Contract completeness, examples, compatibility, errors, auth, versioning |
| Security-sensitive system | OWASP ASVS, OWASP SAMM, NIST SSDF, STRIDE, misuse/abuse cases, least privilege | Threats, controls, verification, secure SDLC, abuse resistance |
| Privacy or personal data | Data minimization, retention, purpose limitation, DPIA-style risk review, LINDDUN | Data flows, lawful basis/consent assumptions, retention, profiling, privacy threats |
| Reliability or operations | SRE SLI/SLO/error-budget practice, resilience patterns, runbook readiness, incident response | Availability, observability, alerting, degradation, rollback, ownership |
| Data platform or analytics | Data contracts, lineage, quality dimensions, schema evolution, governance controls | Semantics, freshness, accuracy, ownership, access, backward compatibility |
| Migration or rollout | Release readiness, phased rollout, backout plan, compatibility matrix, rehearsal criteria | Sequencing, downtime, rollback, data backfill, monitoring, stakeholder comms |
| AI/ML or automation | Model cards, eval plans, risk tiering, monitoring, human oversight, data governance | Dataset fit, evals, drift, safety, explainability, fallback, auditability |

## Requirements Quality Checks

Use ISO/IEC/IEEE 29148 and INCOSE-style criteria as the backbone:

- Necessary: the requirement traces to a goal, stakeholder need, risk, or regulation.
- Appropriate: the requirement is at the right abstraction level and does not overconstrain design unless intentionally required.
- Unambiguous: one reasonable reader cannot interpret it materially differently from another.
- Complete: all needed conditions, inputs, outputs, constraints, and exceptions are present.
- Singular: each requirement states one thing.
- Feasible: it is technically, financially, operationally, and legally achievable.
- Verifiable: there is a clear inspection, test, demonstration, or analysis method.
- Correct: it reflects the actual need and does not contradict source context.
- Conforming: it follows required templates, terminology, units, and normative language.
- Traceable: it can be linked backward to rationale and forward to design, tests, and releases.

Flag weak phrases: "fast", "secure", "intuitive", "robust", "easy", "soon", "as needed", "etc.", "handle all", "support future", "best effort", and unexplained "should".

## Agile and Acceptance Criteria

Use INVEST for user stories:

- Independent: can be delivered without hidden coupling.
- Negotiable: states intent without prescribing unnecessary implementation.
- Valuable: has a clear user, business, operational, or compliance value.
- Estimable: contains enough detail to size.
- Small: can be delivered and reviewed within the team's normal cadence.
- Testable: includes observable outcomes.

Use BDD/Gherkin only when behavior examples clarify acceptance:

```gherkin
Given <initial context>
When <action or event>
Then <observable result>
```

Check acceptance criteria for happy path, negative path, boundary values, permissions, concurrency, retries, localization/accessibility if relevant, and observable completion signals.

## Architecture and Design Checks

Use C4 to assess whether the right diagrams or descriptions exist:

- Context: users, external systems, ownership, and trust boundaries.
- Container: deployable/runnable units, data stores, protocols, responsibilities.
- Component: major modules inside a container when internal structure affects risk or work planning.
- Code: only when a lower-level design decision needs precision.

Use arc42-style coverage:

- Goals and stakeholder concerns.
- Constraints and externally imposed decisions.
- System scope and context.
- Solution strategy.
- Building blocks and runtime behavior.
- Deployment view.
- Cross-cutting concepts.
- Architecture decisions.
- Quality requirements and scenarios.
- Risks and technical debt.

Use ATAM-style reasoning for high-risk architecture:

- Identify quality attribute scenarios: source, stimulus, environment, artifact, response, response measure.
- Surface sensitivity points, tradeoff points, risks, non-risks, and assumptions.
- Check whether alternatives and rejected options are documented where decisions are hard to reverse.

Use ISO/IEC 25010 quality characteristics to avoid missing non-functional concerns: functional suitability, performance efficiency, compatibility, interaction capability/usability, reliability, security, maintainability, flexibility, and safety where applicable.

## API and Contract Checks

For OpenAPI/AsyncAPI/GraphQL-like specs, check:

- Resource/event/model naming is consistent and domain meaningful.
- Request and response schemas include required fields, nullable behavior, constraints, examples, and units.
- Error model covers validation, authn/authz, rate limits, conflicts, idempotency, dependency failures, and retries.
- Auth, scopes, tenancy, and data visibility rules are explicit.
- Pagination, filtering, sorting, partial updates, versioning, and deprecation are specified where relevant.
- Compatibility rules describe what changes are breaking and how clients migrate.
- Contract, integration, and consumer tests are named or implied by acceptance criteria.

## Security, Privacy, and Safety Checks

Use STRIDE to scan threats: spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege.

Use LINDDUN-style privacy thinking when personal data appears: linkability, identifiability, non-repudiation, detectability, disclosure, unawareness, and non-compliance.

Use OWASP ASVS for web/API security verification and NIST SSDF for secure development process evidence. Check:

- Trust boundaries and threat model exist for material attack surface.
- Authentication, authorization, session/token handling, and secrets are specified.
- Input validation, output encoding, file handling, and deserialization risks are covered.
- Logging avoids secrets and sensitive personal data.
- Dependency, build, artifact, and deployment integrity are addressed.
- Abuse cases and rate limiting are specified for externally reachable features.
- Security tests and release gates are concrete.

For safety-critical or regulated domains, do not invent compliance claims. State the likely domain standards to verify and ask for the governing standard set.

## Operations and Delivery Checks

Use SRE-style review:

- User-visible reliability objective is stated as SLO/SLI or equivalent.
- Alerts map to symptoms users or operators care about.
- Dashboards include golden signals: latency, traffic, errors, saturation; add domain-specific signals.
- Rollback, feature flag, kill switch, or mitigation plan exists for risky launches.
- Runbook explains ownership, escalation, diagnosis, mitigation, and data repair.
- Capacity, cost, quotas, and degradation behavior are addressed.

Use delivery readiness checks:

- Dependencies and owners are named.
- Rollout and migration are staged with verification gates.
- Backward compatibility and backfill/reconciliation are covered.
- Documentation, support, and training tasks are included when users or operators change behavior.
- Open decisions are separated from accepted constraints.

## Scoring Heuristic

Use scoring only when useful. A concise finding list is often better.

| Score | Meaning |
| --- | --- |
| 0 | Missing or contradicted |
| 1 | Mentioned but ambiguous, untestable, or incomplete |
| 2 | Mostly adequate with minor gaps |
| 3 | Clear, testable, and appropriate for current stage |

Weight dimensions by risk:

- Implementation-ready spec: requirements, interfaces, testability, delivery readiness.
- Architecture approval: quality attributes, tradeoffs, boundaries, risks, operations.
- Security/privacy review: threat model, data flows, controls, verification, governance.
- API launch: contract completeness, compatibility, errors, auth, examples, tests.

Never average away a blocker. One blocker can make the spec `Not ready` even if most sections are strong.

## Finding Template

Use this format for material findings:

```markdown
| Severity | Criterion | Issue | Evidence | Impact | Recommended fix |
| --- | --- | --- | --- | --- | --- |
| High | Testability | Acceptance criteria are not observable | Section 4 says "works smoothly" without measurable behavior | QA and engineering can disagree at release | Replace with measurable Given/When/Then cases and thresholds |
```

## Reference Sources

Current source anchors used to shape this catalog:

- ISO/IEC/IEEE 29148:2018, requirements engineering; confirmed as an International Standard in 2024: https://www.iso.org/standard/72089.html
- INCOSE Guide to Writing Requirements, Version 4: https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf
- RFC 2119 and RFC 8174 for normative requirement keywords: https://www.rfc-editor.org/rfc/rfc2119 and https://www.rfc-editor.org/rfc/rfc8174
- ISO/IEC 25010:2023 product quality model: https://www.iso.org/standard/78176.html
- CMU SEI Architecture Tradeoff Analysis Method: https://www.sei.cmu.edu/library/the-architecture-tradeoff-analysis-method/
- C4 model official documentation: https://c4model.com/
- arc42 architecture documentation template: https://arc42.org/overview
- OpenAPI Specification official site: https://spec.openapis.org/oas/
- OWASP Application Security Verification Standard: https://github.com/OWASP/ASVS
- NIST SP 800-218 Secure Software Development Framework: https://csrc.nist.gov/pubs/sp/800/218/final
