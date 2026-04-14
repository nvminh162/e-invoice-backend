# E-Invoice Backend (Microservices NestJS)

A backend system for **Electronic Invoicing (E-Invoice)** built with a **microservices** architecture using **NestJS** in an **Nx Monorepo**.

This repository focuses on:

- BFF (API Gateway / Backend-for-Frontend)
- Authorization / User Access (AuthN/AuthZ)
- Invoice service (invoice domain/business logic)
- PDF Generator (render invoices to PDF)
- Media service (upload/store files)
- Mail service (send emails / invoice delivery)
- (Optional) Product service (product/catalog data)

## Commitlint rule

- Format bắt buộc: `<type>/#<scope>: <subject>` (ví dụ: `feat/#auth: add jwt login flow`).
- `type` chỉ được dùng: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `revert`.
- Quy tắc độ dài: header từ 10-160 ký tự, mỗi dòng body tối đa 120 ký tự.

## Tech Stack

- **Language:** TypeScript
- **Framework:** NestJS
- **Monorepo:** Nx
- **Microservices:** NestJS Microservices (TCP), extensible to gRPC
- **Messaging/Event bus:** Kafka (kafkajs)
- **Databases:** PostgreSQL (TypeORM), MongoDB (Mongoose)
- **Cache/Rate limiting:** Redis + cache-manager
- **Observability:** OpenTelemetry + Prometheus + Pino (optional Loki)
- **Docs:** Swagger / OpenAPI
- **PDF:** Puppeteer
- **Container:** Docker / Docker Compose

## Repository Structure

```txt
apps/
  bff/              # API Gateway / BFF
  authorizer/       # Authorization service
  user-access/      # User & access management
  invoice/          # Invoice domain service
  pdf-generator/    # Generate invoice PDFs
  media/            # Upload/serve media files
  mail/             # Email service
  product/          # (optional) Product service
libs/
  common/           # Shared utilities (logger, observability, etc.)
  configuration/    # Shared configuration
  constants/        # Shared constants
docker/
  ...               # Docker configs (providers, observability, etc.)
```

## Prerequisites

- Node.js (recommended LTS)
- npm
- Docker + Docker Compose (for local providers like DB/Kafka/Redis)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create environment file

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

> Tip: You can split env files per service (e.g., `.env.invoice`, `.env.bff`) if preferred.

### 3) Start infrastructure (DB/Kafka/Redis, ...)

If your repo includes a providers compose file:

```bash
docker compose -f docker-compose.provider.yaml up -d
```

### 4) Run services (dev)

If you have equivalent scripts in `package.json`:

```bash
npm run dev
```

Run a “lite” set of services:

```bash
npm run dev-lite
```

Run local (start providers + dev):

```bash
npm run dev-local
```

### 5) Run a single service

Example: run the invoice service

```bash
npx nx serve invoice
```

List available targets for a project:

```bash
npx nx show project invoice
```

## API Documentation (Swagger)

Each HTTP service typically exposes Swagger at:

- `http://localhost:<PORT>/<GLOBAL_PREFIX>/docs`

Example (depends on your config):

- `http://localhost:3000/api/docs`

## Microservices Communication

Some services run **HTTP** and also connect as **NestJS microservices** via **TCP** (Transport.TCP).

Typical flow:

- BFF receives requests from the client
- It calls domain services (invoice/user-access/authorizer/...) via TCP/gRPC or internal HTTP
- Invoice service publishes events (Kafka) consumed by other services (mail/pdf/media)

## Observability

- Tracing: OpenTelemetry (OTLP exporters)
- Metrics: Prometheus
- Logging: Pino (optional Loki)

## Testing

```bash
npx nx test invoice
```

E2E (if available):

```bash
npx nx e2e einvoice-e2e
```

## Roadmap / TODO

- [ ] Standardize auth flow (JWT + JWKS)
- [ ] Event-driven invoice lifecycle (Kafka topics)
- [ ] PDF template system + versioning
- [ ] Multi-tenant / organization support
- [ ] CI pipeline (lint/test/build) with GitHub Actions
- [ ] Add diagrams (C4 / sequence)

## Contributing

PRs/issues are welcome. Please follow conventional commits.

## License

MIT (or your choice)
