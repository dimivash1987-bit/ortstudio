# ORT Studio — сайт

## Локально

```bash
npm install
npm run dev
```

## Почта формы заявки

В Vercel → Project → Settings → Environment Variables:

- `SMTP_USER` = `ortstudio@gmail.com`
- `SMTP_PASS` = пароль приложения Google
- `SMTP_HOST` = `smtp.gmail.com` (опционально)
- `SMTP_PORT` = `465` (опционально)

Пароль приложения: https://myaccount.google.com/apppasswords

## Оптимизация портфолио

Исходники в `/port`, на сайт попадают WebP в `/public/portfolio`:

```bash
npm run optimize:portfolio
```
