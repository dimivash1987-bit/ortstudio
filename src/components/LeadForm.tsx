"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/submit-lead";

type LeadFormProps = {
  id?: string;
  submitLabel?: string;
  note?: string;
  message?: string;
  area?: string;
};

export function LeadForm({
  id = "lead-form",
  submitLabel = "Жду звонок",
  note = "Перезвоним и назовём стоимость.",
  message,
  area,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitLead({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        area: area || String(data.get("area") ?? ""),
        message: message || String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      setStatus("success");
      setFeedback("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Ошибка отправки. Позвоните или напишите в Telegram.",
      );
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="mb-1.5 block text-sm text-ink-muted">Имя</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-ink-muted">Телефон</span>
        <input
          name="phone"
          required
          type="tel"
          autoComplete="tel"
          className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
        />
      </label>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-ink disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Отправка..." : submitLabel}
      </button>
      <p className="text-sm text-ink-muted">{note}</p>
      {feedback ? (
        <p
          className={`text-sm ${status === "success" ? "text-accent-ink" : "text-red-700"}`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
