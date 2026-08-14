"use client";

import { useMemo, useState } from "react";
import WorkCardGrid from "@/components/WorkCardGrid";
import type { Activity } from "@/data/activities";

type FilterId = "all" | string;

export default function WorkFilterGrid({ items }: { items: Activity[] }) {
  const [active, setActive] = useState<FilterId>("all");

  const filters = useMemo(() => {
    const bySlug = new Map<string, string>();

    for (const item of items) {
      for (const tag of item.tags ?? []) {
        if (tag.slug && !bySlug.has(tag.slug)) {
          bySlug.set(tag.slug, tag.name);
        }
      }
    }

    return [
      { id: "all" as const, label: "All" },
      ...[...bySlug.entries()]
        .map(([id, label]) => ({ id, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [items]);

  const visible = useMemo(() => {
    if (active === "all") {
      return items;
    }

    return items.filter((item) =>
      (item.tags ?? []).some((tag) => tag.slug === active)
    );
  }, [items, active]);

  if (filters.length <= 1) {
    return <WorkCardGrid items={items} />;
  }

  return (
    <div>
      <div className="work-filters" role="group" aria-label="Filter by tag">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`work-filter${active === filter.id ? " is-active" : ""}`}
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {visible.length > 0 ? (
        <WorkCardGrid items={visible} />
      ) : (
        <p className="work-filters-empty">No projects for this tag yet.</p>
      )}
    </div>
  );
}
