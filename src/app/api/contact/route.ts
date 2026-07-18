import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

export const runtime = "nodejs";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 60);
  const email = clean(body.email, 120);
  const area = clean(body.area, 40);
  const message = clean(body.message, 4000);

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Укажите имя и телефон" },
      { status: 400 },
    );
  }

  const user = process.env.SMTP_USER || site.email;
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.error("SMTP_PASS is not configured");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Почта временно недоступна. Позвоните или напишите напрямую на ortstudio@gmail.com",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: { user, pass },
  });

  const text = [
    "Новая заявка с сайта ORTSTUDIO",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Email: ${email || "—"}`,
    `Площадь: ${area || "—"}`,
    "",
    "Сообщение:",
    message || "—",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"ORTSTUDIO сайт" <${user}>`,
      to: site.email,
      replyTo: email || undefined,
      subject: `Заявка с сайта: ${name}`,
      text,
    });
  } catch (err) {
    console.error("Mail send failed", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить письмо. Попробуйте позже." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
