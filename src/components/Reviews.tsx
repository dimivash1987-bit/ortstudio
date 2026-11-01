"use client";

import { useState } from "react";
import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/SectionHeading";

const PREVIEW_COUNT = 3;

export function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const rest = reviews.length - PREVIEW_COUNT;
  const visible = showAll ? reviews : reviews.slice(0, PREVIEW_COUNT);

  return (
    <section id="reviews" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading>Отзывы</SectionHeading>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visible.map((review) => (
            <article
              key={review.name}
              className="border-t border-line bg-bg pt-5 md:border md:border-line md:bg-bg-elevated md:p-7"
            >
              <p className="text-base leading-relaxed text-ink-muted">
                {review.text}
              </p>
              <p className="mt-5 text-sm font-medium text-ink">{review.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{review.meta}</p>
            </article>
          ))}
        </div>

        {rest > 0 ? (
          <button
            type="button"
            className="mt-10 rounded-full border border-line px-5 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent-ink"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? "Свернуть" : `Ещё отзывы · ${rest}`}
          </button>
        ) : null}
      </div>
    </section>
  );
}
