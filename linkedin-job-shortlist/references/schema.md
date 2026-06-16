# LinkedIn Job Shortlist Schema

Use this JSON shape for extracted jobs and spreadsheet generation.

```json
{
  "criteria": {
    "target_titles": ["Forward Deployed Engineer", "Applied AI Engineer", "Chef de projet IA"],
    "preferred_locations": ["Paris", "Europe"],
    "remote_rules": "Paris or Europe; remote/hybrid preferred",
    "minimum_compensation": "EUR 80K salary or EUR 700 HT day rate",
    "preferred_contract": "contract worker preferred",
    "industries": "no preference",
    "must_have_technologies": ["AI-related technologies", "AI providers"],
    "dealbreakers": ["not or poorly related to AI", "pure management without hands-on practice"],
    "role_style": ["hands-on engineering", "tech lead", "architect", "AI-related management only"],
    "max_posting_age_days": 14,
    "batch_size": 5,
    "delay_between_detail_views_seconds": 30
  },
  "jobs": [
    {
      "company": "OpenAI",
      "role": "Forward Deployed Engineer - Paris",
      "match_score": 94,
      "priority": "Apply first",
      "url": "https://www.linkedin.com/jobs/view/4417168168/",
      "location": "Paris",
      "work_mode": "Hybrid",
      "contract": "Full-time",
      "salary_rate": "Unknown",
      "published_age": "1 week ago",
      "gaps": "Full-time employee role, not contract. Requires up to 50% travel.",
      "red_flags": "Hybrid 3 days/week in office; no salary/rate shown.",
      "requirements": [
        {
          "category": "Experience",
          "item": "Customer-facing technical delivery",
          "requirement_type": "minimum",
          "evidence": "customer-facing technical role"
        },
        {
          "category": "Languages",
          "item": "Python",
          "requirement_type": "preferred",
          "evidence": "Python or similar language"
        }
      ]
    }
  ],
  "requirement_stats": [
    {
      "category": "Experience",
      "requirement": "Customer-facing technical delivery",
      "jobs_requiring_item": 1,
      "screened_jobs": 1,
      "percentage": 100,
      "requirement_type": "minimum",
      "example_sources": "OpenAI - Forward Deployed Engineer - Paris"
    },
    {
      "category": "Languages",
      "requirement": "Python",
      "jobs_requiring_item": 1,
      "screened_jobs": 1,
      "percentage": 100,
      "requirement_type": "preferred",
      "example_sources": "OpenAI - Forward Deployed Engineer - Paris"
    }
  ]
}
```

Validation rules:
- `jobs.length` must be at most 5 per extraction batch unless combining previously approved batches.
- `published_age` must be 14 days or less unless the user overrides the age limit.
- `match_score` must be numeric from 0 to 100.
- `priority` must be one of `Apply first`, `High`, `Medium`, `Maybe`, or `Skip`.
- Use `Unknown` for missing `work_mode`, `contract`, or `salary_rate`.
- Keep `gaps` and `red_flags` concise, factual, and based on extracted posting text.
- `requirements` must contain normalized, atomic requirement items from the active job description, including jobs screened but not shortlisted.
- `requirement_stats` must be recalculated from the current screening run or continued screening campaign and written to a `Requirement Stats` worksheet.
- `requirement_stats.percentage` must be `jobs_requiring_item / screened_jobs * 100`.
- Count a requirement item at most once per job.
- Order requirement statistics by category, descending percentage, then requirement text.
- For multi-batch workbook reassessments, `screened_jobs` is cumulative across all jobs successfully screened in that campaign so far, not just the latest 5-job batch.
