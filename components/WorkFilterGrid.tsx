"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import WorkCardGrid from "@/components/WorkCardGrid";
import type { Activity } from "@/data/activities";

type FilterId = "all" | string;

export default function WorkFilterGrid({ items }: { items: Activity[] }) {
  const [active, setActive] = useState<FilterId>("all");
  const railRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef(new Map<FilterId, HTMLButtonElement>());
  const [marker, setMarker] = useState({ left: 0, width: 0, ready: false });

  const filters = useMemo(() => {
    const bySlug = new Map<string, string>();
    const counts = new Map<string, number>();

    for (const item of items) {
      for (const tag of item.tags ?? []) {
        if (!tag.slug) continue;
        if (!bySlug.has(tag.slug)) bySlug.set(tag.slug, tag.name);
        counts.set(tag.slug, (counts.get(tag.slug) ?? 0) + 1);
      }
    }

    return [
      { id: "all" as const, label: "All", count: items.length },
      ...[...bySlug.entries()]
        .map(([id, label]) => ({ id, label, count: counts.get(id) ?? 0 }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)),
    ];
  }, [items]);

  const visible = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) =>
      (item.tags ?? []).some((tag) => tag.slug === active)
    );
  }, [items, active]);

  /* Track the active pill so the indicator can slide to it. */
  useLayoutEffect(() => {
    const rail = railRef.current;
    const btn = btnRefs.current.get(active);
    if (!rail || !btn) return;

    const move = () => {
      setMarker({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: true,
      });
    };

    move();

    const observer = new ResizeObserver(move);
    observer.observe(rail);
    observer.observe(btn);
    return () => observer.disconnect();
  }, [active, filters]);

  /* Keep the chosen filter in view when the rail scrolls on narrow screens. */
  useEffect(() => {
    btnRefs.current.get(active)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [active]);

  if (filters.length <= 1) {
    return <WorkCardGrid items={items} />;
  }

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = filters[(index + delta + filters.length) % filters.length];
    setActive(next.id);
    btnRefs.current.get(next.id)?.focus();
  };

  return (
    <div className="work-filter-shell">
      <div className="work-filters-scroll">
        <div
          className="work-filters"
          ref={railRef}
          role="group"
          aria-label="Filter projects by tag"
        >
          <span
            className="work-filter-marker"
            aria-hidden="true"
            data-ready={marker.ready ? "true" : "false"}
            style={{
              transform: `translateX(${marker.left}px)`,
              width: `${marker.width}px`,
            }}
          />
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              type="button"
              ref={(node) => {
                if (node) btnRefs.current.set(filter.id, node);
                else btnRefs.current.delete(filter.id);
              }}
              className={`work-filter${active === filter.id ? " is-active" : ""}`}
              aria-pressed={active === filter.id}
              aria-label={`${filter.label} (${filter.count} ${
                filter.count === 1 ? "project" : "projects"
              })`}
              onClick={() => setActive(filter.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="work-filter-label">{filter.label}</span>
              <span className="work-filter-count" aria-hidden="true">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="work-filter-status" role="status" aria-live="polite">
        {active === "all"
          ? `${items.length} projects`
          : `${visible.length} of ${items.length} projects`}
      </p>

      {visible.length > 0 ? (
        <WorkCardGrid items={visible} />
      ) : (
        <p className="work-filters-empty">No projects for this tag yet.</p>
      )}
    </div>
  );
}
