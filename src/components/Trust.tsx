const facts = [
  {
    value: "15",
    label: "объектов в портфолио",
    text: "Квартиры и дома в Минске и области, а также отдельные проекты в других городах.",
  },
  {
    value: "Чертежи",
    label: "для строителей",
    text: "Комплект можно передать на стройку: обмеры, планировка, стены и электрика.",
  },
  {
    value: "Материалы",
    label: "которые можно купить",
    text: "На визуализации только то, что реально можно купить или выполнить на заказ.",
  },
];

export function Trust() {
  return (
    <section className="border-b border-line bg-bg px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="border-t border-line pt-5">
            <p className="text-3xl font-medium text-accent">{fact.value}</p>
            <p className="mt-1 text-lg font-medium text-ink">{fact.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
