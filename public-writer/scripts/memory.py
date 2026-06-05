#!/usr/bin/env python3
"""Append and inspect Public Writer memory entries."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTLINES = ROOT / "references" / "outlines.jsonl"


def parse_tags(raw: str) -> list[str]:
    return [tag.strip() for tag in raw.split(",") if tag.strip()]


def append_entry(args: argparse.Namespace) -> None:
    OUTLINES.parent.mkdir(parents=True, exist_ok=True)
    entry = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "type": args.type,
        "title": args.title,
        "text": args.text,
        "tags": parse_tags(args.tags),
    }
    with OUTLINES.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(f"Appended {args.type} entry to {OUTLINES}")


def show_entries(args: argparse.Namespace) -> None:
    if not OUTLINES.exists() or OUTLINES.stat().st_size == 0:
        print(f"No entries yet in {OUTLINES}")
        return

    entries = []
    with OUTLINES.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if line:
                entries.append(json.loads(line))

    if not entries:
        print(f"No entries yet in {OUTLINES}")
        return

    selected = entries[-args.limit :]
    for entry in selected:
        tags = ", ".join(entry.get("tags", []))
        print(f"- [{entry.get('type')}] {entry.get('title')} ({entry.get('created_at')})")
        if tags:
            print(f"  tags: {tags}")
        print(f"  {entry.get('text')}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    append = subparsers.add_parser("append", help="Append a memory entry")
    append.add_argument("--type", required=True, choices=["preference", "style", "tone", "outline", "idea", "claim"])
    append.add_argument("--title", required=True)
    append.add_argument("--text", required=True)
    append.add_argument("--tags", default="")
    append.set_defaults(func=append_entry)

    show = subparsers.add_parser("show", help="Show recent memory entries")
    show.add_argument("--limit", type=int, default=20)
    show.set_defaults(func=show_entries)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
