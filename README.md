# Atlantis Auth Challenge

Frontend-реализация auth-флоу под [backend-форк](https://github.com/vbncursed/engineer-challenge).

## Запуск

### Backend

```bash
cd engineer-challenge
make up
```

### Frontend

```bash
pnpm install
pnpm dev
```

### Тесты

```bash
pnpm test
```

Приложение: http://localhost:3000  
GraphQL API: http://localhost:8080/graphql

## Стек

- React 19 + TypeScript
- TanStack Router (file-based routing)
- TanStack Query
- TanStack Form + Zod
- ky (HTTP-клиент)
- Tailwind CSS v4
- Vitest + Testing Library

**Выбор стека:** TanStack Router — типы и search params через Zod (токен в `/reset-password`). TanStack Form — Zod и состояние сабмита из коробки. ky — легкий клиент, хуки для рефреша при 401.

## Trade-offs

- **Email sender** — в форке `StubSender` пишет токен сброса в stdout контейнера. Флоу `/recover` → `/reset-password?token=…` на фронте готов; в prod на бэке — реальный SMTP/SendGrid. Логи: `docker logs engineer-challenge-auth-1 --follow`.
- **GraphQL без codegen** — запросы строками; для ТЗ достаточно, в prod — graphql-codegen или аналог.
- **Токены** — access в `sessionStorage`, refresh в httpOnly cookie; при старте без access — автоматический refresh.

## Архитектура

- **routes/** — маршруты и защита: `_auth.tsx` (гости vs авторизованные), редиректы в `beforeLoad`.
- **modules/auth/** — формы, Zod, ответы бэка.
- **services/** — ky: `Authorization`, при 401 — refresh и повтор запроса.
- **lib/auth** — `AuthProvider`, `sessionStorage` + refresh cookie, контекст для роутера.
- **components/ui/** — UI-примитивы без бизнес-логики.

## Следующие шаги в prod

- `GQL_URL` из `.env`
- Реальный email sender на бэке
- HTTPS (Secure на refresh cookie уже на бэке)
- Sentry / аналог для ошибок клиента
- graphql-codegen для контракта GraphQL

## Бонусные сигналы

**UI-kit** — `components/ui/` содержит переиспользуемые примитивы (Button, Input, PasswordInput) с единым стилем.

**Микрофронты и FSD** — не применял, для single-feature auth приложения это избыточно и усложнило бы архитектуру без реальной пользы.

**Codegen** — не использовал, зафиксировано в trade-offs как следующий шаг.
