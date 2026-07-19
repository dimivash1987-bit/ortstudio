"use client";

import { useState, type FormEvent } from "react";
import { METRIKA_GOAL_CONTACT_FORM, reachMetrikaGoal } from "@/lib/metrika";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          area: data.get("area"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Не удалось отправить заявку");
      }

      reachMetrikaGoal(METRIKA_GOAL_CONTACT_FORM);
      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Ошибка отправки. Попробуйте позвонить или написать на почту.",
      );
    }
  }

  return (
    <form
      id="contact-form"
      onSubmit={onSubmit}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-ink-muted">Имя</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-ink-muted">Телефон</span>
          <input
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-ink-muted">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-ink-muted">Площадь, м²</span>
          <input
            name="area"
            inputMode="numeric"
            className="w-full border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-ink-muted">Сообщение</span>
        <textarea
          name="message"
          rows={4}
          className="w-full resize-y border border-line bg-bg px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          placeholder="Тип объекта, сроки, пожелания..."
        />
      </label>

      {/* Honeypot */}
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
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-ink disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Отправка..." : "Отправить заявку"}
      </button>

      {message ? (
        <p
          className={`text-sm ${status === "success" ? "text-accent-ink" : "text-red-700"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
