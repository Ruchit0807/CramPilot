# AI Routing Intelligence System
### Exam-Clutch — Complete Design Document

---

## Overview

The AI Routing Intelligence System (ARIS) solves one of the most expensive hidden problems in student AI usage: tool-task mismatch. A student using ChatGPT to memorize case law, Claude to solve calculus problems, or Gemini to build conceptual understanding of quantum mechanics is using the right tools for the wrong jobs. The mismatch costs hours per exam season and produces inferior outputs compared to optimal routing.

ARIS doesn't ask students to understand which tool is best for which task. It makes that decision invisibly, surfacing only the recommendation and the ready-to-paste prompt. The student focuses on studying. The system handles orchestration.

---

# Part 1: Deep Tool Analysis

---

## Tool 1 — ChatGPT (GPT-4o)

### Core Capability Profile

ChatGPT's fundamental strength is breadth and conversational fluidity. It has been trained on an exceptionally wide corpus and handles an enormous range of topics with reasonable competence. Its conversational memory within a session is strong, and its ability to shift register — from technical to simple, from formal to casual — on request is the best among the five tools analyzed. It is the generalist Swiss Army knife of AI study tools.

Its weakness is depth and source fidelity. ChatGPT generates confident-sounding outputs that may be subtly wrong on specialized or technical topics. It hallucinates with more frequency than Claude on nuanced intellectual territory, and less than Gemini on factual specificity. For general understanding tasks, the hallucination rate is acceptable. For tasks requiring precision — legal citations, medical dosages, mathematical derivations — the error rate is a significant liability.

### Strongest Educational Use Cases

**Conceptual explanation at multiple levels of complexity.** No tool explains the same concept better across the range from "explain like I'm 12" to "explain at graduate level." This makes it the best first-pass tool for a student encountering an unfamiliar concept and needing to calibrate entry-level understanding before going deeper.

**Brainstorming and essay outline generation.** ChatGPT excels at generating structures, frameworks, and organizational schemas for essay-type answers. A student who knows the content but doesn't know how to organize a 10-mark answer will get more useful structural output from ChatGPT than any other tool.

**Example and analogy generation.** When a student says "I understand the theory but can't think of an example," ChatGPT generates multiple concrete examples rapidly and selects the most relevant on request.

**Socratic dialogue for conceptual understanding.** With the right prompt, ChatGPT can roleplay as a Socratic questioner — asking the student probing questions rather than delivering answers. This is highly effective for Conceptual-type professor preparation.

**Practice question generation for theory subjects.** Humanities, social science, management, and law students benefit most. ChatGPT generates plausible, well-formatted exam-style questions with appropriately calibrated difficulty.

### Weaknesses

- Hallucination rate on specific facts (names, dates, case citations, formulae) is the highest of the five tools in high-precision domains.
- Inconsistent mathematical precision — GPT-4o handles routine calculus but fails on multi-step symbolic computation and complex proofs.
- Does not work from uploaded documents as a primary knowledge source — it works from its training data, supplemented loosely by any pasted context. This limits its usefulness for professor-specific or university-specific preparation.
- Outputs tend toward comprehensiveness rather than concision — a significant liability under time pressure when students need the most important 20% of information, not all 100%.

### Best Subjects
Humanities, Social Sciences, Management, Business Studies, Law (conceptual understanding layer), Economics (theory layer), History, Political Science, English Literature, Philosophy, Psychology.

### Best Learning Tasks
Concept explanation, essay structure generation, comparison tables, analogy creation, practice question generation, argument construction, Socratic understanding tests, vocabulary building.

### Best Revision Workflows
"Explain this topic back to me as if I'm revising for tomorrow" → generates a structured overview. Then "Now ask me 5 questions to test my understanding" → active recall testing. Then "Evaluate my answers and identify gaps" → gap analysis.

### Ideal Prompt Styles
```
Role + Task + Constraint format:
"You are a [subject] tutor preparing a student for a university exam
 in 24 hours. [Task]. Keep the output to [constraint — e.g., 300 words,
 bullet points, 5 items]."
```

Specificity dramatically improves output quality. Vague prompts produce vague outputs; constrained, specific prompts produce targeted, exam-relevant outputs.

### Best Use During Last-Minute Preparation
- Instant topic overviews (under 200 words)
- Quick example generation for concepts the student has memorized but can't illustrate
- Essay structure templates for any question type
- "What are the 5 most important things to know about [topic] for tomorrow's exam?" — highly effective last-minute triage

---

## Tool 2 — Claude (Claude 3.5 Sonnet / Claude 3 Opus)

### Core Capability Profile

Claude's fundamental strength is analytical precision, intellectual depth, and faithful reasoning from provided source material. Where ChatGPT generates broadly from training data, Claude reasons carefully from the context it's given — making it the superior tool for tasks where the source material matters: analyzing past papers, evaluating a student's answer, reasoning through a complex argument, or synthesizing information from uploaded notes.

Claude's other distinguishing quality is calibrated uncertainty. It says "I'm not certain about this" more reliably than other tools, and it's more likely to flag when a question requires verification from authoritative sources. For students in precision-dependent domains, this epistemic honesty is genuinely valuable.

### Strongest Educational Use Cases

**Answer evaluation and marking simulation.** "Act as a strict university examiner and mark this answer out of 10. Show the marks breakdown and identify every weakness." Claude performs this task with more analytical granularity than any other tool — it distinguishes between missing content, weak argumentation, imprecise terminology, and structural problems.

**Long-form document analysis.** When a student uploads lecture notes, a past paper, or a textbook chapter, Claude extracts, organizes, and synthesizes the information with the most contextual fidelity among the five tools. It doesn't generate from training data — it works from what's in front of it.

**Complex reasoning and multi-step argument construction.** For subjects requiring layered argumentation — law, philosophy, economics, political science — Claude builds the most logically coherent multi-step answers. It connects premises to conclusions explicitly, identifies where an argument is weak, and suggests strengthening moves.

**Derivation checking and mathematical reasoning.** Claude is stronger on formal reasoning and proof-like tasks than ChatGPT. It handles symbolic logic, formal proofs, and multi-step mathematical arguments with higher reliability.

**Professor-specific answer calibration.** Because Claude works well from provided context, a student can paste a professor's past papers and ask Claude to calibrate answer style, depth, and vocabulary to what that professor has historically rewarded.

### Weaknesses

- Real-time information access is limited — Claude's training data has a cutoff and it does not retrieve live information without tool use.
- Not optimized for rapid-fire, high-volume generation tasks — producing 50 flashcards quickly is better done by ChatGPT.
- Can be verbose when concision is needed — requires explicit constraints ("under 150 words," "bullet points only") to produce short outputs.
- Less conversationally playful than ChatGPT — students who prefer a casual, back-and-forth study partner may find Claude more formal.

### Best Subjects
Law, Philosophy, Economics (analytical layer), Political Science, Literature (critical analysis), History (causation and argument), Medicine (reasoning and clinical logic), Engineering (derivation and problem reasoning), Statistics (proof-oriented).

### Best Learning Tasks
Answer evaluation, past paper analysis, argument construction, derivation checking, professor-style calibration, gap identification in student work, complex comparison and synthesis, critical evaluation of theories.

### Best Revision Workflows
Paste your own notes → "Identify what's missing, what's imprecise, and what I must memorize." Then paste a practice answer → "Mark this as a strict examiner and show me how to improve it." Then "Generate 3 questions I haven't thought to ask about this topic."

### Ideal Prompt Styles
```
Context-rich analytical prompts:
"Here are my notes on [topic]: [paste].
Here is my practice answer: [paste].
Here is the exam question: [paste].
Act as a strict examiner. Mark my answer, identify gaps,
and generate an improved version showing what full marks looks like."
```

Claude responds best to high-context prompts. The more specific information you give it, the more specifically it helps.

### Best Use During Last-Minute Preparation
- Answer quality evaluation (paste answer → get marked → improve)
- Gap identification from pasted notes
- Professor-style calibration ("based on these past papers, what writing style scores highest?")
- Derivation verification ("check my working step by step")

---

## Tool 3 — Gemini (Google Gemini Advanced)

### Core Capability Profile

Gemini's distinguishing strength is real-time information access and multimodal processing. It can retrieve current information, process images of handwritten notes or textbook pages, and integrate Google ecosystem tools (Drive, Docs, Search). For students whose study materials include images, handwritten notes, visual diagrams, or real-world current-affairs content, Gemini has functional capabilities that other tools don't.

Its weakness is reasoning depth and output consistency. Gemini produces impressive breadth but shallower analytical quality than Claude. It hallucinations rate is moderate — similar to ChatGPT in frequency, sometimes higher in confidence. It is not the tool for high-precision domain-specific reasoning.

### Strongest Educational Use Cases

**Image-based content processing.** A student photographs a handwritten diagram, a textbook figure, or a lecture slide and asks Gemini to explain it, label it, or generate questions from it. This multimodal capability is unique and genuinely useful.

**Real-time current affairs integration.** For subjects where current events are part of the syllabus — political science, economics, environmental studies, law — Gemini can retrieve recent developments and integrate them with course theory. ChatGPT and Claude cannot do this without tools.

**Google Workspace integration.** Students using Google Docs for notes can directly integrate Gemini into their workflow. Gemini can summarize a Google Doc, generate questions from a Google Drive PDF, or convert notes into a revision guide without copy-pasting.

**Research-style broad exploration.** For topics where the student needs to understand the current landscape of a debate or field, Gemini's ability to search and synthesize real information is superior to generating from training data.

### Weaknesses

- Reasoning depth on complex analytical tasks is inferior to Claude.
- Output consistency is lower — Gemini sometimes provides differently framed answers to the same question across sessions.
- Less reliable on precise technical domains (mathematics, formal logic, legal citation).
- Privacy consideration: students should be aware of data handling when uploading proprietary course materials.

### Best Subjects
Current Affairs, Environmental Studies, Political Science (contemporary), Economics (current data), Geography, Business Studies (real-world case studies), General Science (updated information), Competitive exam preparation with current events component.

### Best Learning Tasks
Real-world example retrieval, image-based content understanding, current events integration, broad topic landscape exploration, Google Workspace-integrated revision, multimodal diagram explanation.

### Best Revision Workflows
Upload lecture PDF to Gemini → "Summarize the 10 most important points for my exam." Then "What are recent real-world examples of each point?" Then "Generate 5 questions testing current-affairs application of this theory."

### Ideal Prompt Styles
```
Search-integrated prompts:
"What are the most recent developments in [topic] as of [year]?
 Connect them to [theoretical framework from course]."

Image-based prompts:
"[Upload image of diagram] Explain every labeled component of this diagram
 and generate 3 exam-style questions about it."
```

### Best Use During Last-Minute Preparation
- Rapid topic overview with current examples
- Image-based last-minute diagram understanding
- "What are 3 recent examples I can use in my exam answer about [topic]?"
- Google Docs revision guide generation from existing notes

---

## Tool 4 — NotebookLM (Google NotebookLM)

### Core Capability Profile

NotebookLM is categorically different from the other four tools. It does not generate from training data — it works exclusively from documents the student uploads. Every answer it gives is grounded in the uploaded source material and cited by source. This makes it the highest-reliability tool for university-specific, professor-specific, and course-specific study — because it only knows what the student has told it.

This architecture eliminates hallucination on course content (the AI cannot make up information that isn't in the uploaded material) and creates study outputs that are directly relevant to the specific course being studied, not to the general subject. The trade-off is that NotebookLM has no knowledge of anything outside the uploaded documents — it cannot explain background concepts not in the uploads, generate novel examples, or create content from general training.

### Strongest Educational Use Cases

**Source-grounded revision.** After uploading lecture notes, textbook chapters, and past papers, the student asks NotebookLM questions and receives answers with specific citations to where in the uploaded material the answer comes from. This is the highest-trust revision tool for factual accuracy.

**Multi-source synthesis.** When a student has notes from 5 different lectures on related topics, NotebookLM synthesizes across all of them. "What do all my uploaded sources say about [concept]?" produces a genuinely useful cross-source synthesis.

**Audio overview generation.** NotebookLM can generate a podcast-style audio discussion of uploaded material — two AI voices discuss the content conversationally. This is excellent for auditory learners and for absorbing material during commutes or pre-sleep revision.

**Personalized quiz generation from course materials.** "Generate 10 quiz questions based only on my uploaded lecture notes" produces questions that are actually testable in the exam (because the professor's notes are the source), not generic questions about the subject.

**Professor-specific answer calibration.** When the professor's own notes, slides, or past papers are uploaded, NotebookLM extracts what the professor emphasizes, what vocabulary they use, and what topics they cover in depth — producing a uniquely professor-calibrated study resource.

### Weaknesses

- Completely dependent on upload quality — garbage in, garbage out. Poorly organized notes produce poorly organized outputs.
- Cannot go beyond uploaded materials — background concepts not in the uploads cannot be explained.
- No real-time information, no general knowledge generation.
- Requires organization investment upfront — the student must upload and organize materials before NotebookLM becomes useful.
- Audio overview quality is impressive but not controllable — the student can't direct what the AI voices emphasize.

### Best Subjects
Every subject — but only for course-specific, professor-specific study. The subject that benefits most is any where the professor's own materials diverge from the standard textbook — medicine (where clinical reasoning emphasis varies by department), law (where case selection varies by professor), engineering (where approach to derivations varies by professor).

### Best Learning Tasks
Source-grounded revision, multi-source synthesis, professor-specific quiz generation, audio-based learning, citation-backed answer generation, lecture note organization.

### Best Revision Workflows
Upload all course materials → generate audio overview (passive listening while making tea) → ask targeted questions grounded in lecture content → generate 20-question quiz from uploaded notes → identify which questions reference material you feel uncertain about → go back to source material for those specific topics.

### Ideal Prompt Styles
```
Source-specific prompts:
"Based only on my uploaded lecture notes, what are the 5 most
 emphasized concepts in Unit 4?"

"Generate 15 exam questions from my uploaded materials.
 After each question, note which lecture or source it comes from."

"What does my professor seem to think is most important about [topic]
 based on the slides and notes I've uploaded?"
```

### Best Use During Last-Minute Preparation
- Rapid quiz generation from own notes (highest relevance, zero hallucination risk)
- Audio overview for passive revision during non-study time
- "What am I missing from my notes?" cross-source gap analysis
- Professor-vocabulary extraction ("what terminology does my professor use for [concept]?")

---

## Tool 5 — Perplexity AI

### Core Capability Profile

Perplexity is a research-oriented tool that retrieves real-time web information and presents it with source citations. Unlike Gemini, which integrates search with generative capability, Perplexity's core identity is a search-synthesis engine — it finds current, cited information and presents it in a readable format. This makes it the best tool for verification, source-finding, and current-information retrieval among the five.

For exam preparation, Perplexity's value is specific and bounded: it excels when the student needs to verify a fact, find a current example, locate an authoritative source, or research a topic that requires up-to-date information. It is not the right tool for generating study content, testing understanding, or evaluating answers.

### Strongest Educational Use Cases

**Fact verification and source-finding.** When a student isn't sure whether an AI-generated fact is accurate, Perplexity is the fastest verification tool. It finds the actual source, cites it, and presents the authoritative version.

**Current example retrieval for theory subjects.** "What are recent examples of [economic concept] in India in 2024?" Perplexity retrieves actual news, reports, and data — not training-data-based generation.

**Academic source identification.** "What are the key academic papers on [topic]?" Perplexity identifies real papers with real citations — critical for subjects where citing academic sources in exam answers earns additional marks.

**Rapid topic landscape mapping.** For a subject area the student has never encountered, Perplexity can map the key debates, major figures, and current consensus faster than any other tool, with citations to verify.

**Legal and policy updates.** For law students, Perplexity can identify recent judgments, policy changes, and current legal developments that affect the subject matter.

### Weaknesses

- Not a study content generator — cannot produce practice questions, revision guides, or structured study materials.
- Does not retain context across a study session effectively.
- Source quality varies — Perplexity retrieves from the web, which includes low-quality sources alongside authoritative ones. Students must evaluate source credibility.
- Not suitable for deep explanatory or analytical tasks.

### Best Subjects
Law (current judgments and policy), Political Science (current events), Economics (current data and examples), Environmental Studies, Medical Research (current studies), Competitive exam current affairs, any subject with a real-world application component.

### Best Learning Tasks
Fact verification, source finding, current example retrieval, academic citation finding, policy and legal update tracking, topic landscape mapping.

### Best Revision Workflows
Use after ChatGPT or Claude to verify specific facts that seem uncertain. Use before NotebookLM to find authoritative sources to upload. Use after completing a topic to find 2–3 real-world examples to strengthen application answers.

### Ideal Prompt Styles
```
Verification prompts:
"Is it accurate that [fact]? Provide sources."

Current example prompts:
"What are 3 recent examples of [concept] in [country/region]
 from the last 2 years? Provide source links."

Academic source prompts:
"What are the most cited academic references on [topic]?
 Include author, publication, and year."
```

### Best Use During Last-Minute Preparation
- Verify facts from AI-generated summaries before committing to memory
- Find one current real-world example per major topic (for application-style answers)
- Check if any major developments in the last year affect the topic

---

# Part 2: The Routing Matrices

---

## Matrix 1 — Master Routing Matrix

This matrix maps the primary variables to recommended tool combinations. Primary tool is recommended first; secondary tool supplements the primary.

```
VARIABLE 1: SUBJECT TYPE

  Subject Category          Primary Tool     Secondary Tool   Do Not Use
  ─────────────────────────────────────────────────────────────────────
  Humanities / Lit          Claude           ChatGPT          Wolfram
  Social Sciences           ChatGPT          NotebookLM       —
  Law                       Claude           NotebookLM       ChatGPT*
  Medicine / MBBS           NotebookLM       Claude           ChatGPT*
  Engineering (Theory)      Claude           ChatGPT          —
  Engineering (Numericals)  ChatGPT          Wolfram Alpha    NotebookLM
  Mathematics               Claude           Wolfram Alpha    Gemini
  Physics (Theory)          Claude           ChatGPT          —
  Physics (Numericals)      ChatGPT          Wolfram Alpha    NotebookLM
  Economics (Theory)        Claude           ChatGPT          —
  Economics (Data/Current)  Perplexity       Gemini           —
  Political Science         ChatGPT          Perplexity       —
  Current Affairs           Perplexity       Gemini           NotebookLM
  Management / MBA          ChatGPT          Claude           —
  Statistics                Claude           ChatGPT          Gemini
  Chemistry (Theory)        Claude           ChatGPT          —
  Chemistry (Numericals)    ChatGPT          Wolfram Alpha    —
  Biology                   NotebookLM       Claude           —

  *ChatGPT not recommended for precision-dependent domains (law,
   medicine) where hallucinated specifics (case names, drug dosages)
   cause direct exam harm.
```

```
VARIABLE 2: TASK TYPE

  Learning Task               Primary Tool     Secondary Tool
  ─────────────────────────────────────────────────────────
  Understand a concept        ChatGPT          Claude
  Understand deeply / why     Claude           ChatGPT
  Generate practice questions ChatGPT          Claude
  Evaluate my answer          Claude           —
  Memorize definitions        NotebookLM       ChatGPT
  Memorize derivations        Claude           —
  Build comparison tables     ChatGPT          Claude
  Find current examples       Perplexity       Gemini
  Verify facts                Perplexity       —
  Analyze past papers         Claude           NotebookLM
  Build revision flashcards   NotebookLM       ChatGPT
  Generate essay structure    ChatGPT          —
  Practice numerical problems ChatGPT          Wolfram Alpha
  Understand a diagram        Gemini           ChatGPT
  Get audio revision          NotebookLM       —
  Cross-source synthesis      NotebookLM       Claude
  Find academic sources       Perplexity       —
  Professor-style calibration NotebookLM       Claude
```

```
VARIABLE 3: PROFESSOR TYPE

  Professor Type              Primary Tool     Secondary Tool
  ─────────────────────────────────────────────────────────
  Theory-Heavy                Claude           ChatGPT
  Diagram-Focused             Gemini           ChatGPT
  Derivation-Focused          Claude           Wolfram Alpha
  Strict Checking             Claude           NotebookLM
  PYQ-Repeating               NotebookLM       Claude
  Conceptual                  Claude           ChatGPT
  Numerical-Heavy             ChatGPT          Wolfram Alpha
  Presentation-Focused        ChatGPT          Claude
  Definition-Focused          NotebookLM       ChatGPT
  Application-Based           ChatGPT          Claude
```

```
VARIABLE 4: TIME REMAINING

  Time Available         Tool Stack                    Strategy
  ─────────────────────────────────────────────────────────────
  > 1 week              NotebookLM + Claude + Perplexity  Full preparation
  3–7 days              Claude + ChatGPT + NotebookLM     Strategic depth
  24–72 hours           ChatGPT + Claude                  Triage + practice
  12–24 hours           ChatGPT primary                   High-speed coverage
  < 12 hours            ChatGPT only                      Emergency mode
  < 4 hours             ChatGPT (specific prompts only)   Consolidation only
```

```
VARIABLE 5: LEARNING OBJECTIVE

  Objective                   Primary Tool     Why
  ─────────────────────────────────────────────────────────
  Build foundation            ChatGPT          Best concept explainer
  Deepen understanding        Claude           Best analytical depth
  Memorize for recall         NotebookLM       Source-grounded, precise
  Verify accuracy             Perplexity       Real citations
  Practice exam format        Claude           Best answer evaluator
  Get current examples        Perplexity       Real-time retrieval
  Build visual understanding  Gemini           Multimodal processing
  Generate revision content   ChatGPT          Volume + speed
```

---

## Matrix 2 — Topic-to-Tool Mapping

```
STEM TOPICS

  Topic                              Best Tool    Secondary    Avoid
  ──────────────────────────────────────────────────────────────────
  Calculus (concepts)                Claude       ChatGPT      Gemini
  Calculus (problem solving)         ChatGPT      Wolfram      NotebookLM
  Linear Algebra                     Claude       ChatGPT      —
  Differential Equations             Claude       Wolfram      Gemini
  Thermodynamics (theory)            Claude       ChatGPT      —
  Thermodynamics (numericals)        ChatGPT      Wolfram      —
  Electromagnetism                   Claude       ChatGPT      Gemini
  Circuit Analysis                   ChatGPT      Wolfram      —
  Organic Chemistry (mechanisms)     Claude       ChatGPT      Gemini
  Organic Chemistry (reactions)      NotebookLM   ChatGPT      —
  Biochemical Pathways               NotebookLM   Claude       ChatGPT
  Anatomy                            NotebookLM   Gemini       ChatGPT
  Physiology                         Claude       NotebookLM   —
  Pharmacology                       NotebookLM   Claude       ChatGPT
  Statistics (theory)                Claude       ChatGPT      —
  Statistics (calculations)          ChatGPT      Wolfram      —
  Machine Learning (concepts)        Claude       ChatGPT      —
  Data Structures (theory)           Claude       ChatGPT      —
  Data Structures (code)             ChatGPT      Claude       NotebookLM

HUMANITIES / SOCIAL SCIENCE TOPICS

  Topic                              Best Tool    Secondary    Avoid
  ──────────────────────────────────────────────────────────────────
  Literary Analysis                  Claude       ChatGPT      Perplexity
  Historical Causation               Claude       ChatGPT      —
  Philosophical Arguments            Claude       ChatGPT      Gemini
  Economic Theory                    Claude       ChatGPT      —
  Economic Policy (current)          Perplexity   Gemini       NotebookLM
  Contract Law                       Claude       NotebookLM   ChatGPT
  Constitutional Law                 Claude       Perplexity   ChatGPT
  Corporate Law                      NotebookLM   Claude       ChatGPT
  Political Theory                   Claude       ChatGPT      —
  International Relations (current)  Perplexity   Gemini       —
  Psychology (theories)              ChatGPT      Claude       —
  Sociology (frameworks)             ChatGPT      Claude       —
  Management Theory                  ChatGPT      Claude       —
  Marketing Strategy                 ChatGPT      Gemini       —
  Financial Accounting               NotebookLM   Claude       ChatGPT
  Environmental Policy (current)     Perplexity   Gemini       —
```

---

## Matrix 3 — Task-to-Tool Mapping (Detailed)

```
UNDERSTANDING TASKS

  Subtask                            Best Tool    Prompt Type
  ──────────────────────────────────────────────────────────
  First encounter with concept       ChatGPT      "Explain X simply,
                                                  then at exam level"
  Why is this true?                  Claude       "Explain the logic
                                                  behind X — not just
                                                  what, but why"
  How does this connect to Y?        Claude       "Show the conceptual
                                                  relationship between
                                                  X and Y"
  Analogy for abstract concept       ChatGPT      "Give me 3 analogies
                                                  for X, pick the best"
  Historical/contextual background   Perplexity   "Origin and context
                                                  of [concept]"
  Current real-world relevance       Perplexity   "Recent examples of
                                                  [concept] in [region]"

MEMORIZATION TASKS

  Subtask                            Best Tool    Prompt Type
  ──────────────────────────────────────────────────────────
  Definition precision               NotebookLM   "From my notes, exact
                                                  definition of X"
  Mnemonic generation                ChatGPT      "Create a memorable
                                                  mnemonic for [list]"
  Flashcard creation                 NotebookLM   "Generate 20 Q&A
                                                  flashcards from my
                                                  uploaded notes"
  Formula memorization               Claude       "What's the best way
                                                  to remember [formula]?
                                                  Explain the logic"
  Sequence/process memorization      ChatGPT      "Convert this process
                                                  into a memorable story
                                                  or acronym"
  Case law / citation memorization   NotebookLM   "Quiz me on case names
                                                  and holdings from my
                                                  uploaded materials"

PRACTICE AND TESTING TASKS

  Subtask                            Best Tool    Prompt Type
  ──────────────────────────────────────────────────────────
  Generate exam questions            ChatGPT      "Generate 10 [marks]
                                                  questions on [topic]
                                                  for [exam type]"
  Evaluate my answer                 Claude       "Mark this answer /10.
                                                  Break down marks.
                                                  Identify weaknesses."
  Simulate viva / oral exam          Claude       "Act as a strict viva
                                                  examiner. Ask me
                                                  questions one at a time.
                                                  Don't accept vague answers."
  Identify gaps in my knowledge      Claude       "From this answer,
                                                  identify what I don't
                                                  know that I should"
  Source-accurate quiz               NotebookLM   "Quiz me using only my
                                                  uploaded course materials"
  Numerical problem generation       ChatGPT      "Generate 5 numerical
                                                  problems on [topic] at
                                                  [difficulty]. Give solutions."

REVISION TASKS

  Subtask                            Best Tool    Prompt Type
  ──────────────────────────────────────────────────────────
  Rapid topic summary                ChatGPT      "Summarize [topic] in
                                                  200 words for an exam
                                                  tomorrow"
  Deep revision synthesis            Claude       "From these notes [paste],
                                                  identify what's essential,
                                                  what's supporting, what's
                                                  dispensable"
  Audio revision generation          NotebookLM   Use built-in audio overview
  Cross-topic connection mapping     Claude       "Map the connections between
                                                  these topics: [list]"
  Pre-exam checklist generation      ChatGPT      "What are the 10 things
                                                  I must know about [topic]
                                                  for tomorrow?"
  Final fact-check before exam       Perplexity   Verify specific facts from
                                                  revision notes
```

---

## Matrix 4 — Learning Style-to-Tool Mapping

```
LEARNING STYLE         BEST PRIMARY TOOL    BEST WORKFLOW

Visual Learner         Gemini               Upload images of diagrams.
                                            Ask Gemini to explain
                                            each labeled component.
                                            Then use ChatGPT to
                                            generate questions about
                                            the diagram.

Auditory Learner       NotebookLM           Generate audio overview
                                            from uploaded notes.
                                            Listen on commute.
                                            Then use ChatGPT for
                                            follow-up questions on
                                            what you didn't absorb.

Reading/Writing        Claude               Paste own notes → Claude
                                            identifies gaps and
                                            imprecisions → student
                                            rewrites → Claude
                                            re-evaluates.

Kinesthetic/Practice   ChatGPT              High-volume practice
                                            question generation.
                                            Solve, attempt, check.
                                            Repeat with difficulty
                                            escalation.

Conceptual/Analytical  Claude               Socratic dialogue.
                                            "Why is this true?
                                            What would change if X
                                            were different?"

Recall/Memorization    NotebookLM           Source-grounded flashcard
                                            generation. Quiz mode
                                            from professor's own
                                            materials.

Research-Oriented      Perplexity           Topic landscape mapping.
                                            Source verification.
                                            Academic citation finding.

Social/Discussion      ChatGPT              Roleplay as debate
                                            partner: argue both
                                            sides of a topic.
                                            "Steelman the opposing
                                            view."
```

---

# Part 3: Emergency Exam Workflows

---

## Emergency Workflow 1 — T–24 Hours, Single Subject

```
PHASE 1: TRIAGE (0:00–0:30)
Tool: ChatGPT
Prompt: "I have 24 hours to prepare for [subject] exam.
         My syllabus covers: [paste].
         Generate a priority list: what to study first, what to skim,
         what to skip. Base this on what typically appears in
         university exams for this subject."

Output: Ranked topic list with time allocations.

─────────────────────────────────────────────────────────────

PHASE 2: HIGH-PRIORITY TOPIC COVERAGE (0:30–6:00)
Tool: ChatGPT (primary) + Claude (for difficult concepts)
Strategy: Work through priority list. For each high-priority topic:
  - ChatGPT: "Explain [topic] for a university exam. 
               Give me: key concepts, a likely exam question,
               and a model answer structure."
  - If concept is complex: Claude: "Why does [concept] work this way?
               Explain the underlying logic."
Time per topic: 30–45 min for critical topics, 15 min for moderate.

─────────────────────────────────────────────────────────────

PHASE 3: PRACTICE AND GAP IDENTIFICATION (6:00–10:00)
Tool: Claude
Strategy: Write practice answers for top 3–5 likely questions.
  Prompt: "I've written this answer to this question. Mark it,
           identify what's missing, and show me what a full-marks
           answer includes."
Output: Identified gaps → return to ChatGPT to fill specific gaps.

─────────────────────────────────────────────────────────────

PHASE 4: MEMORIZATION CONSOLIDATION (10:00–14:00)
Tool: ChatGPT + (NotebookLM if notes uploaded)
Strategy: Convert covered material into rapid-recall format.
  Prompt: "Convert my understanding of [topic] into:
           5 key points I must remember, 3 likely questions
           with one-paragraph model answers, and 1 memorable
           mnemonic for the hardest concept."

─────────────────────────────────────────────────────────────

PHASE 5: FINAL VERIFICATION (14:00–16:00)
Tool: Perplexity (for fact-checking) + Claude (for answer evaluation)
Strategy: Verify any facts you're uncertain about.
          Write one full practice answer under timed conditions.
          Have Claude evaluate it.

─────────────────────────────────────────────────────────────

PHASE 6: SLEEP / REST (Mandatory)
Do not study past 2 AM for a 9 AM exam.
The final 2 hours before sleeping: NotebookLM audio overview
on low-demand topics (listen while winding down, not active study).
```

---

## Emergency Workflow 2 — T–12 Hours, Single Subject

```
PHASE 1: ULTRA-TRIAGE (0:00–0:15)
Tool: ChatGPT
Prompt: "I have 12 hours for [subject]. My exam is at [time].
         Give me the 5 most important topics only.
         For each: what to know, likely question, 2-minute answer.
         Be ruthlessly specific. I cannot cover everything."

─────────────────────────────────────────────────────────────

PHASE 2: HIGH-SPEED COVERAGE (0:15–5:00)
Tool: ChatGPT exclusively (speed over depth)
20 minutes per topic maximum.
Prompt per topic: "In 200 words, give me what I need to know about
                  [topic] for a university exam tomorrow.
                  Then give me the most likely question and a
                  model answer."

─────────────────────────────────────────────────────────────

PHASE 3: ACTIVE RECALL TESTING (5:00–8:00)
Tool: ChatGPT
Prompt: "Quiz me on [topics covered]. Ask one question at a time.
         Wait for my answer before giving feedback."
This phase is non-negotiable — reading without testing will not
produce exam-ready recall.

─────────────────────────────────────────────────────────────

PHASE 4: WEAK AREA REPAIR (8:00–10:00)
Tool: Claude (for depth on specific gaps)
Identify 2–3 specific concepts you failed in Phase 3.
Prompt: "Explain [concept] from first principles.
         I have 45 minutes. What's the fastest way to
         genuinely understand and remember this?"

─────────────────────────────────────────────────────────────

PHASE 5: CONSOLIDATION (10:00–12:00)
Tool: ChatGPT
Prompt: "I'm going into my exam in 2 hours.
         Give me a one-page summary of the 5 most important
         things to remember about [subject]. Format as
         bullet points I can review quickly."
Then stop studying. Rest. Eat. Hydrate.
```

---

## Emergency Workflow 3 — T–4 Hours, Panic Mode

```
⚠️ CONSOLIDATION ONLY — NO NEW LEARNING

At T–4 hours, the brain cannot reliably encode new material
for exam-condition retrieval. Every minute spent on new content
is a minute not spent consolidating what's already partially known.

─────────────────────────────────────────────────────────────

STEP 1 (0:00–0:30): INVENTORY WHAT YOU KNOW
Tool: ChatGPT
Prompt: "I have 4 hours before my [subject] exam.
         I need to consolidate, not learn new material.
         Ask me 10 rapid questions on [topic].
         After all 10, tell me which ones I answered poorly —
         those are my consolidation targets."

─────────────────────────────────────────────────────────────

STEP 2 (0:30–2:00): CONSOLIDATE WEAK AREAS ONLY
Tool: ChatGPT
Only for the topics identified as weak in Step 1.
Prompt: "I answered poorly on [topic]. In 5 minutes,
         what are the 3 things I absolutely must remember
         about this for the exam? Give me a memory hook."

─────────────────────────────────────────────────────────────

STEP 3 (2:00–3:00): FINAL ACTIVE RECALL
Tool: ChatGPT
Prompt: "Give me 5 rapid-fire questions on [entire subject].
         One question at a time. Mark each answer immediately."

─────────────────────────────────────────────────────────────

STEP 4 (3:00–4:00): STOP STUDYING
Do not open any tool. Do not read notes.
Physical preparation: eat, change clothes, travel, breathe.
The last hour of AI-assisted study is almost never the hour
that changes the result. Calm does.
```

---

## Emergency Workflow 4 — T–48 Hours, Multiple Subjects

```
HOUR 0–2: MASTER TRIAGE
Tool: ChatGPT
Prompt: "I have 48 hours and [N] exams across these subjects: [list].
         Exams are on: [schedule].
         Rank my subjects by: how much preparation each needs vs
         how much time I have before each.
         Give me a 48-hour study schedule with specific time blocks."

─────────────────────────────────────────────────────────────

THEN: RUN SINGLE-SUBJECT WORKFLOWS IN SEQUENCE
Apply the T–24h workflow to each subject within its allocated window.
Do not context-switch between subjects within a session.
Each subject gets a clean start and a clean end.

─────────────────────────────────────────────────────────────

BUFFER RULE: Keep 2 hours before each exam as consolidation-only.
Do not use those 2 hours for the next exam's preparation.
```

---

# Part 4: Multi-Tool Workflows

---

## Multi-Tool Workflow 1 — Deep Conceptual Mastery

For students with 3–7 days. Best for Conceptual and Theory-Heavy professor types.

```
DAY 1: LANDSCAPE (Perplexity + ChatGPT)
  Perplexity → Map the topic: major debates, key figures, current context
  ChatGPT → Conceptual overview: explain the topic from first principles

DAY 2: DEPTH (Claude)
  Claude → "Here is my current understanding. Identify what's shallow,
             what's missing, what I understand incorrectly."
  Claude → Socratic dialogue on the 3 most important concepts

DAY 3: SOURCE-GROUNDING (NotebookLM)
  Upload lecture notes and past papers
  NotebookLM → "What does my professor emphasize about this topic?"
  NotebookLM → Generate professor-specific quiz

DAY 4: PRACTICE (Claude + ChatGPT)
  ChatGPT → Generate 10 exam-style questions
  Claude → Evaluate answers, identify gaps, provide model answers

DAY 5: CONSOLIDATION (NotebookLM + ChatGPT)
  NotebookLM → Audio overview for passive review
  ChatGPT → Final rapid-recall summary
  Perplexity → Fact-check any uncertain specifics
```

---

## Multi-Tool Workflow 2 — Numerical/Technical Mastery

For engineering, mathematics, physics students.

```
PHASE 1: CONCEPT FOUNDATION (Claude)
  "Explain the theory behind [topic] — not just what the formula is,
   but why it works and when to use it vs alternatives."

PHASE 2: PROBLEM-TYPE CLASSIFICATION (ChatGPT)
  "List every problem type in [topic]. For each: identifying features,
   required formula, a worked example."

PHASE 3: VOLUME PRACTICE (ChatGPT)
  "Generate 10 problems of [type], escalating in difficulty.
   Provide full worked solutions."
  Student attempts, then compares.

PHASE 4: ERROR ANALYSIS (Claude)
  "I attempted this problem: [paste attempt].
   Identify every error. Explain why each step was wrong.
   Show the correct approach."

PHASE 5: VERIFICATION (Wolfram Alpha)
  Check final answers computationally.

PHASE 6: SPEED PRACTICE (ChatGPT)
  Timed problem sets. Student self-reports time per problem.
  "Generate 5 problems. I'll solve them in 15 minutes.
   Then evaluate my working."
```

---

## Multi-Tool Workflow 3 — Law/Medicine High-Stakes Preparation

For precision-dependent, high-stakes subjects.

```
PHASE 1: COURSE MATERIAL UPLOAD (NotebookLM)
  Upload: lecture notes, professor slides, past papers,
          prescribed textbook chapters, any marking schemes.
  All further study is grounded in these materials.

PHASE 2: PROFESSOR-SPECIFIC PROFILE (NotebookLM + Claude)
  NotebookLM: "Based on my uploaded past papers, what does this
               professor test most, at what depth, in what format?"
  Claude: "Based on this pattern analysis [paste NotebookLM output],
           what is the optimal answer structure for this exam?"

PHASE 3: DEFINITION AND CITATION DRILLING (NotebookLM)
  "Quiz me on every key definition in my uploaded materials.
   Accept only answers that match the uploaded source."

PHASE 4: APPLICATION PRACTICE (Claude)
  "Generate 5 novel case scenarios for [topic].
   For each: the ideal analysis framework, the key legal principles
   to apply, and the common errors in application."

PHASE 5: ANSWER EVALUATION (Claude)
  Full practice answer → Claude marks against stated criteria.
  Repeat until answer consistently hits >80% mark threshold.

PHASE 6: CURRENT UPDATES (Perplexity)
  "Have there been any significant [legal judgments / medical
   guideline updates] related to [topic] in the past 18 months?"
```

---

# Part 5: Intelligent Recommendation Logic

---

## The Recommendation Decision Tree

```
INPUT: Student inputs subject, topic, time available, task, professor type

STEP 1: CHECK TIME CONSTRAINT
│
├── < 4 hours → Emergency consolidation protocol
│   Return: ChatGPT only, specific emergency prompts, stop signal at T–1h
│
├── 4–12 hours → Emergency coverage protocol
│   Continue to Step 2 with "speed" weighting
│
└── > 12 hours → Full routing protocol
    Continue to Step 2 with "quality" weighting

STEP 2: IDENTIFY PRIMARY TASK
│
├── Understanding    → ChatGPT primary, check depth requirement
├── Memorization     → NotebookLM if notes uploaded; else ChatGPT
├── Practice/Testing → Claude primary
├── Verification     → Perplexity primary
├── Visual/Image     → Gemini primary
└── Synthesis/Eval   → Claude primary

STEP 3: APPLY SUBJECT MODIFIER
│
├── Law / Medicine → Override: flag ChatGPT hallucination risk
│                    Recommend NotebookLM or Claude primary
├── Current Affairs → Add Perplexity to stack
├── Numerical       → Add Wolfram Alpha to stack
└── General         → No modifier

STEP 4: APPLY PROFESSOR TYPE MODIFIER
│
├── PYQ-Repeating   → Prioritize NotebookLM if past papers uploaded
├── Derivation      → Prioritize Claude for step-checking
├── Strict Checking → Add Claude answer evaluation step
├── Application     → Add ChatGPT scenario generation step
└── Others          → No modifier

STEP 5: GENERATE RECOMMENDATION PACKAGE
│
├── Primary tool with rationale
├── Secondary tool with rationale
├── 3 ready-to-paste prompts (calibrated to task + subject + professor)
├── Estimated time allocation per tool
└── Warning flags (precision domains, time constraints)
```

---

## Recommendation Confidence Scoring

```
CONFIDENCE FACTORS:

  Professor type identified from past paper upload   +30 points
  Professor type confirmed by survey                 +20 points
  Professor type from peer reports only              +10 points
  Professor type not identified                       +0 points

  5+ years of past papers analyzed                   +25 points
  3–4 years of past papers                           +15 points
  1–2 years of past papers                           +10 points
  No past papers                                      +0 points

  Notes uploaded to system                           +15 points
  Time constraint clearly specified                  +10 points

CONFIDENCE BANDS:
  80–100 → "High confidence recommendation"
  60–79  → "Good recommendation — confirm professor type for better routing"
  40–59  → "Moderate confidence — upload past papers to improve accuracy"
  < 40   → "General recommendation — not yet professor-calibrated"
```

---

# Part 6: Output Format Design

---

## The Recommendation Card (Student-Facing UI)

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR AI TOOLKIT                             ★★★★☆ Confident │
│─────────────────────────────────────────────────────────────│
│  Subject: Corporate Law · Task: Practice + Evaluation       │
│  Time: 18 hours · Professor: Application-Based              │
│─────────────────────────────────────────────────────────────│
│                                                             │
│  START WITH           THEN USE               VERIFY WITH    │
│  ┌───────────┐        ┌───────────┐          ┌───────────┐  │
│  │  Claude   │   →    │ ChatGPT   │    →     │Perplexity │  │
│  │           │        │           │          │           │  │
│  │ Answer    │        │ Scenario  │          │ Fact-     │  │
│  │ evaluation│        │ generation│          │ checking  │  │
│  └───────────┘        └───────────┘          └───────────┘  │
│                                                             │
│  WHY THIS ROUTING                                           │
│  ─────────────────────────────────────────────────────────  │
│  Your professor tests application — scenarios and case      │
│  analysis. You need to practice writing under exam          │
│  conditions AND get honest feedback on answer quality.      │
│  Claude evaluates answers with marking-rubric precision.    │
│  ChatGPT generates varied scenarios for practice.           │
│  Perplexity finds real Indian corporate law cases           │
│  to strengthen application answers.                         │
│                                                             │
│  ⚠️  Avoid using ChatGPT as your primary tool for           │
│  legal content — it can hallucinate case names.             │
│                                                             │
│  READY-TO-PASTE PROMPTS                                     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [Prompt 1 — Claude] Answer Evaluation                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "I'm preparing for a Corporate Law exam tomorrow.   │   │
│  │  My professor tests application-style scenarios.    │   │
│  │  Here is my practice answer: [PASTE YOUR ANSWER]   │   │
│  │  Here is the exam question: [PASTE QUESTION]        │   │
│  │  Mark my answer out of [MARKS]. Show marks per      │   │
│  │  component. Identify: missing legal principles,     │   │
│  │  weak application, missing conclusion/opinion.      │   │
│  │  Then show me what a full-marks answer looks like." │   │
│  └─────────────────────────────────────────────────────┘   │
│  [ Copy prompt ]                                            │
│                                                             │
│  [Prompt 2 — ChatGPT] Scenario Generation                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "Generate 3 corporate law exam scenarios testing     │   │
│  │  [TOPIC]. Each scenario should: involve Indian       │   │
│  │  business context, require applying [FRAMEWORK],    │   │
│  │  and be answerable in 400 words. After each          │   │
│  │  scenario, list the legal principles it tests."     │   │
│  └─────────────────────────────────────────────────────┘   │
│  [ Copy prompt ]                                            │
│                                                             │
│  [Prompt 3 — Perplexity] Real Case Examples                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "What are 2–3 recent Indian Supreme Court or High   │   │
│  │  Court cases from the last 5 years involving        │   │
│  │  [TOPIC]? For each case: the parties, the issue,    │   │
│  │  the holding, and why it matters for corporate law. │   │
│  │  Provide source links."                             │   │
│  └─────────────────────────────────────────────────────┘   │
│  [ Copy prompt ]                                            │
│                                                             │
│  TIME ALLOCATION FOR THIS SESSION                           │
│  ─────────────────────────────────────────────────────────  │
│  Claude — answer evaluation      ████████░░░░  40%  7.2h   │
│  ChatGPT — scenario practice     ██████░░░░░░  35%  6.3h   │
│  Perplexity — example research   ███░░░░░░░░░  15%  2.7h   │
│  Free / buffer                   ██░░░░░░░░░░  10%  1.8h   │
│                                                             │
│  [  Start session  ]     [  Customize routing  ]           │
└─────────────────────────────────────────────────────────────┘
```

---

## How the App Should Explain Recommendations

### Design Principles for Recommendation Language

**1. Lead with the "why that matters to you" — not the feature.**
Don't say: "Claude is recommended because it has superior analytical depth."
Say: "Your professor marks answers strictly — Claude will catch the same gaps your professor will."

The recommendation language must connect tool capabilities to the specific exam outcome the student cares about. Tool features are invisible; exam outcomes are everything.

**2. Explain what the student avoids by following the recommendation.**
"Using ChatGPT for legal content risks hallucinated case names — your professor will spot a fake citation. Claude and NotebookLM only give you what can be verified."

Avoidance framing (what goes wrong without the recommendation) is more motivating than gain framing (what goes right with it) under exam anxiety conditions.

**3. Quantify the time cost of the wrong tool.**
"Students who use ChatGPT for answer evaluation instead of Claude typically need 2–3 additional revision rounds to catch the same gaps. That's 2–3 hours you don't have."

Time is the scarcest resource. Routing recommendations that quantify the time cost of suboptimal tool use will be taken seriously.

**4. Keep routing explanations under 50 words.**
Students under exam pressure won't read a paragraph about why a tool is recommended. They'll read two sentences. Write the explanation for someone reading on a phone at 11 PM.

**5. Provide override controls without judgment.**
Always include: "Change this routing" with zero friction. Students who override the recommendation and get a worse outcome learn to trust the system. Students who feel forced into a recommendation resent it.

**6. Use "your professor" language — not generic language.**
"Claude is good for answer evaluation" → generic, forgettable.
"Claude will evaluate your answer the way Professor Sharma marks — checking for missing legal opinion, imprecise terminology, and weak scenario analysis" → specific, memorable, trusted.

---

### Explanation Templates by Recommendation Type

```
TEMPLATE 1: SINGLE TOOL RECOMMENDATION (simple task)

"Use [TOOL] for this.
 [One sentence: what it does well for this specific task].
 [One sentence: what goes wrong without it].
 [Ready-to-paste prompt below]."

EXAMPLE:
"Use NotebookLM for definition drilling.
 It quizzes you from your professor's own lecture notes —
 so you memorize exactly the terminology your examiner uses.
 ChatGPT definitions may use different wording than your
 marking scheme expects.
 [Prompt below]"

─────────────────────────────────────────────────────────────

TEMPLATE 2: MULTI-TOOL RECOMMENDATION (complex task)

"Start with [TOOL 1] → then use [TOOL 2] → verify with [TOOL 3].

 [TOOL 1] handles [specific function] for [specific reason].
 [TOOL 2] handles [specific function] for [specific reason].
 [TOOL 3] handles [specific function] for [specific reason].

 Time: [X minutes] on each. Prompts below."

─────────────────────────────────────────────────────────────

TEMPLATE 3: EMERGENCY ROUTING (time-critical)

"You have [X] hours. Here's exactly what to do:

 [Time block 1] — [Tool]: [What to do]. [Why this first].
 [Time block 2] — [Tool]: [What to do]. [Why this next].
 [Time block 3] — Stop studying. [Specific reason].

 Don't switch tools. Don't try to cover everything.
 This plan covers what matters."

─────────────────────────────────────────────────────────────

TEMPLATE 4: PRECISION DOMAIN WARNING

"⚠️ [SUBJECT] precision warning:
 [ChatGPT / Gemini] can generate incorrect [case names /
 drug dosages / legal citations / formulae] with high
 confidence. Your professor will catch this.

 For [specific task], use [recommended tool] instead.
 It only tells you what can be verified from your
 uploaded course materials."
```

---

## System Architecture Summary

```
ARIS — AI ROUTING INTELLIGENCE SYSTEM
Complete Data Flow

  STUDENT INPUTS                SYSTEM PROCESSING
  ─────────────────           ──────────────────────────────
  Subject               →     Subject classifier
  Topic                 →     Topic-to-tool matrix lookup
  Time available        →     Time constraint engine
  Task type             →     Task-to-tool matrix lookup
  Professor type        →     Professor-type modifier
  Learning style        →     Style-to-tool modifier
  Past papers (upload)  →     Confidence scorer
  Survey responses      →     Classification confirmation

                ↓
         ROUTING DECISION ENGINE
         (Decision tree + matrix intersection)
                ↓

  OUTPUTS
  ─────────────────────────────────────────────────────────
  Primary tool recommendation + rationale (50 words max)
  Secondary tool + when to switch
  Warning flags (precision domains, time traps)
  3 ready-to-paste prompts (calibrated to all inputs)
  Time allocation per tool
  Confidence score with explanation
  Multi-tool workflow sequence if applicable
  Emergency workflow if time < 12 hours
```

---

*AI Routing Intelligence System — Product Design Document*
*Exam-Clutch Internal — Version 1.0*
