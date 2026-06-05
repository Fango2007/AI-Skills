#!/usr/bin/env node
import fs from "node:fs/promises";

const path = process.argv[2];
if (!path) {
  console.error("Usage: validate_shortlist.mjs <shortlist.json>");
  process.exit(2);
}

const allowedPriorities = new Set(["Apply first", "High", "Medium", "Maybe", "Skip"]);
const requiredJobFields = [
  "company",
  "role",
  "match_score",
  "priority",
  "url",
  "location",
  "work_mode",
  "contract",
  "salary_rate",
  "published_age",
  "gaps",
  "red_flags"
];

function ageToDays(value) {
  const text = String(value || "").toLowerCase();
  const match = text.match(/(?:reposted|posted)?\s*(?:over\s+)?(\d+)\s+(minute|minutes|hour|hours|day|days|week|weeks)\s+ago/);
  if (!match) return null;
  const n = Number(match[1]);
  const unit = match[2];
  if (unit.startsWith("minute") || unit.startsWith("hour")) return 0;
  if (unit.startsWith("day")) return n;
  if (unit.startsWith("week")) return n * 7;
  return null;
}

const raw = await fs.readFile(path, "utf8");
const payload = JSON.parse(raw);
const criteria = payload.criteria || {};
const jobs = payload.jobs || [];
const errors = [];

const batchSize = Number(criteria.batch_size ?? 5);
const maxAgeDays = Number(criteria.max_posting_age_days ?? 14);

if (!Array.isArray(jobs)) {
  errors.push("jobs must be an array");
} else {
  if (jobs.length > batchSize) errors.push(`jobs length ${jobs.length} exceeds batch_size ${batchSize}`);
  jobs.forEach((job, index) => {
    for (const field of requiredJobFields) {
      if (!(field in job)) errors.push(`jobs[${index}].${field} is missing`);
    }
    if (typeof job.match_score !== "number" || job.match_score < 0 || job.match_score > 100) {
      errors.push(`jobs[${index}].match_score must be a number from 0 to 100`);
    }
    if (!allowedPriorities.has(job.priority)) {
      errors.push(`jobs[${index}].priority must be one of ${Array.from(allowedPriorities).join(", ")}`);
    }
    const days = ageToDays(job.published_age);
    if (days === null) {
      errors.push(`jobs[${index}].published_age could not be parsed: ${job.published_age}`);
    } else if (days > maxAgeDays) {
      errors.push(`jobs[${index}].published_age is ${days} days, above max ${maxAgeDays}`);
    }
  });
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, jobs: jobs.length, batch_size: batchSize, max_posting_age_days: maxAgeDays }, null, 2));
