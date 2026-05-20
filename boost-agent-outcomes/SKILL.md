---
name: boost-agent-outcomes
description: Assess, compare, strengthen, and synthesize outputs from coding AI agents. Use when Codex needs to evaluate multiple agent plans, task lists, implementation approaches, code review notes, diffs, or other engineering outputs from the same prompt; identify weaker reasoning, missing assumptions, obsolete or risky technology choices, logic gaps, test gaps, and unsupported claims; transfer useful context from stronger outputs to weaker agents; or merge several outputs into a better final plan or task breakdown.
---

# Boost Agent Outcomes

## Overview

Use this skill to turn one or more coding-agent outputs into a stronger engineering artifact. Produce a practical assessment that can either improve a weaker agent's next prompt or synthesize the best parts of all outputs into a final plan, task list, review, or implementation direction.

## Workflow

1. Establish the comparison frame.
   - Identify the shared input prompt, desired output type, project constraints, and evaluation purpose.
   - Determine whether the user wants `diagnose`, `merge`, `boost`, or `rank`.
   - If the original prompt or codebase context is missing, state the limitation and evaluate only claims visible in the provided outputs.

2. Normalize the outputs before judging them.
   - Label each output clearly, such as `Agent A`, `Agent B`, or the model/tool name if supplied.
   - Extract each output's goals, assumptions, architecture decisions, task decomposition, sequencing, dependencies, risks, tests, and open questions.
   - Separate explicit claims from inferred claims.
   - Do not assume a longer output is better; judge by correctness, coverage, actionability, and fit to constraints.

3. Evaluate each output independently.
   - Check technical reasoning, feasibility, dependency awareness, sequencing, edge cases, security, data handling, migrations, observability, tests, rollout, and maintainability.
   - Flag weak logic, missing assumptions, stale or unsuitable technology choices, excessive complexity, underspecified tasks, untested claims, and contradictions.
   - Mark findings by severity: `Critical`, `High`, `Medium`, `Low`, or `Note`.
   - Tie every material finding to specific text, missing evidence, or project context.

4. Compare outputs against each other.
   - Identify where one agent found a valid issue, assumption, step, risk, or simplification that another missed.
   - Distinguish complementary ideas from conflicts.
   - For conflicts, decide which approach is better only when evidence supports it; otherwise describe the decision needed.
   - Note any shared blind spot that all agents missed.

5. Produce the requested outcome.
   - For `diagnose`: explain each agent's strengths, weaknesses, and reliability risks.
   - For `merge`: create a single improved artifact that keeps the strongest ideas and removes duplicate, weak, or unsupported parts.
   - For `boost`: write concise follow-up input for the weaker agent that gives it missing context, corrections, constraints, and targeted questions without leaking unnecessary meta-analysis.
   - For `rank`: provide a ranking with rationale and confidence, but avoid false precision when outputs are close or incomplete.

## Evaluation Criteria

Use these criteria unless the user provides a custom rubric:

- Correctness: accurate technical reasoning, valid assumptions, and no obvious contradictions.
- Completeness: covers requirements, edge cases, dependencies, sequencing, risks, and implementation details appropriate to the task.
- Specificity: gives concrete files, modules, APIs, tests, or investigation steps when possible.
- Feasibility: fits the existing stack, project constraints, team capacity, and likely implementation path.
- Modernity: avoids obsolete, deprecated, insecure, or mismatched technologies unless justified.
- Testability: defines verification steps, acceptance criteria, regression risks, and negative cases.
- Operational quality: considers migration, rollout, observability, rollback, performance, and maintainability where relevant.
- Signal quality: avoids generic advice, hallucinated certainty, premature abstraction, or filler.

## Output Formats

Default to the format that matches the user request.

### Diagnose

Use when the user wants to understand which agent is weaker or why an output is risky.

1. `Verdict`: strongest output, weakest output, confidence, and one-sentence rationale.
2. `Findings`: prioritized table with severity, agent, issue, evidence, impact, and fix.
3. `Missed By Each Agent`: concise bullets of important omissions.
4. `Shared Blind Spots`: issues no agent covered.
5. `Next Prompt`: optional targeted prompt to improve the weaker output.

### Merge

Use when the user wants the best final answer from several outputs.

1. `Synthesis Strategy`: what was kept, discarded, and reconciled.
2. `Merged Outcome`: the improved plan, task list, review, or implementation direction.
3. `Open Decisions`: unresolved choices that require user, product, or codebase confirmation.
4. `Validation Plan`: tests, checks, or review steps needed before execution.

### Boost

Use when the user wants to improve a weaker agent's next attempt.

1. `Weakness Diagnosis`: concise explanation of what the weaker agent missed.
2. `Context To Add`: facts, constraints, assumptions, and missing requirements to feed back.
3. `Corrective Instructions`: specific directions that prevent repeated mistakes.
4. `Follow-Up Prompt`: a ready-to-use prompt for the weaker agent.

## Merging Rules

- Preserve the best-supported idea, not the idea from the strongest overall agent.
- Remove duplicate tasks unless repetition exposes different acceptance criteria or risks.
- Convert vague work items into concrete tasks with owners implied by area, dependencies, and verification.
- Keep alternatives only when a real decision remains; otherwise choose and explain the better path.
- Do not average conflicting recommendations. Resolve them or mark the missing evidence.
- Include assumptions explicitly when the merged outcome depends on them.

## Boosting Rules

- Make the boost prompt actionable, not insulting.
- Give the weaker agent the missing facts and evaluation criteria it needs to recover.
- Ask targeted questions only when the answer changes the plan.
- Avoid giving the weaker agent an entire competing answer when a focused correction is enough.
- Preserve uncertainty where the stronger output made a plausible but unverified claim.
