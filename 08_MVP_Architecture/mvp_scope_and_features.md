# Exam-Clutch MVP — Complete Scope Definition
### From Concept to Launch-Ready Product

---

## The MVP North Star

Before features, before architecture, before a single line of code — the MVP must answer one question for one student in one moment with one output that they would have paid for.

That moment is: **11 PM, exam at 10 AM tomorrow, student opens the app in a panic.**

That output is: **"Here are the 8 topics that will appear on your exam tomorrow, ranked by likelihood, with exactly what you need to know for each, calibrated to how your professor marks."**

Everything in the MVP either serves that moment or is cut. Every feature decision flows from this north star. If a feature doesn't make that 11 PM moment better, it isn't in the MVP.

---

# Part 1: Feature Classification

---

## Core Features (Must Ship)

These five features are the product. Without any one of them, the MVP doesn't achieve the north star moment.

---

### Core Feature 1: The Emergency Study Roadmap Generator

**What it does:** Student inputs subject, available hours, and uploads or pastes the syllabus. The system generates a prioritized study plan: what to study, in what order, for how long, what to skip.

**Why it's core:** This is the highest-urgency problem in all of exam preparation. "I don't know where to start" causes more hours of paralysis than any other problem. Solving it in under 60 seconds is the magic moment.

**Minimum viable version:** A prompt template engine that takes three inputs (subject, syllabus text, hours available) and generates a formatted priority list using a single AI API call. The output is a tiered topic list (Critical / Moderate / Skip) with time allocations.

**What makes it feel magical:** The Skip list. Telling a student explicitly "you don't need to study Unit 8" — and backing it with a reason ("it hasn't appeared in 5 years of past papers for this professor") — is a relief experience unlike anything else in study tools. This single output creates word-of-mouth.

---

### Core Feature 2: The PYQ (Previous Year Paper) Analyzer

**What it does:** Student uploads or pastes previous year exam questions. The system analyzes them to identify recurring topics, question patterns, and predicted high-probability topics.

**Why it's core:** Past paper analysis is the highest-ROI study activity a student can do. It is also cognitively expensive and time-consuming to do manually. AI can do it in seconds. This is the most concrete demonstration of the app doing something the student genuinely couldn't do alone.

**Minimum viable version:** Accept pasted or uploaded text of past papers. Run structured analysis via a single Claude or ChatGPT API call using the PYQ analysis template. Return a frequency table, pattern summary, and top 5 predicted questions.

**What makes it feel magical:** The predicted questions. When 2 or 3 of those predictions appear on the actual exam, the student becomes a permanent advocate. This is the single most powerful virality driver in the entire product.

---

### Core Feature 3: The Prompt Pack Generator

**What it does:** Based on the subject, professor type, and study task, generates ready-to-paste prompts calibrated for ChatGPT, Claude, or Gemini. Student copies the prompt, opens the AI tool, pastes it, gets a high-quality output.

**Why it's core:** The single most universal problem in student AI use is prompt engineering confusion. Students get bad AI outputs not because the AI is bad but because they don't know how to ask. Ready-to-paste prompts solve this instantly and visibly.

**Minimum viable version:** A prompt library organized by task type (concept learning, flashcards, practice questions, revision notes, last-minute summary). Each prompt is pre-built with variable placeholders that the student fills in: [SUBJECT], [TOPIC], [MARKS]. No AI API needed for the prompts themselves — they are static templates rendered with user inputs.

**What makes it feel magical:** The quality of the AI output the student gets. When a student pastes one of these prompts and gets a dramatically better response than they've ever gotten from ChatGPT, they immediately understand the value. The prompt is the product.

**Critical note:** This feature uses zero AI API calls for generation. The prompts are pre-built templates. The AI call happens in the external tool (ChatGPT, Claude) — not in the app. This dramatically reduces infrastructure cost.

---

### Core Feature 4: The Professor Intelligence Profile

**What it does:** Student selects or describes their professor's exam style (theory-heavy, numerical, strict marking, PYQ-repeating, etc.) and the system generates a professor-calibrated preparation strategy: what to focus on, what writing style to use, what specific mistakes to avoid.

**Why it's core:** This feature doesn't exist anywhere else. No study tool tells a student "for a strict-checking professor, always end your answer with a conclusion statement or you lose 1–2 marks regardless of how good the rest is." This is the insider knowledge that circulates informally between students. Making it systematic is genuine product differentiation.

**Minimum viable version:** A 6-question professor behavior survey (from the professor intelligence system design) that generates a professor type classification. The classification triggers a pre-built strategy card: a 200-word brief explaining exactly how to study and write for that professor type, what answer structures score highest, and what marks traps to avoid.

**What makes it feel magical:** The marks trap. When the system says "your professor always deducts for missing units in calculations — confirmed by past students" — students immediately share this with their study group.

---

### Core Feature 5: The 24-Hour Survival Workflow

**What it does:** Integrated workflow that combines the above features into a single session: input subject and time → get priority list → upload past papers → get predictions → receive hour-by-hour plan with prompts for each phase.

**Why it's core:** Individual features provide value. The integrated workflow provides the transformative experience that creates addiction and word-of-mouth. The student doesn't need to understand how the system works — they just need to follow the steps.

**Minimum viable version:** A guided flow: 5 screens that walk the student from panicking to having a specific plan in under 10 minutes. No AI call needed until the student reaches the roadmap generation and PYQ analysis steps.

---

## Non-Essential for MVP (Remove Now)

These features add genuine value but are not needed for the MVP to feel magical. Each one adds significant build time with marginal impact on the north star moment.

**User accounts and persistent data storage.** The MVP can work statelessly — each session starts fresh. Adding authentication, session history, and profile persistence adds 2–4 weeks of build time. The first 500 users don't need it. They need the core workflow to work once, perfectly.

**Multi-subject dashboard.** Showing all subjects, their preparation status, and cross-subject planning is valuable for a student with 8 exams. It's not needed for a student using the tool for the first time on a single exam the night before.

**Progress tracking and analytics.** Charts showing hours studied, topics covered, preparation percentages — these are engagement features, not utility features. They serve returning users, not first-time users. Build after retention is proven.

**Social and community features.** Study groups, shared notes, peer leaderboards, professor reviews from other students. All genuinely valuable. None of them are what a student needs at 11 PM before an exam.

**Spaced repetition system.** A built-from-scratch flashcard system with interval scheduling is a major technical build that competes with Anki. The MVP generates flashcard content; Anki handles the scheduling. Integrate, don't replicate.

**Mobile app.** A well-executed web app that works on mobile browsers is sufficient for MVP. Native iOS/Android apps add 4–8 weeks per platform. Ship the web experience first.

---

## Features to Delay (Post-MVP, Version 2)

These features are important enough to plan for but not urgent enough to build now.

**AI-powered answer evaluation.** Where the student writes an answer and the app marks it. High value, high complexity, high API cost. The MVP generates prompts that tell the student to paste their answer into Claude for evaluation. Same outcome, zero infrastructure cost.

**Voice input and audio workflows.** Students who learn auditorily would benefit enormously from audio revision features. Requires audio processing, NotebookLM integration, and audio generation APIs. Version 2.

**Professor database with crowdsourced intelligence.** Where past students contribute what appeared on a professor's exam, which predictions came true, what marks traps they encountered. Requires moderation, data structure, and critical mass. Powerful network effect once it exists. Version 2.

**Real-time exam countdown features.** Dynamic workflows that update as the exam approaches (72h mode → 48h mode → 24h mode → 4h mode). The MVP handles any time input; the dynamic progression is a product polish feature for Version 2.

**Subject-specific specialized modules.** Dedicated MBBS preparation, dedicated Law preparation, dedicated Engineering preparation — each with deep domain customization. The MVP handles all subjects with generic calibration. Specialization comes after identifying which subjects drive the most usage.

**Competitive exam preparation.** UPSC, CAT, GMAT, GRE — different preparation patterns from university exams. Separate product logic. Post-MVP entirely.

---

## Features That Create Maximum Perceived Value

These must be in the MVP despite minimal technical complexity, because they create the "this is magic" perception.

**The Skip List.** One output line that says "You can safely skip: Unit 8, Unit 12, Unit 14." This costs almost nothing to generate (it's the low-frequency end of the PYQ analysis) and creates more perceived value than any other single output. Students have never had explicit permission to not study something from a data-backed source.

**Predicted Questions with Confidence Scores.** "Based on 5 years of past papers, these 3 questions are most likely to appear: [Q1] ★★★, [Q2] ★★☆, [Q3] ★☆☆." The confidence star rating makes it feel analytical and trustworthy. When predictions come true, the product is remembered forever.

**Professor Marks Trap Cards.** Small, shareable insights: "Prof. [TYPE] always deducts for missing conclusions. This costs 1–2 marks per answer regardless of content quality." These are screenshots waiting to happen.

**The Time Calculator.** "You have 18 hours and 6 critical topics. That's exactly 2.5 hours per topic. This plan is achievable." Making the math explicit and showing it works creates immediate calm. Students who are panicking because "there's too much" become capable students who "have a plan."

**Ready-to-Paste Prompts with Character Count.** Showing the student "this prompt is 312 characters — paste it into ChatGPT's free tier, it's within the limit" removes a practical barrier and makes the feature feel considerate of the student's actual situation.

---

## Features That Create Virality

Virality for an exam prep tool works differently from consumer apps. Students don't share tools — they share outcomes. Design for screenshots of outcomes, not sharing of features.

**The Prediction Screenshot.** After using the PYQ analyzer, students receive a "Predicted Questions" card formatted to look clean at screenshot size. They share this in their study group WhatsApp. When the prediction is right: massive word-of-mouth. Design the output for shareability from the start — clean typography, no cluttered UI, the prediction prominently displayed.

**The Skip List Screenshot.** "Exam-Clutch says I can skip 4 units and still be prepared for 85% of the paper." This is a screenshot that spreads instantly in any group of panicking students. Every student in the group is the target user.

**The Prompt Quality Demonstration.** Before-and-after: "Here's what ChatGPT gave me without the Exam-Clutch prompt. Here's what it gave me with it." Students who experience significantly better AI outputs immediately want to tell friends. Build a share-as-image feature for prompt outputs.

**Referral at the Moment of Value.** Immediately after the 24-hour survival workflow is generated, display: "You just got your exam plan. Share it with one classmate who's also panicking tonight — they can use Exam-Clutch for their subject." The referral ask at the peak emotional moment (relief after panic) has the highest conversion rate.

**Group Plan Generation.** "Generate a plan for your entire study group" — one student inputs 5 names and 5 subjects, receives 5 individual plans. Each person receives their personalized plan via a link. This is viral by design: one user generates 5 new users per activation.

---

## Features Students Would Pay For

Listed in order of payment willingness based on the student psychology analysis.

**Priority 1 — Predicted Exam Questions (₹199–299 per exam session).** The single highest-willingness-to-pay feature. "What will appear on tomorrow's exam" is a question students would historically pay for tutoring to answer. The AI-powered version at a fraction of the cost is an obvious purchase at peak panic.

**Priority 2 — Professor-Specific Intelligence Reports (₹149–249 per report).** A 1-page brief on a specific professor's exam behavior: topics they always test, question types, marks traps, writing style that scores highest. Students with difficult professors will pay immediately.

**Priority 3 — Full 24-Hour Survival Workflow (₹99–199 per activation).** The complete integrated experience: triage → PYQ analysis → hour-by-hour plan → full prompt pack. Priced as a one-time purchase per exam session. No subscription friction.

**Priority 4 — Premium Prompt Pack (₹49–99 per subject).** The complete set of 15–20 calibrated prompts for a specific subject and professor type. Students who are not in crisis but want the full toolkit will pay this without hesitation.

**Priority 5 — Semester Subscription (₹499–999 per semester).** For students who use it across multiple exams in a semester. Unlocks everything. The payment logic for subscription students is different from crisis purchasers — they need to see the cumulative value across multiple sessions before subscribing.

**Free tier boundary:** The roadmap generation (what to study) is free. The prediction intelligence (what will appear) is paid. This is the correct freemium boundary: free enough to hook, premium enough to monetize the highest-value moment.

---

# Part 2: Technical Implementation

---

## Simplest Technical Implementation Strategy

The MVP should be built to validate the value proposition, not to scale. Every architectural decision should optimize for speed of build and cost of operation, not for eventual scale. Scale is a good problem to have. It comes after product-market fit.

**Rule 1: No custom AI models.** Use off-the-shelf LLM APIs (Claude API or OpenAI API). The prompt engineering IS the product. The AI model is infrastructure, like electricity.

**Rule 2: No custom database initially.** Use Supabase (PostgreSQL hosted) for all data storage. It's free up to meaningful scale, has a generous free tier, includes authentication, and has a good SDK.

**Rule 3: No custom authentication initially.** Use Supabase Auth or Clerk. Do not build authentication. It's solved infrastructure.

**Rule 4: Static prompt templates.** The 57 base templates from the prompt architecture are static files, not AI-generated outputs. They are stored as structured text. Variable injection is simple string interpolation. Zero AI API cost for prompt generation.

**Rule 5: Minimal server-side logic.** The heavy computation (AI API calls) happens on the server. Everything else can be client-side or edge functions. Use Vercel Edge Functions or Cloudflare Workers for API calls — minimal server maintenance, scales automatically.

**Rule 6: No proprietary AI infrastructure.** Do not build RAG systems, vector databases, fine-tuned models, or custom embeddings for the MVP. These are Version 3 features. The MVP uses the same APIs available to every developer — the differentiation is in the prompt engineering and the user experience.

---

## Technology Stack

```
FRONTEND:
  Framework:        Next.js 14 (App Router)
  Styling:          Tailwind CSS
  Components:       shadcn/ui
  State Management: Zustand (lightweight, no Redux overhead)
  File Uploads:     react-dropzone
  Deployment:       Vercel (free tier sufficient for MVP scale)

BACKEND:
  API Routes:       Next.js API Routes / Route Handlers
  AI APIs:          Anthropic Claude API (primary)
                    OpenAI GPT-4o API (secondary / fallback)
  Authentication:   Supabase Auth
  File Storage:     Supabase Storage (for PDF uploads)

DATABASE:
  Primary:          Supabase (PostgreSQL)
  ORM:              Prisma (type-safe, works with Supabase)
  Caching:          Vercel KV (Redis-compatible) for rate limiting

PAYMENTS:
  Provider:         Razorpay (India-first, best for target market)
  Model:            Pay-per-session (₹99–299) + semester subscription

ANALYTICS:
  Product:          PostHog (free tier, open source)
  Errors:           Sentry (free tier)

EMAIL:
  Provider:         Resend (simple API, free tier)
  Purpose:          Session completion emails with prompt packs

TOTAL MONTHLY INFRASTRUCTURE COST AT MVP SCALE (~500 users):
  Vercel:           Free tier
  Supabase:         Free tier (up to 500MB, 50,000 monthly active users)
  AI APIs:          ~₹3,000–8,000/month depending on usage
  Razorpay:         2% per transaction (zero fixed cost)
  TOTAL FIXED:      ~₹3,000–8,000/month (almost entirely AI API costs)
```

---

## AI API Cost Management

At MVP scale, AI API costs are the primary variable expense. The system is designed to minimize unnecessary API calls.

```
COST REDUCTION STRATEGIES:

1. STATIC PROMPTS (zero API cost):
   The prompt pack generator uses static templates + variable injection.
   No AI call needed to generate prompts.
   Cost: ₹0 per prompt generated.

2. CACHED RESPONSES:
   PYQ analysis for the same past papers produces the same output.
   Cache the analysis result (hashed input → stored output).
   For common subjects, the second student analyzing the same paper
   costs ₹0.

3. TIERED MODEL USAGE:
   Emergency summaries → GPT-4o-mini (10x cheaper than GPT-4o)
   PYQ analysis → Claude Haiku or GPT-4o-mini (fast, cheap)
   Complex answer evaluation → Claude Sonnet (quality matters here)
   Reserve Claude Opus → Not in MVP (too expensive)

4. PROMPT LENGTH OPTIMIZATION:
   Long system prompts cost money on every call.
   Move invariant context (subject, professor type) to a compressed
   system prompt. Keep only the dynamic content in the user message.

5. API CALL BUDGET PER SESSION:
   Target: ≤3 API calls per free session
   Target: ≤6 API calls per paid session
   This keeps API cost per session under ₹8–15.
   At ₹199 per session, margin is comfortable.

ESTIMATED API COST PER SESSION TYPE:
  Free session (roadmap only):      ₹5–8
  Paid session (full workflow):     ₹12–20
  At ₹199 paid session price:       60–70% gross margin after API costs
```

---

## MVP User Flow

The complete user journey from first visit to completed workflow, designed for the north star moment.

---

### Screen 1: The Landing Page

No feature list. No pricing table. One headline, one input, one button.

```
LANDING PAGE:

Headline: "What exam are you surviving?"

Input field: "Type your subject..."
              [e.g., Corporate Law, Thermodynamics, Macroeconomics]

Sub-input: "Hours until your exam:"
              [Slider: 4h | 12h | 24h | 48h | 72h+]

CTA Button: "Build my study plan →"

Below the fold (minimal):
  Three outcome statements from past users:
  "Predicted 4 of 5 questions in my Finance paper."
  "Covered 14 units in 18 hours. It actually worked."
  "My professor's question pattern was exactly what the app showed."
```

No login wall. No onboarding survey. Immediate value delivery.

---

### Screen 2: Professor Intelligence (60 seconds)

```
SCREEN 2:

Headline: "Tell us about your professor in 30 seconds."

6 tappable questions (single-select each):

1. What does a typical exam look like?
   [Mostly definitions] [Mostly problems] [Essays/analysis]
   [Case scenarios] [Derivations] [Mixed]

2. What do students who score high typically do?
   [Memorize definitions precisely] [Practice lots of problems]
   [Know past papers well] [Apply concepts to real situations]
   [Have the best-presented answers]

3. How is this professor's marking?
   [Fair and straightforward] [Strict — small errors cost marks]
   [Unpredictable] [Rewards depth] [Rewards coverage]

4. How consistent are exam topics year to year?
   [Very consistent — same questions] [Same topics, different angle]
   [Hard to predict] [Haven't looked at past papers]

5. Your target for this exam:
   [Just pass] [55–70%] [70–85%] [85%+]

6. Time available NOW:
   (Pre-filled from Screen 1 — confirm or adjust)

[Generate My Exam Strategy →]

No login required yet. This data is stored in session.
```

---

### Screen 3: The Strategy Brief (The First Magic Moment)

Generated in real-time as the student completes Screen 2. Uses a lightweight AI call (or rule-based logic for the MVP) to generate the strategy.

```
SCREEN 3:

Header: "Your Exam Strategy"
Sub: "Corporate Law · 18 hours · Theory-Heavy Professor"

[ANIMATED GENERATION — builds confidence while loading]

┌─────────────────────────────────────────────────────────────┐
│  YOUR SITUATION                                              │
│                                                             │
│  "You have 18 hours for a theory-heavy professor who        │
│   values scholarly frameworks and precise definitions.      │
│   With the right priorities, 18 hours is enough to          │
│   cover what matters."                                      │
└─────────────────────────────────────────────────────────────┘

WHAT TO STUDY (priority order):
  ★★★  Contract Formation          ~2.5 hours
  ★★★  Breach and Remedies         ~2.5 hours
  ★★☆  Company Directors' Duties   ~2 hours
  ★☆☆  Tortious Liability          ~1 hour (skim only)

WHAT TO SKIP:
  ✕  Historical Development of Company Law — skip entirely
  ✕  Comparative International Law — not testable this year
  ✕  Pre-Independence Case Law — not this professor's focus

YOUR ANSWER STYLE:
  This professor rewards theoretical frameworks named correctly,
  precise legal definitions, and answers with clear conclusions.
  Missing a conclusion costs 1–2 marks per question.

[Upgrade to see: Predicted exam questions, full prompt pack,
 and hour-by-hour schedule →]

[Or: Upload past papers for better predictions ↓]
```

This screen is the freemium gate. The strategy brief is free. The prediction intelligence is paid.

---

### Screen 4: PYQ Upload (The Value Multiplier)

```
SCREEN 4: (triggered by "Upload past papers" or "Get Predictions")

Headline: "Upload past papers for exam intelligence."

UPLOAD ZONE:
  [Drop PDFs here, or paste questions as text]
  Accepts: PDF, images, plain text
  Supports: up to 5 years of papers

WHY THIS MATTERS:
  "Past paper analysis identifies which topics this professor
   tests every year — and which ones you can safely skip.
   Students who use this feature report our predictions
   are accurate ~75% of the time."

[Analyze My Papers →]

Note: This triggers the paid conversion.
If free user: "This analysis costs ₹99. Your predicted questions
              will be ready in 30 seconds."
```

---

### Screen 5: The Prediction Dashboard (The Magic Moment)

This is the highest-value screen in the product. Design it as if it will be screenshotted and shared.

```
SCREEN 5:

Header: "Exam Intelligence Report"
Sub: "Corporate Law · Based on 4 years of past papers"
Confidence: ████████░░ 78% confident

PREDICTED QUESTIONS (most likely to appear):

1. ★★★ HIGH PROBABILITY
   "Explain the essential elements of a valid contract with
    reference to Indian Contract Act."
   [Appeared: 2021, 2022, 2023]
   [Prepare in: 45 min]
   [Get prompts for this →]

2. ★★★ HIGH PROBABILITY
   "Directors' fiduciary duties — analyze with case law."
   [Appeared: 2020, 2022, 2023]
   [Prepare in: 40 min]
   [Get prompts for this →]

3. ★★☆ MODERATE PROBABILITY
   "Distinguish between void, voidable, and unenforceable contracts."
   [Appeared: 2021, 2022]
   [Prepare in: 30 min]
   [Get prompts for this →]

SAFE TO SKIP (never appeared):
  ✕ Question on Quasi-Contracts (Section 68–72)
  ✕ Historical evolution of company law
  ✕ Comparative law questions

[Get My Complete Prompt Pack →]    [Share these predictions]

SHARE CARD (screenshot-optimized):
"Exam-Clutch predicts these 3 questions for Corporate Law:
 1. Essential elements of a valid contract
 2. Directors' fiduciary duties
 3. Void vs voidable contracts
 See if they're right after your exam."
```

---

### Screen 6: The Prompt Pack

```
SCREEN 6:

Header: "Your Ready-to-Paste Prompts"
Sub: "Corporate Law · 15 prompts · 3 tools · Theory-Heavy"

FILTER BAR: [All] [ChatGPT] [Claude] [Gemini] [NotebookLM]
            [Concept] [Practice] [Revision] [Last-Minute]

PROMPT CARDS (scrollable):

┌─────────────────────────────────────────────────────────────┐
│  📋 PROMPT 1 of 15                                           │
│  Task: Understand Contract Formation | Tool: ChatGPT        │
│  Calibrated: Theory-Heavy Professor · 10-mark answer        │
│─────────────────────────────────────────────────────────────│
│  "You are a Corporate Law tutor preparing a student for a   │
│   final year LLB exam with a theory-heavy professor.        │
│   [Full prompt text...]"                                    │
│─────────────────────────────────────────────────────────────│
│  [Copy Prompt]  [Open ChatGPT]  [Mark as Used ✓]           │
└─────────────────────────────────────────────────────────────┘

[Schedule: Use prompts in this order for your 18-hour plan →]
```

---

### Screen 7: The Hour-by-Hour Schedule

```
SCREEN 7: (final paid screen)

Header: "Your 18-Hour Study Plan"

TODAY:
09:00 PM  [📋] Contract Formation Concept Load         ChatGPT  45min
09:45 PM  [📋] Contract Formation Deep Understanding    Claude  30min
10:15 PM  [📋] Practice Questions — Contract Formation ChatGPT  20min
10:35 PM  ☕ SHORT BREAK                                —       10min
10:45 PM  [📋] Breach and Remedies Concept Load        ChatGPT  45min
[...]
02:30 AM  🛑 STOP STUDYING. Sleep is now more valuable.

EXAM DAY:
08:00 AM  [📋] Final 10-minute flash review            ChatGPT  10min
08:30 AM  ✓  Arrive at exam. You're prepared.

Each [📋] is a copy button for the relevant prompt.
```

---

## MVP Database Structure

Minimal. Only store what is essential for the core experience.

```sql
-- USERS (minimal — email + metadata only)
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE,
  created_at  TIMESTAMP DEFAULT now(),
  last_active TIMESTAMP,
  total_sessions INT DEFAULT 0
);

-- SESSIONS (the core unit of value delivery)
CREATE TABLE sessions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id),  -- NULL for anonymous
  session_token     TEXT UNIQUE,  -- For anonymous session recovery
  subject           TEXT NOT NULL,
  hours_remaining   INT NOT NULL,
  professor_type    TEXT,         -- Derived from survey
  target_marks      TEXT,
  survey_responses  JSONB,        -- Raw survey answers
  created_at        TIMESTAMP DEFAULT now(),
  is_paid           BOOLEAN DEFAULT false,
  payment_id        TEXT          -- Razorpay payment reference
);

-- GENERATED OUTPUTS (cache + history)
CREATE TABLE outputs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID REFERENCES sessions(id),
  output_type     TEXT,   -- 'strategy_brief' | 'pyq_analysis' |
                          -- 'prompt_pack' | 'schedule'
  content         JSONB,  -- Structured output
  created_at      TIMESTAMP DEFAULT now(),
  ai_tokens_used  INT,    -- For cost tracking
  model_used      TEXT    -- Which AI model generated this
);

-- UPLOADED PAPERS (for PYQ analysis)
CREATE TABLE uploaded_papers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID REFERENCES sessions(id),
  file_url        TEXT,    -- Supabase Storage URL
  file_type       TEXT,    -- 'pdf' | 'text' | 'image'
  extracted_text  TEXT,    -- Parsed text content
  analysis_cache  JSONB,   -- Cached PYQ analysis result
  content_hash    TEXT,    -- For deduplication
  created_at      TIMESTAMP DEFAULT now()
);

-- PROMPT TEMPLATES (static data, versioned)
CREATE TABLE prompt_templates (
  id              TEXT PRIMARY KEY,  -- e.g., 'CL-001'
  category        TEXT,
  task_type       TEXT,
  target_tool     TEXT,
  template_body   TEXT,
  variables       JSONB,
  is_active       BOOLEAN DEFAULT true,
  version         INT DEFAULT 1
);

-- FEEDBACK (for quality improvement)
CREATE TABLE feedback (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID REFERENCES sessions(id),
  feedback_type   TEXT,   -- 'prediction_accuracy' | 'prompt_quality' |
                          -- 'workflow_useful' | 'would_recommend'
  rating          INT,    -- 1-5
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT now()
);

-- PAYMENTS
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  session_id      UUID REFERENCES sessions(id),
  razorpay_id     TEXT UNIQUE,
  amount_paise    INT,    -- Amount in paise (₹199 = 19900 paise)
  product_type    TEXT,   -- 'session' | 'prompt_pack' | 'semester'
  status          TEXT,   -- 'pending' | 'completed' | 'failed'
  created_at      TIMESTAMP DEFAULT now()
);
```

**What's deliberately excluded from the MVP database:**
- User preference profiles (beyond session-level data)
- Flashcard storage and spaced repetition state
- Study history and analytics
- Professor database (crowdsourced)
- Social/community features

---

## MVP Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT LAYER                           │
│                                                             │
│   Next.js 14 App Router (React)                             │
│   Tailwind CSS + shadcn/ui                                  │
│   Zustand (session state management)                        │
│                                                             │
└─────────────────────┬───────────────────────────────────────┘
                      │  HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│                      API LAYER                               │
│                                                             │
│   Next.js Route Handlers (Vercel Edge Functions)            │
│                                                             │
│   /api/generate-strategy     → Rule-based + AI              │
│   /api/analyze-papers         → Claude API call             │
│   /api/generate-prompts       → Template injection (no AI)  │
│   /api/generate-schedule      → AI call (optional)         │
│   /api/payments/create        → Razorpay                    │
│   /api/payments/verify        → Razorpay webhook            │
│                                                             │
└──────┬─────────────────────────────────────┬────────────────┘
       │                                     │
┌──────▼──────────┐                 ┌────────▼────────────────┐
│  SUPABASE        │                 │   AI API LAYER          │
│                 │                 │                         │
│  PostgreSQL DB  │                 │  Anthropic Claude API   │
│  Auth           │                 │  OpenAI GPT-4o API      │
│  Storage        │                 │  (failover)             │
│  (PDF uploads)  │                 │                         │
└─────────────────┘                 └─────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│                                                             │
│   Razorpay (payments)          Resend (email)               │
│   PostHog (analytics)          Sentry (errors)              │
│   Vercel KV (rate limiting)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

DATA FLOW FOR THE CORE SESSION:

1. Student inputs subject + hours → stored in Zustand (client)
2. Survey responses → stored in Zustand (client)
3. [API call 1] Strategy generation → Claude API → cached in DB
4. Student uploads papers → Supabase Storage
5. [API call 2] PYQ analysis → Claude API → cached in DB
6. Prompt generation → Template injection → NO API CALL
7. Schedule generation → [API call 3] or rule-based logic
8. Payment → Razorpay → webhook → unlock paid outputs in DB
9. Session completion → email with prompt pack → Resend

TOTAL API CALLS PER FULL PAID SESSION: 2–3
TOTAL INFRASTRUCTURE COST PER SESSION: ₹10–18
```

---

# Part 3: Launch Strategy

---

## MVP Launch Strategy

### Phase 0: Pre-Launch Validation (2 weeks before build)

Before writing a line of code, validate the core assumption: will students share the PYQ prediction output?

**Method:** Build a manual version. Take 10 students' past papers. Manually run the PYQ analysis using Claude. Send them the output as a PDF. Measure: do they share it? Do they come back after the exam to tell you if it was accurate?

If the answer is yes to both: build the product. If no: adjust the hypothesis before building.

**Target:** 10 manual sessions. 3–5 students who share the output without being asked. 2–3 who report prediction accuracy after their exam. This validates the north star assumption.

---

### Phase 1: Closed Beta (Weeks 1–4 of launch)

**Target users:** 50–100 students from 2–3 universities, recruited personally.

**Focus:** Does the core workflow work? Do students complete the full flow? Where do they drop off? Do predictions come true?

**Distribution:** Direct outreach in university student groups, hostels, study groups. Not ads. Personal messages from the founder. "I built something for exam prep — try it for free and tell me if it helps."

**Success metrics:**
- Completion rate: >60% of users who start the workflow complete it
- Prediction accuracy: >50% of students report at least 2 predictions came true
- Share rate: >30% of students share the prediction card without prompting
- Return rate: >40% of students use it for their next exam

**What to do during beta:**
- Talk to every single user. Not surveys — actual conversations.
- Track every drop-off point in the flow.
- Collect every prediction accuracy report.
- Build the testimonials and case studies that become the marketing.

---

### Phase 2: Soft Launch (Weeks 5–8)

**Target:** 500 users. First paid conversions.

**Distribution channels:**
- University student Facebook groups and WhatsApp channels
- Instagram/YouTube shorts: "I asked AI to predict my exam questions and here's what happened"
- Reddit: r/india, university-specific subreddits, r/studytips
- Referral program: existing beta users share with 3 friends in exchange for free premium session

**Pricing activation:**
Introduce the paid tier ($199/session) for the first time. The beta users become the social proof. The founder's direct conversation with beta users becomes the testimonials.

**Target metrics:**
- 500 registered users
- 50 paid sessions
- 5 documented prediction accuracy stories (screenshots of correct predictions)
- 3 unprompted testimonials suitable for marketing

---

### Phase 3: Growth (Weeks 9–16)

**Target:** 2,000 users, sustainable unit economics.

**Distribution:**
- Content marketing: blog posts on "how to use AI for [specific subject] exam"
- SEO targeting: "[university name] past papers", "[subject] exam tips", "how to study for [exam type] in 24 hours"
- Instagram account: daily exam tips, AI prompt examples, student testimonials
- Referral program: formalized — every referral earns the referrer a free premium session

**Product iterations from beta learnings:**
The most important feature additions are determined by what users ask for, not by the roadmap. The roadmap is an assumption. User behavior is data.

---

# Part 4: Final Roadmap

---

## Prioritized Build Order

```
WEEK 1-2: FOUNDATION
  ✓ Next.js project setup + Supabase + Vercel deployment
  ✓ Landing page (subject input + hours input + CTA)
  ✓ Professor survey screen (6 questions)
  ✓ Static strategy brief generator (rule-based, no AI)
  ✓ Prompt template database (50 base templates loaded)
  ✓ Prompt pack display (filtered by task/tool)

  VALIDATION GATE: Can a student go from "I need to study for
  Corporate Law" to "here is my strategy and 5 prompts" in
  under 5 minutes without any AI API call?

WEEK 3-4: THE MAGIC
  ✓ Claude API integration for strategy generation
  ✓ PDF/text upload (Supabase Storage)
  ✓ PYQ analysis engine (Claude API call with PYQ template)
  ✓ Predicted questions display (the screenshot moment)
  ✓ Skip list generation
  ✓ Share card generation (screenshot-optimized prediction card)

  VALIDATION GATE: Do 5 manual test users screenshot and share
  the prediction output without being asked?

WEEK 5-6: MONETIZATION
  ✓ Razorpay integration
  ✓ Payment flow (₹199 per session unlock)
  ✓ Free vs paid content boundary implementation
  ✓ Session completion email (Resend)
  ✓ Post-exam feedback collection (prediction accuracy)

  VALIDATION GATE: Do beta users convert to paid without
  needing to be asked/prompted?

WEEK 7-8: POLISH AND VIRALITY
  ✓ Hour-by-hour schedule generator
  ✓ Referral program (share link → free session)
  ✓ Group plan generation (1 user → 5 invitations)
  ✓ Mobile-responsive polish
  ✓ Error states and loading states
  ✓ Basic analytics (PostHog)

  LAUNCH READY.
```

---

## The Critical Path

These are the three decisions that will determine whether the MVP succeeds or fails. Everything else is implementation detail.

**Critical Path Decision 1: The PYQ prediction quality.**
If the predicted questions are accurate even 50–60% of the time, the product creates word-of-mouth. If accuracy is consistently below 30%, the product loses trust. The Claude API prompt for PYQ analysis must be tested extensively on real past papers before launch. This is the highest-priority quality investment.

**Critical Path Decision 2: The freemium boundary.**
If too much is free, no one pays. If too little is free, no one tries it. The correct boundary: strategy brief (what to study) is free, prediction intelligence (what will appear) is paid. This boundary must be felt as fair — students should leave the free experience thinking "that was genuinely useful" and the paid upgrade feeling like an obvious choice, not a paywall.

**Critical Path Decision 3: The first 50 users.**
The first 50 users must be recruited personally. They are not acquired through ads or SEO. They are found in university student groups, in engineering and law college WhatsApp chats, in hostel common rooms. The founder must personally onboard each of these users, watch them use the product, and have a real conversation about what worked and what didn't. These 50 users determine whether the product is built correctly.

---

## Biggest Mistakes to Avoid

**Mistake 1: Building too much before validating the north star.**
The single most common startup failure mode. Building 8 features when 2 are needed. The PYQ prediction + prompt pack is the entire MVP. Everything else can be added after those two features are proven to create the magic moment.

**Mistake 2: Requiring sign-up before delivering value.**
A login wall before the student receives any output will kill conversion. The student must experience the strategy brief before they are asked to create an account. Email capture happens at the moment of peak value (when they receive their predictions) — not at the door.

**Mistake 3: Optimizing for breadth of subjects before depth of experience.**
It is better to work extraordinarily well for 3 subjects (Corporate Law, Thermodynamics, Macroeconomics) than adequately for 30. The prompt templates, professor intelligence, and PYQ analysis quality should be tested deeply on a few subjects before expanding.

**Mistake 4: Ignoring the post-exam feedback loop.**
The prediction accuracy data is the most valuable asset the product can accumulate. Every student who uses the PYQ analysis must be asked, after their exam: "Which predictions came true?" This data improves the system AND creates the testimonials that drive growth. Build the post-exam feedback flow in Week 5 and treat it as a core feature.

**Mistake 5: Building for the organized student when the paying customer is the panicking student.**
The urge to build features for students who start preparing 2 weeks in advance is strong — they are thoughtful, they will give good feedback, they use the product more. But they also have many alternatives. The student with 18 hours and no plan has no good alternative. Design for the crisis. The organized student will find their way to the product when they hear about what it does for their panicking classmate.

**Mistake 6: Using expensive AI models for everything.**
GPT-4o costs 10x more than GPT-4o-mini. Claude Opus costs 5x more than Claude Haiku. For the MVP, the only tasks that require the expensive models are PYQ analysis (where accuracy matters) and complex answer evaluation. Everything else — strategy generation, prompt templates, schedule building — should use the cheapest model that produces adequate output. Test this explicitly before launch.

**Mistake 7: Delaying the share mechanics.**
The prediction share card should be built in Week 3–4, not after launch. Without sharing mechanics, word-of-mouth is organic but unscaled. The share card is the product's growth engine. Every week it is delayed is a week of compounding growth lost.

**Mistake 8: Not having a clear answer to "what makes you different from just using ChatGPT."**
Every student will ask this. The answer is three things: (1) professor-calibrated intelligence — the app knows how your specific professor marks; (2) past paper analysis — it tells you what will appear, not just what the subject covers; (3) ready-to-paste prompts — better AI outputs in less time. If any of these three differentiators is weak, the answer falls apart. All three must be defensibly true at launch.

---

## The Launch Day Checklist

```
TECHNICAL:
  □ Landing page live and tested on mobile
  □ Professor survey working end-to-end
  □ Strategy brief generating (free tier)
  □ PDF upload and PYQ analysis working (paid tier)
  □ Prompt pack generating and copyable
  □ Razorpay payment tested with real card
  □ Session completion email working
  □ Share card generating and downloadable
  □ Error states visible and helpful
  □ PostHog analytics capturing key events

CONTENT:
  □ 50 base prompt templates loaded and tested
  □ 10 subjects with deep template coverage
  □ Professor type strategy cards written for all 10 types
  □ Landing page copy tested for clarity with 5 real students

VALIDATION:
  □ 10 manual beta sessions completed
  □ At least 3 prediction accuracy reports collected
  □ At least 2 organic share events documented
  □ At least 1 paid conversion from beta users
  □ Founder has watched 10 users complete the full flow

LAUNCH DISTRIBUTION:
  □ 5 university student WhatsApp groups identified
  □ Reddit posts written for exam season
  □ 3 founder testimonial posts ready for LinkedIn/Twitter
  □ Beta user referral ask prepared
  □ "Share if this helped" language on prediction screen
```

---

*Exam-Clutch MVP — Complete Scope Definition*
*Version 1.0 — Ready for Build*
