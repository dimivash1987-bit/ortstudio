import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 pb-28 pt-10 md:px-8 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-medium uppercase tracking-[0.06em] text-ink">
          {site.name}
        </p>
        <p className="text-sm text-ink-muted">
          © {year} · Дизайн интерьера · {site.city}
        </p>
      </div>
    </footer>
  );
}
