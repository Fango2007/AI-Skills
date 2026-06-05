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
      "red_flags": "Hybrid 3 days/week in office; no salary/rate shown."
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
