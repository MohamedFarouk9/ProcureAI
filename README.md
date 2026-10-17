# ProcureAI

A multi-tenant procurement and inventory ERP with an LLM copilot, built to
demonstrate production-minded system design rather than a thin AI wrapper.

**What it does**
- Natural-language Q&A over tenant documents (RAG with citations)
- Guarded tool calling: the model proposes, a human approves; it never runs raw SQL
- Invoice extraction pipeline with PO matching and anomaly flags
- Multi-provider payments (Stripe, PayPal, SEPA) behind a single adapter interface

**Engineering highlights**
- Pessimistic and optimistic locking, with concurrency tests proving no overselling
- Idempotent payments and webhooks, transactional outbox, double-entry ledger
- Tenant isolation, RBAC, PII redaction, and an audit log of AI actions
- LLM evaluation suite in CI, plus cost/latency observability

**Docs:** [Architecture (C4)](docs/architecture.md) · [ADRs](docs/adr) · [Threat model](docs/threat-model.md)

> Payments run in sandbox/test mode only. No real funds or card data are handled.
