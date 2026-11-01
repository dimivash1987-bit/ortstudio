"use client";

import { METRIKA_GOAL_CONTACT_FORM, reachMetrikaGoal } from "@/lib/metrika";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  message?: string;
  website?: string;
};

export async function submitLead(payload: LeadPayload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || !json.ok) {
    throw new Error(json.error || "Не удалось отправить заявку");
  }
  reachMetrikaGoal(METRIKA_GOAL_CONTACT_FORM);
}
