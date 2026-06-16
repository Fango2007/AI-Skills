---
name: linkedin-job-shortlist
description: Extract, evaluate, rank, and export LinkedIn job offers for a candidate using configurable match criteria. Use when Codex is asked to search LinkedIn jobs, shortlist job offers, score job descriptions against personal criteria, avoid LinkedIn rate limits, or generate a spreadsheet of LinkedIn job matches with publication age, gaps, red flags, and priority.
---

# LinkedIn Job Shortlist

## Operating Rules

Use this skill for LinkedIn job-search workflows that need careful browser pacing, candidate-specific scoring, and spreadsheet output.

Hard limits:
- Process at most 5 job details per batch.
- Wait at least 30 seconds between opening job detail pages.
- Do not include jobs older than 14 days unless the user explicitly overrides this.
- Stop immediately if LinkedIn shows an auth wall, CAPTCHA, suspicious activity warning, `ERR_HTTP_RESPONSE_CODE_FAILURE`, repeated failed navigations, or any rate-limit-like behavior.
- Do not apply, save, message, submit, or change account settings unless the user explicitly asks and confirms the exact action.

## Criteria

Always allow the user to change match criteria. If criteria are missing, ask only for the missing fields that materially affect scoring.

Before scoring, load the candidate baseline first. The baseline is the durable source of candidate-specific evidence; this skill defines the method and gates, not the candidate's personal facts.

Default baseline path:
- `outputs/linkedin_job_shortlist/candidate_baseline.yml`

Initial baseline workflow:
1. Before the first screening run, check whether the baseline file exists and whether it records that it has been reviewed with the user.
2. If the baseline file is missing, screen the current resume/CV first and create a draft baseline before opening LinkedIn job details.
3. If the baseline exists but has not been reviewed with the user, pause job screening and review the baseline with the user before using it for scoring.
4. During review, separate:
   - resume claims directly supported by the CV;
   - inferred or adjacent capabilities;
   - missing or not-evidenced capabilities;
   - user-confirmed corrections that narrow, strengthen, or contradict the CV wording.
5. Ask only high-impact grounding questions that affect screening gates, such as production delivery, hands-on backend depth, specific languages/frameworks, databases, cloud/platform ownership, AI/LLM/RAG/agent production usage, monitoring/support, and current target constraints.
6. Persist the reviewed baseline with resume sources, review date, and user-confirmed facts before scoring any job.

Ongoing baseline workflow:
1. If the reviewed baseline file exists, read it before screening any job.
2. If the user has just corrected a profile fact, update the baseline file first, then score jobs against the updated baseline.
3. If the CV/resume appears newer than the baseline, refresh the baseline or explicitly note that the baseline may be stale.
4. Treat `evidenced`, `adjacent`, and `not_evidenced` distinctly. Do not infer a missing skill from adjacent experience unless the baseline says it is evidenced.
5. Record central missing requirements in `gaps` and `red_flags`.
6. When a job exposes a repeated uncertainty about the candidate's real experience, ask the user whether the baseline should be updated instead of deciding from the job description alone.

Recommended baseline metadata:
```yaml
baseline_status:
  resume_screened: true
  reviewed_with_user: true
  reviewed_on: YYYY-MM-DD
  review_notes: Brief summary of user-confirmed constraints.
```

Default criteria shape:
```yaml
target_titles:
  - Forward Deployed Engineer
  - Applied AI Engineer
  - Chef de projet IA
preferred_locations:
  - Paris
  - Europe
remote_rules: Paris or Europe; remote/hybrid preferred
minimum_compensation: EUR 80K salary or EUR 700 HT day rate
preferred_contract: contract worker preferred
industries: no preference
must_have_technologies:
  - AI-related technologies
  - AI providers
dealbreakers:
  - not or poorly related to AI
  - pure management without hands-on practice
role_style:
  - hands-on engineering
  - tech lead
  - architect
  - management only if strongly related to AI
candidate_baseline:
  source: outputs/linkedin_job_shortlist/candidate_baseline.yml
  evidence_levels:
    - evidenced
    - adjacent
    - not_evidenced
max_posting_age_days: 14
batch_size: 5
delay_between_detail_views_seconds: 30
```

## Browser Workflow

1. Open one LinkedIn search page or one explicit job URL.
2. Extract visible job cards first. Do not open every card.
3. Select up to 5 candidates for detail inspection based on title, company, visible location, and visible age.
4. Open one detail page.
5. Extract the detail text and fields.
6. Wait at least 30 seconds before opening the next detail page.
7. After 5 detail pages, pause and report progress or ask whether to continue.

Prefer job URLs already provided by the user. Avoid rapid URL iteration over job IDs.

When extracting or scoring, scope reads to the active job detail pane or the explicit job-detail page header/body. Do not score from whole-page text if it includes navigation, related jobs, recommendations, previous search results, or other non-active listings. If only broad page text is available, use the page title, active job header, and the first active "About the job" section as the scoring source, and note reduced confidence.

## Extraction Schema

For each job, capture:
- `company`
- `role`
- `match_score`
- `priority`
- `url`
- `location`
- `work_mode`
- `contract`
- `salary_rate`
- `published_age`
- `gaps`
- `red_flags`
- `requirements`

Use `Unknown` for missing fields. Do not infer salary/rate unless the posting explicitly states it.

For `requirements`, capture atomic requirement items from the active job description. Include requirements from jobs that are screened but ultimately skipped; statistics are about the screened market, not only retained shortlist rows.

Each requirement item must include:
- `category`: one of `Qualifications`, `Experience`, `Languages`, `Frameworks & Libraries`, `AI/ML & MLOps`, `Data & Databases`, `Cloud & Infrastructure`, or `Other`
- `item`: a normalized requirement label, for example `Production AI product shipping`, `Python`, `PostgreSQL`, `Kubernetes`, or `Solution architecture`
- `requirement_type`: `minimum`, `preferred`, or `unclear`
- `evidence`: a short phrase from the posting showing why the item was extracted

Normalize obvious synonyms before counting, for example `JS` to `JavaScript`, `Postgres` to `PostgreSQL`, `K8s` to `Kubernetes`, and `LLMOps`/`MLOps` to the exact wording used in the posting when the distinction matters.

## Scoring

Score from 0 to 100:
- AI relevance: 30 points
- Hands-on engineering depth: 20 points
- Role/title fit: 15 points
- Location/work-mode fit: 10 points
- Compensation/contract fit: 10 points
- Seniority fit: 10 points
- Red-flag penalty: subtract up to 15 points

Qualification gates:
- Always distinguish `minimum qualifications` from `preferred qualifications`.
- If a posting has an explicit minimum qualification that the CV does not evidence, record it in `gaps` and `red_flags`.
- If the missing minimum is central to the role, cap priority at `Maybe`; cap score at 64 unless there is strong adjacent evidence and the user wants stretch roles.
- If a posting requires several years of `production AI`, `production GenAI`, `shipping AI-driven solutions`, or equivalent, do not satisfy that requirement with general production systems experience. Credit general production systems experience as adjacent strength only when the baseline supports it, but treat production AI delivery as missing unless the baseline shows shipped AI systems used by real users/customers.
- If production AI delivery is limited or prototype-only, roles requiring 5+ or 6+ years shipping production AI should normally be `Maybe` or `Skip`, not `High` or `Apply first`.
- Preferred qualifications such as LangGraph, CrewAI, Google ADK, ReAct, multi-agent orchestration, eval frameworks, or agent reliability should reduce score when absent, but they are not dealbreakers unless listed as minimum requirements.
- `Apply first` requires no critical minimum-qualification gap.

Production AI delivery evidence requires at least one of:
- shipped RAG, agent, LLM, ML, or AI-assisted product/workflow to real users or customers;
- production integration with APIs, data sources, identity/security controls, logging, monitoring, evaluation, support, or release process;
- measurable adoption, business impact, reliability, or usage in an operational setting.

Use the baseline to decide whether this evidence exists. If the baseline marks production AI delivery as `not_evidenced`, do not override that from job-title similarity, general systems experience, prototypes, studies, or AI-assisted coding practice.

Backend/product AI gate:
- If a posting requires `Backend Engineer`, `Software Engineer`, or similar product-engineering experience, distinguish architecture/platform/security leadership from recent hands-on product backend delivery.
- Do not satisfy product backend requirements with architecture, operations leadership, security architecture, presales, or project management alone unless the baseline explicitly marks recent hands-on backend product delivery as evidenced.
- If the posting is balanced toward architecture, platform, security, integration, or technical leadership, credit adjacent experience and cap at `Maybe` when hands-on backend evidence is missing.
- If the posting is primarily product-feature backend development with APIs, services, tests, CI/CD, production releases, or debugging production application code, and the baseline does not evidence current hands-on backend delivery, normally score `Skip` or low `Maybe`.
- Treat NodeJS, TypeScript, PostgreSQL, SQL, and ORM requirements according to the baseline. Python can satisfy the language requirement only when the posting explicitly accepts Python or similar languages and the baseline evidences enough Python for the role level.
- Treat `shipped real AI products`, `shipped AI features`, `debugged production AI issues`, `AI at scale`, and similar phrases as central production-AI requirements. If not evidenced, record the gap and cap at `Maybe`; use `Skip` when this is paired with missing backend-stack requirements.
- Treat `shipped production features using Claude` or `used Claude to ship real products` as missing unless there is explicit evidence that Claude-assisted code reached real users. General AI-assisted coding, Codex/Claude experimentation, modernization studies, or prototypes do not satisfy this.

Priority labels:
- `Apply first`: 85-100 and no critical gap
- `High`: 75-84
- `Medium`: 65-74
- `Maybe`: 50-64 or important unknowns
- `Skip`: below 50, older than max posting age, or dealbreaker present

## Requirement Statistics

For every screening run, calculate requirement statistics from all job offers whose detail pages were screened in that run, including offers that were not added to the shortlist.

Counting rules:
- Count each normalized requirement item at most once per job, even if the posting repeats it.
- Use the number of screened jobs in the run as the percentage denominator.
- Calculate `percentage = jobs_requiring_item / screened_jobs * 100`.
- Keep minimum and preferred requirements separate in the `requirement_type` field, but merge them for the main item percentage unless the distinction is important for interpretation.
- Order rows by `category`, then descending `percentage`, then requirement item alphabetically.
- Recalculate the sheet on each new screening run; replace the previous run's statistics rather than appending stale rows.
- If no job details were successfully screened, leave the prior statistics untouched and report that no recalculation was possible.
- If the workbook has no prior `Requirement Stats` sheet and no job details were successfully screened, create the sheet with headers and a note that statistics will be populated after the next screening run.

The statistics are descriptive market data. Do not use them to soften candidate qualification gates; scoring still depends on the candidate baseline and the job's central requirements.

## Spreadsheet Output

When asked to generate a spreadsheet, create an `.xlsx` with:
- `Summary` sheet
- `Shortlist` sheet
- `Criteria` sheet
- `Requirement Stats` sheet

The `Shortlist` columns must be ordered:
1. Company
2. Role
3. Match score
4. Priority
5. URL
6. Location
7. Work mode
8. Contract
9. Salary/rate
10. Published age
11. Gaps
12. Red flags

Make the company column bold. Include a visible title row and a visible header row.

The `Requirement Stats` columns must be ordered:
1. Category
2. Requirement
3. Jobs requiring item
4. Screened jobs
5. Percentage
6. Requirement type
7. Example sources

Format `Percentage` as a percentage or as a number with a `%` suffix. `Example sources` should contain concise company/role references, not full job descriptions.

Read `references/schema.md` if exact JSON shape or validation examples are needed.
