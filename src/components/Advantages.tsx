import { advantages } from "@/data/advantages";

export function Advantages() {
  return (
    <section
      id="advantages"
      className="scroll-mt-24 border-y border-line bg-bg-elevated px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Подход</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Чем мы отличаемся
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Не декораторский «лук», а архитектурная работа над пространством —
            от планировки до стройки.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {advantages.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <div className="flex items-start gap-4">
                <span className="font-display text-2xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
