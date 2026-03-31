# AdScoreAI — Final Product Requirements Document

**Version:** 2.0  
**Date:** March 30, 2026  
**Status:** Final Draft  
**Classification:** Internal / Confidential

---

## 1. Executive Summary

AdScoreAI is an AI-powered marketing creative scoring and prediction platform that evaluates marketing content **before launch**. It allows users to upload or enter ad creatives, email campaigns, SMS messages, and social posts, simulate reactions from synthetic audience personas, and receive a structured **AdScore (1–100)** with qualitative feedback and prioritized recommendations.

The product is designed to reduce wasted ad spend, improve creative quality before deployment, and replace subjective pre-launch review processes with a repeatable scoring system grounded in multimodal analysis and audience simulation.

AdScoreAI combines open-source analysis and persona simulation repositories with modern web infrastructure to deliver a unified scoring workflow through a secure dashboard and API.

---

## 2. Problem Statement

### 2.1 Current Pain Points

Marketing teams routinely invest budget in live creative testing before they know whether a campaign is likely to perform.

Common problems include:
- Email and SMS campaigns are sent with little or no pre-send predictive validation.
- Creative quality is often judged by intuition, internal preference, or fragmented feedback.
- Existing commercial creative scoring tools are expensive, closed-source, and inflexible.
- Most tools are channel-specific rather than offering a single scoring layer across ads, email, SMS, and social.
- There is no simple way for smaller teams to simulate audience reactions before launch.

### 2.2 Opportunity

By combining open-source creative analysis, synthetic persona evaluation, and structured scoring logic, AdScoreAI can provide a transparent, extensible system that helps teams evaluate creative quality pre-launch, rank variants, and improve content before real exposure or spend.

---

## 3. Product Vision & Goals

### 3.1 Vision Statement

Become the default open, extensible standard for AI-powered pre-launch marketing creative evaluation across ads, email, SMS, and social content.

### 3.2 Strategic Goals

| Goal ID | Goal | Success Metric |
|---|---|---|
| G1 | Unified multi-channel scoring | One platform scores image ads, email, SMS, and social with a consistent 1–100 output |
| G2 | Faster pre-launch decision making | Users can rank creative variants before launch in one workflow |
| G3 | Better signal before spend | Scores and recommendations help identify weak creatives before deployment |
| G4 | Extensible architecture | Open-source modules and provider-agnostic AI layer can be upgraded or swapped |
| G5 | MVP launch readiness | Working dashboard, scoring flow, and comparison mode shipped in first build phase |

---

## 4. Target Users

### 4.1 Primary Users

**Marketing Manager**  
Needs fast, structured feedback on campaign assets before launch and wants a single place to evaluate multiple channels.

**Growth / Performance Marketer**  
Tests many creative variants and needs a ranking system to eliminate weak performers before spending budget.

**Email Marketing Specialist**  
Wants predictive signals on subject lines, preview text, body content, CTA quality, and unsubscribe/spam risk before sending.

### 4.2 Secondary Users

- Agencies managing campaigns for multiple clients
- Solo founders and lean marketing teams
- Developers or analysts extending the scoring engine

---

## 5. Product Scope

### 5.1 In Scope for MVP

- User authentication
- Dashboard for content input and results review
- Single creative scoring
- Creative comparison mode (2–10 variants)
- Support for image ads and email campaigns in MVP
- Synthetic persona simulation
- Structured score output with dimensions and recommendations
- Saved history of scoring sessions
- Reusable audience profiles
- Basic report/export support
- API endpoint foundation for future external use

### 5.2 Out of Scope for MVP

- Full Meta Ads push/pull integrations
- Deep ESP integrations (Klaviyo, Mailchimp, SendGrid)
- Advanced calibration with real campaign data
- Full white-label reporting
- Marketplace billing or vendor ecosystem
- User-generated custom code execution
- True self-hosted enterprise packaging in MVP

---

## 6. Open-Source Foundation

AdScoreAI uses open-source repositories as the scoring foundation. AdScoreAI itself is the orchestration and product layer that coordinates these components, standardizes inputs/outputs, persists results, and presents the final experience.

| Repository | Role in AdScoreAI | Primary Contribution |
|---|---|---|
| AdTestPro | Persona scoring engine | Synthetic focus groups, response simulation, scoring inputs |
| LLM-Marketing-Expert | Creative analysis engine | Multimodal creative analysis and structured evaluation |
| Persona Hub | Persona diversity source | Broad synthetic audience generation inputs |
| Synthetic User Research | Agent-style simulation patterns | Multi-agent synthetic feedback workflows |
| OpenAdServer | Predictive modeling layer | CTR-oriented modeling and future calibration potential |
| meta-ads-kit | Future integrations layer | Campaign operations and ad system connectivity |

### 6.1 Product Interpretation

The open-source repositories do **not** replace the product. They provide the analysis and simulation building blocks. AdScoreAI is responsible for:
- accepting user content,
- routing content to the correct analysis path,
- generating audience simulations,
- aggregating outputs,
- calculating standardized scores,
- storing results,
- and presenting a usable dashboard and API.

---

## 7. System Architecture

### 7.1 Architecture Overview

AdScoreAI uses a modular web architecture designed for AI-powered marketing creative evaluation. The system is optimized for secure content upload, asynchronous scoring workflows, synthetic persona simulation, structured result storage, and scalable report delivery. The architecture is divided into six logical layers: Presentation, Authentication, Ingestion, Orchestration, AI Analysis, and Data/Reporting.

### Layer 1 — Presentation Layer

The Presentation Layer is the user-facing web application where marketers upload creatives, define audiences, launch scoring jobs, compare variants, review results, and manage historical sessions.

Key responsibilities:
- Upload image ads, email HTML, SMS copy, and social post content
- Configure audience definitions and scoring settings
- Display progress states for in-flight scoring jobs
- Render score summaries, dimension breakdowns, persona feedback, and recommendations
- Support comparison views, session history, and exported reports

### Layer 2 — Authentication & Access Control

The Authentication Layer secures the platform and controls access to scoring sessions, saved audiences, reports, and account-level settings.

Key responsibilities:
- User sign-up and login
- Session management
- Protected routes and authenticated backend access
- Team/workspace extensibility for future phases

### Layer 3 — Content Ingestion & Validation

The Ingestion Layer accepts marketing inputs from the web application and validates them before any scoring begins. It normalizes all supported content types into a consistent internal structure so downstream analysis remains channel-aware but technically standardized.

Supported inputs:
- Image ads (PNG, JPG, WebP)
- Email campaigns (subject line, preview text, body HTML)
- SMS or push copy
- Social media post copy with optional media metadata

Key responsibilities:
- File upload handling
- Content type detection
- Payload validation
- Metadata extraction
- Input normalization

### Layer 4 — Scoring Orchestration Layer

The Orchestration Layer manages the full scoring lifecycle. Because AdScoreAI includes multi-step AI processing, persona simulation, and comparison workflows, scoring is handled asynchronously rather than as a simple synchronous request.

Key responsibilities:
- Create scoring jobs
- Queue and coordinate analysis steps
- Route content to the correct scoring pipeline by channel
- Manage retries, partial failures, and job status
- Support single scoring, batch scoring, and comparison flows

### Layer 5 — AI Analysis & Persona Simulation Layer

This is the core intelligence layer of AdScoreAI. It evaluates marketing content using LLM-based analysis and synthetic audience simulation to produce both quantitative and qualitative outputs.

This layer includes two major subsystems:

**Creative Analysis Engine**
- Scores clarity
- Detects CTA quality
- Assesses readability and emotional tone
- Evaluates audience fit and brand alignment
- Evaluates visual effectiveness for image-based creatives
- Flags friction or spam risk for email/SMS content

**Persona Simulation Engine**
- Generates synthetic audience members from user-defined target audience inputs
- Simulates individual persona reactions
- Returns engagement likelihood, emotional response, conversion intent, share likelihood, and feedback

### Layer 6 — Data Storage, History, and Reporting

The Data Layer stores the operational data needed to make the product useful over time.

Key responsibilities:
- Save scoring session results
- Store reusable audience definitions
- Persist comparison runs and recommendations
- Track score history across iterations
- Support dashboard retrieval and future export/report generation

### 7.2 Request Flow

1. User uploads or enters marketing content in the dashboard  
2. System validates and normalizes the input  
3. A scoring job is created and queued  
4. Creative analysis is performed based on content type  
5. Synthetic personas are generated from the target audience definition  
6. Personas independently evaluate the creative  
7. Dimension scores are aggregated into a composite AdScore  
8. Recommendations and persona feedback are compiled  
9. Results are saved and displayed in the dashboard  
10. Optional notifications or report delivery actions are triggered

### 7.3 Architecture Notes

- The dashboard and application state are separate from the heavier AI scoring workload.
- Scoring must run in background workers rather than only short-lived serverless handlers.
- The architecture should support provider swapping and future model experimentation.
- The product must remain usable even when some optional integrations are not connected.

---

## 8. Tech Stack

AdScoreAI uses a modern TypeScript-first application stack aligned with the preferred stack selection, while only including technologies directly needed for the product.

| Component | Technology | Purpose |
|---|---|---|
| Frontend | Next.js + Tailwind CSS + shadcn/ui | Dashboard, uploads, results, comparisons, history, settings |
| Authentication | Clerk | User authentication, sessions, protected routes |
| Backend / App Data | Convex | App data, scoring sessions, audiences, report metadata, job state |
| AI Providers | OpenAI / Anthropic | Creative analysis, persona simulation, recommendations |
| Async Processing | Background scoring workers + server-side orchestration | Long-running AI jobs, comparison, batch support |
| File Uploads / Storage | UploadThing or Convex Storage | Creative asset storage and file handling |
| Email Delivery | Resend | Job completion notifications and report emails |
| Analytics | PostHog | Product analytics and usage tracking |
| Rate Limiting | Upstash Redis | Endpoint protection and abuse prevention |
| Validation | Zod | Payload, schema, and config validation |
| Bot / Abuse Protection | Vercel BotID + hCaptcha | Protect auth/public endpoints from abuse |
| CDN / WAF | Cloudflare | Performance and perimeter security |
| Secrets Management | Vercel environment variables | Store keys and service credentials |
| Package Manager | pnpm | Dependency management |

### 8.1 Technologies Not Required in MVP

- Stripe Connect is not needed unless monetization is introduced.
- Full enterprise self-hosting infrastructure is not required in MVP.
- Custom user code sandboxing is not required for the initial build.

---

## 9. Functional Requirements

### 9.1 Core Scoring

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | System shall accept image ads and return a composite score from 1–100 | P0 |
| FR-02 | System shall accept email content including subject line, preview text, and body HTML | P0 |
| FR-03 | System shall return a structured score response including dimension scores and recommendations | P0 |
| FR-04 | System shall support comparison mode for 2–10 variants of the same content type | P0 |
| FR-05 | System shall persist scoring sessions to user history | P0 |
| FR-06 | System shall show job progress for asynchronous scoring requests | P1 |
| FR-07 | System shall support SMS scoring after MVP | P1 |
| FR-08 | System shall support social scoring after MVP | P1 |
| FR-09 | System shall support batch scoring after MVP | P1 |

### 9.2 Audience Simulation

| ID | Requirement | Priority |
|---|---|---|
| FR-10 | Users shall define audience by free text or structured fields | P0 |
| FR-11 | System shall generate synthetic personas from target audience input | P0 |
| FR-12 | Each persona shall return feedback and scored reaction fields | P0 |
| FR-13 | Users shall be able to save and reuse audience profiles | P1 |
| FR-14 | System shall provide preset audience templates in future phase | P1 |

### 9.3 Reporting & History

| ID | Requirement | Priority |
|---|---|---|
| FR-15 | Dashboard shall display score summaries and dimension breakdowns | P0 |
| FR-16 | Dashboard shall display persona-level feedback excerpts | P0 |
| FR-17 | System shall save historical scoring sessions | P0 |
| FR-18 | System shall support report export/download in future phase | P1 |
| FR-19 | System shall show version-over-version score movement in future phase | P2 |

---

## 10. Scoring Dimensions

The AdScore is calculated from weighted sub-scores. Final weights should be configurable per content channel.

| Dimension | Description | Default Weight |
|---|---|---|
| Engagement Potential | Likelihood of interaction, click, or attention | 25% |
| Emotional Resonance | Strength and appropriateness of emotional response | 15% |
| CTA Effectiveness | Clarity and persuasiveness of the call to action | 20% |
| Brand Alignment | Fit with stated brand tone and identity | 10% |
| Audience Relevance | Fit with target audience motivations and expectations | 15% |
| Conversion Intent | Likelihood of desired action or response | 15% |

---

## 11. Key API Endpoints

### POST `/api/v1/score`
Score a single creative.

### POST `/api/v1/compare`
Compare 2–10 variants of the same creative type.

### GET `/api/v1/jobs/:id`
Return job status and progress.

### GET `/api/v1/results/:id`
Return finalized scoring results.

### GET `/api/v1/history`
Return user scoring history.

### POST `/api/v1/audiences`
Create a reusable audience profile.

---

## 12. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Single scoring request should complete within an acceptable async window and provide visible progress |
| Scalability | Architecture must support growth in scoring jobs and concurrent users |
| Security | All application access must be authenticated where required |
| Reliability | Scoring jobs must be retryable and failure-tolerant |
| Extensibility | Providers and modules must be replaceable without full product rewrite |
| Observability | App and worker flows should support logs and analytics |
| Privacy | No unnecessary personal user data should be persisted in scoring content |

---

## 13. Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| Phase 1 — MVP | 6–8 weeks | Auth, dashboard, image/email scoring, job system, saved history, comparison mode |
| Phase 2 — Multi-Channel | 4–6 weeks | SMS and social scoring, improved reporting, more presets |
| Phase 3 — Intelligence | 6–8 weeks | Calibration loop, enhanced weighting, stronger predictive models |
| Phase 4 — Ecosystem | 6–8 weeks | Integrations, webhooks, external API polish, white-label reporting |

---

## 14. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Open-source repo outputs may not correlate with real-world performance | High | Position outputs as directional initially and add future calibration loop |
| Long-running AI requests may cause poor UX | High | Use async workers, progress states, and retry-safe jobs |
| AI cost may become too high at scale | High | Rate limit expensive operations, support provider tuning, optimize persona counts |
| Synthetic personas may reflect model bias | Medium | Support persona configuration, audits, and provider flexibility |
| Repo licenses may impose constraints | Medium | Review each repo’s license before production implementation |

---

## 15. Success Metrics

| Metric | Target |
|---|---|
| MVP launch | Working build with end-to-end scoring flow |
| Time to first score | User can authenticate and complete first score with minimal setup |
| Comparison utility | Users can rank variants before launch |
| Retention signal | Users return to review history and compare iterations |
| Product readiness | Architecture supports post-MVP extensions without rewrite |

---

## 16. Final Product Statement

AdScoreAI is an orchestration product, not just a wrapper around models. Its value comes from combining creative analysis, synthetic audience reactions, structured scoring, and a usable workflow into a product teams can actually operate before launch.

