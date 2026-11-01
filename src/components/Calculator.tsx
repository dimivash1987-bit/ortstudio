"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { pricingPackages } from "@/data/pricing";

const money = new Intl.NumberFormat("ru-RU");

export function Calculator() {
  const [area, setArea] = useState("70");
  const [packageId, setPackageId] = useState(pricingPackages[1]?.id ?? pricingPackages[0].id);

  const selected =
    pricingPackages.find((item) => item.id === packageId) ?? pricingPackages[0];
  const areaValue = Number(area.replace(",", "."));
  const ready = Number.isFinite(areaValue) && areaValue > 0;
  const total = ready ? Math.round(areaValue * selected.pricePerSqm) : 0;

  return (
    <section id="calculator" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionHeading>Расчёт</SectionHeading>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            Укажите площадь и формат. Ориентир появится сразу, точную сумму
            подтвердим после знакомства с объектом.
          </p>

          <label className="mt-8 block max-w-xs">
            <span className="mb-2 block text-sm text-ink-muted">Площадь, м²</span>
            <input
              inputMode="decimal"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
            />
          </label>

          <div className="mt-6 grid gap-3">
            {pricingPackages.map((item) => (
              <label
                key={item.id}
                className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3 ${
                  item.id === selected.id
                    ? "border-accent bg-accent-soft"
                    : "border-line bg-bg"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="package"
                    value={item.id}
                    checked={item.id === selected.id}
                    onChange={() => setPackageId(item.id)}
                  />
                  <span className="text-sm text-ink md:text-base">{item.title}</span>
                </span>
                <span className="shrink-0 text-sm font-medium text-ink">
                  {item.priceLabel}
                </span>
              </label>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-muted">Ориентир</p>
          <p className="mt-1 text-4xl font-medium text-accent md:text-5xl">
            {ready ? `${money.format(total)} руб.` : "Укажите площадь"}
          </p>
          {ready ? (
            <p className="mt-2 text-sm text-ink-muted">
              {areaValue} м² × {selected.pricePerSqm} руб.
            </p>
          ) : null}
        </div>

        <div className="border border-line bg-bg-elevated p-6 md:p-8">
          <h3 className="text-2xl font-medium text-ink">Прислать расчёт</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Оставьте телефон — перезвоним и уточним сумму.
          </p>
          <div className="mt-6">
            <LeadForm
              id="calculator-form"
              submitLabel="Прислать расчёт"
              note="Это заявка, не оплата."
              area={ready ? String(areaValue) : undefined}
              message={
                ready
                  ? `Калькулятор: ${areaValue} м², ${selected.title}, ориентир ${money.format(total)} руб.`
                  : "Калькулятор: площадь не указана."
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
