import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkCardMedia from "@/components/WorkCardMedia";
import { ArrowRight } from "@/components/icons";
import type { Activity } from "@/data/activities";
import { workItemHref } from "@/data/activities";

export default function WorkCardGrid({ items }: { items: Activity[] }) {
  return (
    <div className="activities-grid">
      {items.map((item, index) => (
        <Reveal key={item.slug} delay={index * 80}>
          <Link href={workItemHref(item)} className="activity-card">
            <WorkCardMedia
              src={item.featuredImage}
              alt={item.title}
              priority={index < 2}
            />
            <div className="activity-card-body">
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <span className="activity-card-link">
                View gallery <ArrowRight width={16} height={16} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
