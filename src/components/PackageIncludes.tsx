"use client";

import { useState } from "react";

const PREVIEW_COUNT = 4;

export function PackageIncludes({
  label,
  items,
}: {
  label?: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);
  const canToggle = items.length > PREVIEW_COUNT;
  const visible = open || !canToggle ? items : items.slice(0, PREVIEW_COUNT);

  return (
    <div className="mt-5">
      {label ? (
        <p className="text-sm font-medium text-ink md:text-base">{label}</p>
      ) : null}
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted md:text-base">
        {visible.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {canToggle ? (
        <button
          type="button"
          className="mt-3 text-sm font-medium text-accent-ink underline-offset-4 hover:underline"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Свернуть" : "Весь комплект"}
        </button>
      ) : null}
    </div>
  );
}
