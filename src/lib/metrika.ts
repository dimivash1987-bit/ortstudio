export const YANDEX_METRIKA_ID = 110848554;

/** Идентификатор цели в Яндекс.Метрике (тип: JavaScript-событие) */
export const METRIKA_GOAL_CONTACT_FORM = "contact_form";

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      target?: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function reachMetrikaGoal(goalId: string) {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(YANDEX_METRIKA_ID, "reachGoal", goalId);
}
