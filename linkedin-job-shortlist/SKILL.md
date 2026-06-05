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

Use `Unknown` for missing fields. Do not infer salary/rate unless the posting explicitly states it.

## Scoring

Score from 0 to 100:
- AI relevance: 30 points
- Hands-on engineering depth: 20 points
- Role/title fit: 15 points
- Location/work-mode fit: 10 points
- Compensation/contract fit: 10 points
- Seniority fit: 10 points
- Red-flag penalty: subtract up to 15 points

Priority labels:
- `Apply first`: 85-100 and no critical gap
- `High`: 75-84
- `Medium`: 65-74
- `Maybe`: 50-64 or important unknowns
- `Skip`: below 50, older than max posting age, or dealbreaker present

## Spreadsheet Output

When asked to generate a spreadsheet, create an `.xlsx` with:
- `Summary` sheet
- `Shortlist` sheet
- `Criteria` sheet

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

Read `references/schema.md` if exact JSON shape or validation examples are needed.
