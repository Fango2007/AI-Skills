# LinkedIn Job Shortlist Schema

Use this JSON shape for extracted jobs and spreadsheet generation.

```json
{
  "criteria": {
    "target_titles": ["Forward Deployed Engineer", "Solution Architect", "Applied Engineer"],
    "preferred_locations": ["Paris", "Europe"],
    "remote_rules": "Paris or Europe; remote/hybrid preferred",
    "minimum_compensation": "EUR 80K salary or EUR 700 HT day rate",
    "preferred_contract": "contract worker preferred",
    "industries": "no preference",
    "target_domain": "AI, cybersecurity, platform engineering, product management, data, sales, finance, or another user-defined domain",
    "must_have_themes": ["target-domain related work", "candidate-supported strengths"],
    "dealbreakers": ["not or poorly related to target domain", "pure management without requested hands-on practice"],
    "role_style": ["hands-on engineering", "tech lead", "architect", "domain-related management only"],
    "max_posting_age_days": 14,
    "batch_size": 5,
    "delay_between_detail_views_seconds": 30
  },
  "jobs": [
    {
      "company": "ExampleCorp",
      "role": "Solution Architect - Paris",
      "match_score": 94,
      "priority": "Apply first",
      "url": "https://www.linkedin.com/jobs/view/0000000000/",
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
          "evidence": "customer-facing technical role",
          "gap_severity": "minor"
        },
        {
          "category": "Languages",
          "item": "Python",
          "requirement_type": "preferred",
          "evidence": "Python or similar language",
          "gap_severity": "none"
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
      "example_sources": "ExampleCorp - Solution Architect - Paris"
    },
    {
      "category": "Languages",
      "requirement": "Python",
      "jobs_requiring_item": 1,
      "screened_jobs": 1,
      "percentage": 100,
      "requirement_type": "preferred",
      "example_sources": "ExampleCorp - Solution Architect - Paris"
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
- `requirements.category` must be one of `Qualifications`, `Experience`, `Languages`, `Frameworks & Libraries`, `Domain & Technical`, `Data & Databases`, `Cloud & Infrastructure`, `Soft Skills & Culture`, or `Other`.
- `requirements.gap_severity` is optional and, when present, must be one of `none`, `minor`, `major`, or `critical`.
- `requirement_stats` must be recalculated from the current screening run or continued screening campaign and written to a `Requirement Stats` worksheet.
- `requirement_stats.percentage` must be `jobs_requiring_item / screened_jobs * 100`.
- Count a requirement item at most once per job.
- Order requirement statistics by category, descending percentage, then requirement text.
- For multi-batch workbook reassessments, `screened_jobs` is cumulative across all jobs successfully screened in that campaign so far, not just the latest 5-job batch.
