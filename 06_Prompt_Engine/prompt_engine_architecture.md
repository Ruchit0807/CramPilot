# Prompt Generation Architecture
### Exam-Clutch — Complete Design Document

---

## Overview

The Prompt Generation Architecture (PGA) is the content delivery engine of Exam-Clutch. Every workflow decision, every tool recommendation, and every professor intelligence insight must ultimately become a specific, ready-to-paste string of text that a student can copy into an AI tool and get immediate, high-quality output.

This document specifies the complete system for generating those prompts — from the template grammar through the variable injection logic, quality optimization, and output formatting.

The design principle is this: **a student should never have to write a prompt.** They should only have to choose what they want to learn, and the system handles the rest. The quality of the generated prompt directly determines the quality of the AI output, which directly determines the quality of the student's preparation. Prompt quality is product quality.

---

# Part 1: The Variable System

---

## Core Variable Taxonomy

Every prompt in the system is built from combinations of these variables. Variables are grouped into five families.

---

### Variable Family 1: Student Context

```
{STUDENT_NAME}
  Type: String
  Source: User profile
  Example: "Rahul"
  Usage: Personalizes tone. Not all prompts include this — only
         those where personalization increases engagement.

{TARGET_MARKS}
  Type: Enum
  Values: PASS_ONLY | AVERAGE | GOOD | TOPPER
  Maps to: PASS_ONLY = 40–55% | AVERAGE = 55–70%
           GOOD = 70–85% | TOPPER = 85–100%
  Usage: Controls depth, coverage breadth, answer quality bar.

{PREP_LEVEL}
  Type: Enum
  Values: ZERO | PARTIAL | MODERATE | STRONG
  Maps to: ZERO = haven't started | PARTIAL = some coverage
           MODERATE = most topics touched | STRONG = well-prepared
  Usage: Controls how much context-setting the prompt includes,
         how much the AI should explain vs test.

{LEARNING_STYLE}
  Type: Enum
  Values: VISUAL | AUDITORY | READING_WRITING | KINESTHETIC
  Usage: Adjusts output format (diagrams, narratives, lists,
         problems respectively).

{STUDY_SESSION_NUMBER}
  Type: Integer
  Source: Session tracker
  Usage: Prompts for Session 1 explain context; prompts for
         Session 5 assume prior context and skip setup.
```

---

### Variable Family 2: Academic Context

```
{SUBJECT}
  Type: String
  Example: "Corporate Law", "Thermodynamics", "Macroeconomics"
  Usage: Sets domain. Every prompt includes this.

{TOPIC}
  Type: String
  Example: "Offer and Acceptance", "First Law of Thermodynamics"
  Usage: Sets focus. Most prompts include this.

{SUBTOPIC}
  Type: String (optional)
  Example: "Counter-offer in contract law", "Isothermal processes"
  Usage: Narrows focus for precision prompts.

{UNIVERSITY_LEVEL}
  Type: Enum
  Values: UNDERGRADUATE_FIRST | UNDERGRADUATE_FINAL |
          POSTGRADUATE | PROFESSIONAL
  Usage: Sets language complexity, depth expectation, answer length.

{EXAM_TYPE}
  Type: Enum
  Values: SEMESTER_EXAM | ANNUAL_EXAM | VIVA | PRACTICAL |
          COMPETITIVE | PROFESSIONAL_CERTIFICATION
  Usage: Adjusts output format to match exam format.

{MARKS_FOR_QUESTION}
  Type: Integer
  Example: 5, 10, 15, 20
  Usage: Controls answer length. System maps marks to word count
         and structural depth. Standard mapping:
         2 marks = 50-80 words | 5 marks = 150-200 words
         10 marks = 400-500 words | 15+ marks = 600-800 words

{SUBJECT_DIFFICULTY}
  Type: Enum
  Values: ACCESSIBLE | MODERATE | DIFFICULT | VERY_DIFFICULT
  Usage: Adjusts explanation depth; harder subjects get more
         foundational context in explanations.
```

---

### Variable Family 3: Time and Urgency

```
{HOURS_REMAINING}
  Type: Integer
  Example: 6, 18, 36, 72
  Usage: Highest-priority variable. Controls everything from
         depth of explanation to which phases are included.

{URGENCY_MODE}
  Type: Enum (derived from HOURS_REMAINING)
  Values: NORMAL | ACCELERATED | EMERGENCY | CRISIS
  Maps to: NORMAL = >72h | ACCELERATED = 24-72h
           EMERGENCY = 12-24h | CRISIS = <12h
  Usage: Unlocks pre-built urgency modifiers applied to all prompts.

{TIME_PER_TOPIC}
  Type: Integer (minutes)
  Source: Workflow engine allocation
  Usage: Sets expected output length and depth.
         30 min topic → concise prompt
         90 min topic → thorough prompt

{REVISION_PASS}
  Type: Enum
  Values: FIRST_PASS | SECOND_PASS | FINAL_REVIEW
  Usage: First pass = explanation focus, Second pass = testing focus,
         Final review = consolidation focus.
```

---

### Variable Family 4: Professor Intelligence

```
{PROFESSOR_TYPE}
  Type: Enum (multi-select, weighted)
  Values: THEORY_HEAVY | DIAGRAM_FOCUSED | DERIVATION_FOCUSED |
          STRICT_CHECKING | PYQ_REPEATING | CONCEPTUAL |
          NUMERICAL_HEAVY | PRESENTATION_FOCUSED |
          DEFINITION_FOCUSED | APPLICATION_BASED
  Usage: Most impactful modifier. Changes answer structure,
         depth expectations, vocabulary requirements.

{PROFESSOR_VOCABULARY}
  Type: String Array (from NotebookLM extraction or manual input)
  Example: ["ratio decidendi", "per incuriam", "obiter dicta"]
  Usage: Injected into prompts requiring terminology precision.

{ANSWER_FORMAT_EXPECTED}
  Type: Enum
  Values: ESSAY | STRUCTURED_SHORT | NUMERICAL_WORKING |
          CASE_ANALYSIS | DEFINITION_EXAMPLE | DIAGRAM_EXPLANATION
  Source: Derived from professor type + past paper analysis
  Usage: Sets output format instructions in prompt.

{MARKS_TRAP_LIST}
  Type: String Array
  Example: ["Missing legal opinion loses 1-2 marks",
            "Unlabeled diagram axes = 0 for diagram component"]
  Usage: Appended to evaluation and practice prompts as
         specific deduction warnings.

{TOPIC_PROBABILITY}
  Type: Enum
  Values: CRITICAL | MODERATE | LOW | SKIP
  Source: Past paper frequency analysis
  Usage: Adjusts depth instruction — CRITICAL gets "comprehensive
         coverage", LOW gets "key points only".
```

---

### Variable Family 5: Task and Tool

```
{TASK_TYPE}
  Type: Enum
  Values: CONCEPT_LEARNING | DERIVATION | PYQ_SOLVING |
          FLASHCARD_GENERATION | REVISION_NOTES |
          LAST_MINUTE_SUMMARY | VIVA_PREPARATION |
          AUDIO_REVISION | FORMULA_MEMORIZATION |
          DIAGRAM_PRACTICE | LONG_ANSWER_WRITING |
          DEFINITION_MEMORIZATION | NUMERICAL_SOLVING |
          CONCEPTUAL_MASTERY
  Usage: Primary selector for prompt template category.

{TARGET_TOOL}
  Type: Enum
  Values: CHATGPT | CLAUDE | GEMINI | NOTEBOOKLM | PERPLEXITY
  Usage: Applies tool-specific optimizations to prompt structure.
         NotebookLM prompts never include general context
         (it only works from uploads). Perplexity prompts include
         source request. Claude prompts include evaluation rubric.

{DESIRED_OUTPUT_FORMAT}
  Type: Enum
  Values: BULLET_POINTS | NUMBERED_LIST | PROSE_PARAGRAPHS |
          TABLE | FLASHCARD_PAIRS | DIALOGUE | TIMED_QUIZ |
          MODEL_ANSWER | STEP_BY_STEP | DIAGRAM_DESCRIPTION
  Usage: Explicitly specified in every prompt. Students should
         never need to specify format themselves.

{PRIOR_TOOL_OUTPUT}
  Type: String (optional)
  Source: Student pastes previous AI output
  Usage: Enables chained prompts — second prompt builds on
         first tool's output.

{KNOWLEDGE_GAP}
  Type: String (optional)
  Source: Active recall failure detection
  Usage: Injected when prompt is a gap-repair session.
         "I answered incorrectly when asked about [GAP]."
```

---

# Part 2: Prompt Templates

---

## Template Grammar

All templates follow this structure:

```
[ROLE_DECLARATION]
[CONTEXT_BLOCK]
[TASK_INSTRUCTION]
[TOPIC_SPECIFICATION]
[CONSTRAINT_BLOCK]
[OUTPUT_FORMAT_SPECIFICATION]
[QUALITY_GATE]
```

Not every block appears in every template. Short templates (flashcards, quick definitions) may use only 4 blocks. Long analytical templates use all 7.

---

## Category 1: Concept Learning

### Template 1.1 — First Encounter (ChatGPT Primary)

```
TEMPLATE ID: CL-001
TOOL: ChatGPT
URGENCY: NORMAL, ACCELERATED
TARGET_MARKS: ALL
PROFESSOR_TYPE: ALL

---

[ROLE_DECLARATION]
You are a university tutor preparing a student for a {UNIVERSITY_LEVEL}
exam in {SUBJECT}.

[CONTEXT_BLOCK]
The student is encountering {TOPIC} for the first time.
Time available for this topic: {TIME_PER_TOPIC} minutes.
Target performance level: {TARGET_MARKS}.
Professor style: {PROFESSOR_TYPE}.

[TASK_INSTRUCTION]
Explain {TOPIC} in a way that achieves exam-functional understanding —
not general interest, not graduate depth. Calibrate to what this
professor tests and what this student needs to write an exam answer.

[TOPIC_SPECIFICATION]
Topic: {TOPIC}
Subtopic (if applicable): {SUBTOPIC}
Exam marks typically available: {MARKS_FOR_QUESTION}

[CONSTRAINT_BLOCK]
{CONSTRAINT_BY_URGENCY}
  [NORMAL]:     Be thorough. Include conceptual depth.
  [ACCELERATED]: Be focused. Key concepts only, no tangents.
  [EMERGENCY]:  Be ruthlessly concise. One paragraph max per concept.
  [CRISIS]:     Three bullet points. Nothing else.

{CONSTRAINT_BY_TARGET_MARKS}
  [PASS_ONLY]:  Explain only what a passing answer needs.
  [AVERAGE]:    Standard depth — core concept + one example.
  [GOOD]:       Include nuances and exceptions.
  [TOPPER]:     Include edge cases, scholarly debates, critique.

[OUTPUT_FORMAT_SPECIFICATION]
Format your response as:
1. CORE CONCEPT (2–3 sentences, plain language)
2. WHY IT WORKS (the underlying logic — not just what, but why)
3. EXAM EXAMPLE (one worked example or application)
4. KEY TERMS (3–5 terms I must use in an exam answer)
5. LIKELY EXAM QUESTION (the most probable question format for
   a {PROFESSOR_TYPE} professor, {MARKS_FOR_QUESTION} marks)
6. ANSWER SKELETON (the 3–4 points my answer must hit)

[QUALITY_GATE]
After providing the above: tell me one thing most students
misunderstand about this topic and how to avoid that error.
```

---

### Template 1.2 — Deep Conceptual Understanding (Claude Primary)

```
TEMPLATE ID: CL-002
TOOL: Claude
URGENCY: NORMAL, ACCELERATED
TARGET_MARKS: GOOD, TOPPER
PROFESSOR_TYPE: THEORY_HEAVY, CONCEPTUAL

---

You are supporting a student preparing for {SUBJECT} at {UNIVERSITY_LEVEL}.
They understand {TOPIC} at a surface level but need depth.

The student currently understands: {PRIOR_UNDERSTANDING}
[If PRIOR_UNDERSTANDING is empty: assume they know the basic definition]

Their professor is {PROFESSOR_TYPE} and will test {ANSWER_FORMAT_EXPECTED}.

Provide:

1. THE UNDERLYING LOGIC
   Explain why {TOPIC} is true — the mechanism, not just the fact.
   If someone removed {TOPIC} from the discipline, what would break?

2. THE SCHOLARLY DEBATE (if applicable)
   What do different theorists or schools disagree about here?
   Which position does a {PROFESSOR_TYPE} professor most value?

3. THE STRONGEST CRITIQUE
   What is the best argument against {TOPIC} or its central claim?
   How would a sophisticated student acknowledge this in an answer?

4. CROSS-TOPIC CONNECTION
   How does {TOPIC} connect to {RELATED_TOPIC}?
   What question could ask about both simultaneously?

5. THE TOPPER MOVE
   What would the top 5% of students write about {TOPIC} that
   average students wouldn't?

Keep language at university academic level.
Do not use casual analogies — this professor rewards scholarly register.
```

---

### Template 1.3 — Crisis Concept Load (ChatGPT — Emergency Only)

```
TEMPLATE ID: CL-003
TOOL: ChatGPT
URGENCY: EMERGENCY, CRISIS
TARGET_MARKS: ALL

---

I have {HOURS_REMAINING} hours before my {SUBJECT} exam.
I need to understand {TOPIC} in {TIME_PER_TOPIC} minutes.

Give me ONLY:
• What it is (1 sentence)
• Why it matters in {SUBJECT} (1 sentence)
• The most likely exam question (1 sentence)
• The 3 points my answer must include
• 1 example I can use

Nothing else. No background. No tangents. Just what I need
to write a {MARKS_FOR_QUESTION}-mark answer tomorrow.
```

---

## Category 2: Derivation Understanding

### Template 2.1 — Full Derivation Breakdown (Claude Primary)

```
TEMPLATE ID: DU-001
TOOL: Claude
URGENCY: NORMAL, ACCELERATED
SUBJECT_TYPE: STEM, MATHEMATICS, PHYSICS, ENGINEERING

---

[ROLE_DECLARATION]
You are an expert in {SUBJECT} supporting a student who needs to be
able to derive {DERIVATION_NAME} from scratch in an exam.

[CONTEXT_BLOCK]
Exam context: {UNIVERSITY_LEVEL} {EXAM_TYPE}
Professor type: {PROFESSOR_TYPE} — specifically {DERIVATION_FOCUSED}
Time available: {TIME_PER_TOPIC} minutes
The student needs to write this derivation in {MARKS_FOR_QUESTION}
marks, typically requiring {EXPECTED_STEPS} steps shown.

[TASK_INSTRUCTION]
Derive {DERIVATION_NAME} starting from {STARTING_POINT}.

[OUTPUT_FORMAT_SPECIFICATION]
Format as:

STEP 0: STARTING ASSUMPTION
State clearly: what we begin with and why this is the valid
starting point.

STEP N: [STEP NAME]
  Mathematical expression
  Justification: why this step follows from the previous
  Common error: what students incorrectly do here
  [Repeat for every step]

FINAL RESULT: [EXPRESSION]
What this result means physically/conceptually.

EXAM DELIVERY FORMAT:
Show me how a student should write this in an exam:
how many steps to show, what notation to use, what to
label explicitly for the examiner.

MEMORY ANCHORS:
The 2–3 pivot points in this derivation that, if memorized,
allow the rest to be reconstructed logically.

[QUALITY_GATE]
After the derivation: generate one exam question that
asks for this derivation in a non-standard way
(different starting point, or derive a specific component only).
```

---

### Template 2.2 — Derivation Error Diagnosis (Claude Primary)

```
TEMPLATE ID: DU-002
TOOL: Claude
URGENCY: ALL
PURPOSE: Student has attempted derivation and made errors

---

I attempted to derive {DERIVATION_NAME} for my {SUBJECT} exam.
Here is my attempt:

{STUDENT_DERIVATION_ATTEMPT}

Analyze my attempt step by step.

For each step I wrote:
1. Is it correct? (Yes / Partially / No)
2. If not: what is wrong and why?
3. What is the correct step?
4. Is this a common error? How do students usually fall into this?

After analyzing every step:
5. What type of error pattern do I have?
   (Conceptual — wrong method | Algebraic — wrong calculation |
    Notation — unclear or inconsistent | Sequencing — correct
    steps in wrong order)
6. Give me the correct full derivation for comparison.
7. What should I practice to fix this specific error pattern?
```

---

## Category 3: PYQ (Previous Year Question) Solving

### Template 3.1 — PYQ Pattern Analysis (Claude + NotebookLM)

```
TEMPLATE ID: PYQ-001
TOOL: Claude (analysis) → NotebookLM (if papers uploaded)
URGENCY: NORMAL, ACCELERATED

---

I am preparing for {SUBJECT} exam.
Here are {N} years of past exam questions for this subject:

{PASTE_PAST_PAPER_QUESTIONS}

Analyze this question set and provide:

1. FREQUENCY TABLE
   For each topic that appears: number of times, years, marks.
   Format as a table sorted by frequency (highest first).

2. QUESTION TYPE ANALYSIS
   What percentage of questions are:
   [ ] Define/Explain  [ ] Calculate/Derive  [ ] Apply/Analyze
   [ ] Compare/Contrast  [ ] Evaluate/Critique  [ ] Case-based

3. MARKS DISTRIBUTION
   Which topics carry the most total marks across all papers?
   Which topics are high-frequency but low-marks?

4. REPEAT QUESTION IDENTIFICATION
   Which questions appear near-verbatim across multiple years?
   List these with year appearances.

5. PREDICTED TOP 5
   Based on patterns, the 5 questions most likely to appear
   in the next exam. Ranked by probability. Include reasoning
   for each prediction.

6. SAFE-TO-SKIP LIST
   Topics that have never appeared or appeared only once in {N} years.
   Explicit statement: "You can skip [TOPIC] without significant risk."

7. MARKS OPPORTUNITY MAP
   Where can the student gain the most marks relative to
   preparation time invested?
```

---

### Template 3.2 — Single PYQ Model Answer (ChatGPT / Claude)

```
TEMPLATE ID: PYQ-002
TOOL: ChatGPT (for volume) | Claude (for evaluation quality)
URGENCY: ALL

---

[FOR CHATGPT]:
Generate a model answer for this {SUBJECT} exam question:

Question: {QUESTION_TEXT}
Marks: {MARKS_FOR_QUESTION}
Professor type: {PROFESSOR_TYPE}
Answer format expected: {ANSWER_FORMAT_EXPECTED}

The model answer should:
- Match exactly the length appropriate for {MARKS_FOR_QUESTION} marks
  (approximate word count: {WORD_COUNT_FOR_MARKS})
- Use the vocabulary and structure a {PROFESSOR_TYPE} professor rewards
- Include every component that earns marks
- Be formatted as a student would write it in an exam (not as a textbook)

After the model answer:
List the 5 components in this answer that directly earn marks.
Label each: [DEFINITION] [EXAMPLE] [APPLICATION] [EVALUATION] [STRUCTURE]

---

[FOR CLAUDE — ANSWER EVALUATION VARIANT]:
I am preparing for {SUBJECT} with a {PROFESSOR_TYPE} professor.

Exam question: {QUESTION_TEXT} ({MARKS_FOR_QUESTION} marks)
My answer: {STUDENT_ANSWER}

Mark my answer as a strict {PROFESSOR_TYPE} professor would.

Scoring breakdown:
- Marks awarded: [X] / {MARKS_FOR_QUESTION}
- Component by component:
  [List each markable component with marks earned and marks possible]
- Specific deductions: [what lost marks and why]
- Marks traps triggered: {MARKS_TRAP_LIST}
- Missing elements: [what would have earned the remaining marks]
- Improved version: [show what a full-marks answer would look like]
```

---

## Category 4: Flashcard Generation

### Template 4.1 — Standard Flashcard Set (ChatGPT / NotebookLM)

```
TEMPLATE ID: FC-001
TOOL: ChatGPT (from knowledge) | NotebookLM (from uploaded notes)
URGENCY: ALL
TARGET_MARKS: ALL

---

[FOR CHATGPT]:
Generate {FLASHCARD_COUNT} exam-preparation flashcards for
{TOPIC} in {SUBJECT}.

Each flashcard must follow this exact format:
FRONT: [Question or term — written as an examiner would ask it]
BACK:  [Answer — written as a student should write it in an exam]
MARK:  [How many marks a correct recall earns]
TAG:   [DEFINITION | FORMULA | CONCEPT | CASE | EXAMPLE | PROCESS]

Rules:
- FRONT must be specific enough that there is only one correct BACK
- BACK must be concise enough to be written under exam pressure
- Include {DEFINITION_FOCUSED_CARDS} definition cards
- Include {CONCEPT_FOCUSED_CARDS} conceptual understanding cards
- Include {APPLICATION_FOCUSED_CARDS} application/example cards
- Calibrate difficulty to {TARGET_MARKS} level
- Use vocabulary this professor would recognize: {PROFESSOR_VOCABULARY}

---

[FOR NOTEBOOKLM]:
Based on my uploaded course materials, generate {FLASHCARD_COUNT}
flashcards for {TOPIC}.

Rules:
- Every BACK must be sourced from my uploaded materials
- Use exactly the terminology in my professor's notes
- After each flashcard, note which source document it came from
- Prioritize content that appears in my uploaded past papers
- Flag any topic that appears in multiple of my sources
  (higher probability = higher priority for memorization)
```

---

### Template 4.2 — Spaced Repetition Flashcards (ChatGPT)

```
TEMPLATE ID: FC-002
TOOL: ChatGPT
URGENCY: NORMAL, ACCELERATED

---

Generate a spaced repetition flashcard set for {TOPIC} in {SUBJECT}.
I have {HOURS_REMAINING} hours until my exam.

Design the set across 3 tiers:

TIER 1 — Review every 2 hours (highest priority):
{TIER1_COUNT} flashcards covering:
- Definitions that appear in exam marking schemes
- Formulas required for numerical problems
- Case names and holdings (for law subjects)
- Key thinker names and claims (for theory subjects)

TIER 2 — Review every 6 hours (moderate priority):
{TIER2_COUNT} flashcards covering:
- Application examples
- Comparison between related concepts
- Exception cases and edge conditions

TIER 3 — Review once before exam (lower priority):
{TIER3_COUNT} flashcards covering:
- Supporting detail
- Contextual background
- Supplementary examples

For each tier, mark each card:
FRONT: [Stimulus]
BACK: [Response]
TIER: [1/2/3]
WHY THIS TIER: [One sentence justification]
```

---

## Category 5: Revision Notes

### Template 5.1 — Comprehensive Revision Note (Claude Primary)

```
TEMPLATE ID: RN-001
TOOL: Claude
URGENCY: NORMAL, ACCELERATED
TARGET_MARKS: GOOD, TOPPER

---

You are creating exam revision notes for {TOPIC} in {SUBJECT}.
Student level: {UNIVERSITY_LEVEL}
Professor type: {PROFESSOR_TYPE}
Time available to study these notes: {TIME_PER_TOPIC} minutes
Target marks: {TARGET_MARKS}

Generate revision notes that are:
- Exam-calibrated (cover what this professor tests, in his/her depth)
- Self-contained (student should need nothing else for this topic)
- Structured for efficient revision (not for first-time learning)

FORMAT:
━━━ {TOPIC} — REVISION NOTES ━━━

CORE CONCEPT:
[2–3 sentences. The essence of the topic in the examiner's language]

KEY FRAMEWORK / STRUCTURE:
[The organizational structure of this topic — how its components
 relate to each other. Use numbered list or table as appropriate]

CRITICAL DEFINITIONS:
[Every term this professor would expect — with precise definitions]
Term: [Definition]
Term: [Definition]

EXAMPLES / CASES:
[The examples and cases most likely to appear in this exam]
→ [Example 1 with brief analysis]
→ [Example 2 with brief analysis]

COMMON EXAM QUESTIONS:
[The 3 most likely question formats for this topic]
Q: [Question]
Key points: [What the answer must include]

MARKS TRAPS:
[Specific deductions this professor makes that students miss]
⚠ [Trap 1]
⚠ [Trap 2]

CONNECTION TO OTHER TOPICS:
[How {TOPIC} connects to {RELATED_TOPIC_1} and {RELATED_TOPIC_2}]
This matters because: [exam question that tests both]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Template 5.2 — Compressed Revision Note (ChatGPT — Emergency)

```
TEMPLATE ID: RN-002
TOOL: ChatGPT
URGENCY: EMERGENCY, CRISIS

---

I have {HOURS_REMAINING} hours until my {SUBJECT} exam.
Create a compressed revision note for {TOPIC}.

Maximum length: {MAX_WORDS} words.
Professor type: {PROFESSOR_TYPE}.
Marks available for this topic: {MARKS_FOR_QUESTION}.

Include ONLY:
→ What it is (definition, 1 sentence)
→ The key formula or framework (if applicable)
→ One example I can use in an answer
→ The answer structure that earns marks
→ One thing I must not forget

Format as bullet points. No explanations. No background.
I need to absorb this in {TIME_PER_TOPIC} minutes.
```

---

## Category 6: Last-Minute Summaries

### Template 6.1 — T–4 Hour Subject Summary (ChatGPT Primary)

```
TEMPLATE ID: LMS-001
TOOL: ChatGPT
URGENCY: CRISIS
PURPOSE: Final consolidation only — no new learning

---

I have {HOURS_REMAINING} hours before my {SUBJECT} exam.
I need a consolidation summary — not new content.

This is NOT for learning. It is for activating what I already know.

Create a one-page exam readiness summary covering:

THE 10 MUST-KNOW POINTS:
[The 10 most important things to have in memory walking into this exam.
 Each point: 1–2 sentences maximum.]

THE 5 MOST LIKELY QUESTIONS:
[With 3-bullet answer outlines for each.
 Calibrated to {PROFESSOR_TYPE} professor.]

THE 3 MARKS TRAPS:
[The 3 specific errors that lose marks with this professor type.
 One sentence each.]

THE 2 MEMORY HOOKS:
[The 2 hardest-to-remember facts about this subject,
 with a memory technique for each.]

EXAM OPENING LINES:
[For the 3 most likely question types, the first sentence
 of a high-scoring answer. Ready to use.]

Strict format requirement: this entire summary must fit
on one A4 page when printed. No exceptions.
```

---

### Template 6.2 — T–1 Hour Final Flash Review

```
TEMPLATE ID: LMS-002
TOOL: ChatGPT
URGENCY: CRISIS
PURPOSE: Final mental activation — minutes before exam

---

My {SUBJECT} exam starts in {HOURS_REMAINING} hours.
Give me a 5-minute final review for {TOPIC}.

Format: question and answer pairs only.
10 questions. One line each. No explanations.
The questions should be exactly the style my professor asks.
Professor type: {PROFESSOR_TYPE}.

After the 10 questions: one sentence telling me the single most
important thing to remember walking into this exam.

Nothing else.
```

---

## Category 7: Viva Preparation

### Template 7.1 — Strict Viva Simulator (Claude Primary)

```
TEMPLATE ID: VP-001
TOOL: Claude
URGENCY: NORMAL, ACCELERATED
EXAM_TYPE: VIVA | ORAL_EXAM

---

You are simulating a strict university viva examiner for {SUBJECT}.
The student is about to face a viva on {TOPIC}.

EXAMINER PROFILE:
- Professor type: {PROFESSOR_TYPE}
- Difficulty level: {SUBJECT_DIFFICULTY}
- Known behavior: asks follow-up questions on weak answers,
  does not accept vague responses, rewards intellectual honesty
  ("I'm not certain, but my understanding is...")

VIVA SIMULATION RULES:
1. Ask one question at a time.
2. Wait for the student's answer.
3. After their answer: give brief feedback (1–2 sentences)
   before the next question.
4. Follow up on any answer that is correct but shallow.
5. If an answer is wrong: do not correct immediately.
   Ask "are you sure?" once. Then correct if they persist.
6. Escalate difficulty as the viva progresses.

START with this question:
"Tell me about {TOPIC}. Where would you begin?"

After 10 questions: give a viva performance assessment:
- Overall performance (Pass / Good / Excellent)
- Strongest answers
- Weakest answers (with what would have improved them)
- Topics to revise before the actual viva
```

---

### Template 7.2 — Viva Question Bank (ChatGPT)

```
TEMPLATE ID: VP-002
TOOL: ChatGPT
URGENCY: ALL
EXAM_TYPE: VIVA

---

Generate a viva preparation question bank for {TOPIC} in {SUBJECT}.
Viva style: {PROFESSOR_TYPE} professor at {UNIVERSITY_LEVEL}.

Organize into 4 tiers:

TIER 1 — ENTRY QUESTIONS (Every viva starts here):
5 questions that test basic recall and definition.
The examiner is checking if you know the fundamentals.

TIER 2 — UNDERSTANDING QUESTIONS (If Tier 1 goes well):
5 questions that test conceptual understanding.
"Why", "how does this work", "what would happen if..."

TIER 3 — APPLICATION QUESTIONS (For strong candidates):
5 questions that apply the topic to scenarios or problems.
The examiner is checking depth of understanding.

TIER 4 — CHALLENGE QUESTIONS (Separates good from excellent):
5 questions on edge cases, exceptions, cross-topic connections,
or scholarly debates. Many candidates struggle here.

For each question:
Q: [Question text]
WHAT THEY'RE TESTING: [The specific knowledge being probed]
IDEAL ANSWER INCLUDES: [3-4 key points]
RED FLAG RESPONSE: [What a failing answer looks like]
```

---

## Category 8: Audio Revision

### Template 8.1 — NotebookLM Audio Overview Preparation

```
TEMPLATE ID: AR-001
TOOL: NotebookLM
URGENCY: NORMAL, ACCELERATED
LEARNING_STYLE: AUDITORY

---

NOTE: This template prepares the student to get maximum value from
NotebookLM's audio overview feature. It is a setup prompt to run
before generating the audio overview.

---

I am going to use NotebookLM's audio overview feature to revise
{TOPIC} in {SUBJECT}.

Before I generate the audio:
Tell me how to structure my uploaded materials so the audio overview
covers the most important content for my exam.

Specifically:
1. Which parts of my notes should I highlight or mark as priority?
2. What source should be the primary document (most important)?
3. Should I add any supplementary context document to improve
   the audio quality?
4. After listening, what 3 questions should I test myself on
   to confirm the audio actually improved my understanding?
5. What does the audio overview typically NOT cover well, so I
   know what to supplement with other tools?

[FOLLOW-UP PROMPT after audio is generated]:
I just listened to the NotebookLM audio overview for {TOPIC}.
Test my retention with 5 questions on content from that topic.
Focus on the parts of the topic most likely to appear in my
{PROFESSOR_TYPE} professor's exam.
```

---

### Template 8.2 — Conversational Audio Script (ChatGPT)

```
TEMPLATE ID: AR-002
TOOL: ChatGPT
URGENCY: NORMAL, ACCELERATED
LEARNING_STYLE: AUDITORY
PURPOSE: Generate a script the student reads aloud to themselves

---

Write a conversational audio revision script for {TOPIC} in {SUBJECT}.

The script is for a student to read aloud to themselves while
walking, commuting, or during a break. It should sound like a
knowledgeable friend explaining the topic in conversation —
not a textbook, not a lecture.

SCRIPT REQUIREMENTS:
- Duration when read aloud: approximately {AUDIO_DURATION} minutes
- Tone: conversational, confident, occasionally asking the listener
  rhetorical questions ("Think about why that would be...")
- Structure: introduce → explain → example → connect to exam
- Include natural pause points marked with [PAUSE]
- Include 3 embedded comprehension checks where the listener
  is invited to recall a fact before it's stated
- Language complexity: {UNIVERSITY_LEVEL} appropriate

Topic: {TOPIC}
Most likely exam question: {LIKELY_EXAM_QUESTION}
Professor type: {PROFESSOR_TYPE}

The script should end with:
"The 3 things you need to remember about [TOPIC] are..."
[And then state them clearly and memorably]
```

---

## Category 9: Formula Memorization

### Template 9.1 — Formula Memory System (ChatGPT)

```
TEMPLATE ID: FM-001
TOOL: ChatGPT
URGENCY: ALL
SUBJECT_TYPE: STEM, MATHEMATICS, PHYSICS, ENGINEERING, CHEMISTRY

---

Create a formula memorization system for {TOPIC} in {SUBJECT}.
Exam context: {UNIVERSITY_LEVEL}, {PROFESSOR_TYPE} professor.
Time available: {TIME_PER_TOPIC} minutes for this topic.

For each formula in {TOPIC}:

FORMULA: [Expression]
NAME: [What this formula calculates or represents]
VARIABLES: [What each symbol means in plain English]
WHEN TO USE: [The question signal — keywords that tell you to use this]
COMMON CONFUSION: [Formula this is commonly confused with]
MEMORY HOOK: [A mnemonic, story, or visual anchor]
WORKED EXAMPLE: [One quick numerical example]
EXAM TRAP: [The most common error students make with this formula]

After all formulas:
Generate a FORMULA TRIGGER TABLE:
"When the question says [KEYWORD], use [FORMULA]."
10 entries minimum.

Then: Give me 5 formula identification questions.
"Which formula would you use to find [X] given [Y]?"
Include answers.
```

---

## Category 10: Diagram Practice

### Template 10.1 — Diagram Construction Guide (Gemini Primary)

```
TEMPLATE ID: DP-001
TOOL: Gemini (for image-based learning) | ChatGPT (text alternative)
URGENCY: ALL
PROFESSOR_TYPE: DIAGRAM_FOCUSED
LEARNING_STYLE: VISUAL

---

[FOR GEMINI — if diagram image uploaded]:
I've uploaded an image of [DIAGRAM NAME] from my {SUBJECT} course.

Analyze this diagram and provide:
1. COMPONENT CHECKLIST — every labeled element in the diagram,
   what it represents, and why it's in that position
2. RELATIONSHIP MAP — how the components relate to each other
3. MISSING ELEMENTS — anything the diagram should include
   that isn't shown
4. EXAM REPRODUCTION GUIDE — step-by-step instructions for
   drawing this diagram from scratch in an exam
5. LABELING STANDARDS — exactly what text should appear on
   each label for full marks

Then: describe what a memorized, exam-ready version of this
diagram must include, in the order it should be drawn.

---

[FOR CHATGPT — no image available]:
Describe in precise detail how to draw {DIAGRAM_NAME} in {SUBJECT}
for a university exam.

Provide:
STEP-BY-STEP DRAWING SEQUENCE:
[Numbered steps — what to draw first, second, in what orientation]

COMPLETE LABEL LIST:
[Every element that must be labeled, with the exact text for each label]

COMMON DRAWING ERRORS:
[What students typically draw incorrectly — proportion, direction, labels]

EXAM CHECKLIST:
[Before submitting this diagram in an exam, check that you have: ...]

EXPLANATION PARAGRAPH:
[The 3–4 sentence explanation a student writes after the diagram.
 Must reference specific labeled elements.]
```

---

## Category 11: Long-Answer Writing

### Template 11.1 — Long Answer Structure Generator (Claude Primary)

```
TEMPLATE ID: LAW-001
TOOL: Claude
URGENCY: ALL
MARKS_FOR_QUESTION: ≥10
PROFESSOR_TYPE: THEORY_HEAVY, STRICT_CHECKING, PRESENTATION_FOCUSED

---

I'm preparing to write a {MARKS_FOR_QUESTION}-mark answer for
{SUBJECT} with a {PROFESSOR_TYPE} professor.

Question: {QUESTION_TEXT}

Design the optimal answer structure for this question.

PART 1: ANSWER ARCHITECTURE
Break this answer into sections. For each section:
- Section name
- Content to include (specific, not vague)
- Approximate marks allocated
- Approximate word count
- The opening line of that section

PART 2: MARKS ALLOCATION MAP
Where are the marks in this answer?
- How many marks for definition/recall?
- How many for explanation/understanding?
- How many for example/application?
- How many for evaluation/critique?
- How many for structure/presentation?

PART 3: VOCABULARY LIST
The 8–10 terms or phrases I must use in this answer for it
to read as a top-band response to a {PROFESSOR_TYPE} professor.

PART 4: COMMON STRUCTURAL FAILURES
What would a 55% answer look like for this question?
What specifically is missing that drops it from 80% to 55%?

PART 5: MODEL OPENING PARAGRAPH
The first paragraph of a full-marks answer to this question.
This is the hardest paragraph to write under pressure —
provide it ready to use.
```

---

## Category 12: Definition Memorization

### Template 12.1 — Precision Definition Drill (NotebookLM / Claude)

```
TEMPLATE ID: DM-001
TOOL: NotebookLM (source-grounded) | Claude (general)
URGENCY: ALL
PROFESSOR_TYPE: DEFINITION_FOCUSED, STRICT_CHECKING

---

[FOR NOTEBOOKLM]:
From my uploaded course materials, extract every definition
for terms in {TOPIC} that my professor uses.

For each definition:
TERM: [Exact term as my professor uses it]
DEFINITION: [Exact wording from my uploaded materials]
SOURCE: [Which document/lecture this comes from]
MARKER WORDS: [The 3–4 words in this definition that are
               non-negotiable — the examiner looks for these]
COMMON PARAPHRASE ERROR: [How students typically get this
                          almost-right but lose marks]

Organize by: Most likely to be tested → Least likely.
Base likelihood on frequency in my uploaded past papers.

---

[FOR CLAUDE — general definition precision]:
I'm preparing for a {PROFESSOR_TYPE} professor in {SUBJECT}
who tests precise definitions.

For these terms: {TERM_LIST}

Provide for each:
PRECISE DEFINITION: [The academically correct formal definition]
MARKER WORDS: [Key terms that must appear]
WRONG VERSION: [A paraphrase that seems right but isn't — and why it loses marks]
MEMORY HOOK: [How to remember the precise version]
EXAM USAGE: [How to deploy this definition in an answer
             — define first, then apply, or apply with embedded definition?]
```

---

## Category 13: Numerical Solving

### Template 13.1 — Problem Type Master Prompt (ChatGPT Primary)

```
TEMPLATE ID: NS-001
TOOL: ChatGPT
URGENCY: ALL
PROFESSOR_TYPE: NUMERICAL_HEAVY

---

[PROBLEM TYPE IDENTIFICATION]:
I am solving {SUBJECT} numerical problems.
Here is a problem I need to solve: {PROBLEM_TEXT}

Before solving: identify the problem type.
PROBLEM TYPE: [Name of the problem category]
IDENTIFICATION SIGNALS: [What in the question told you this]
REQUIRED METHOD: [The approach to use]
REQUIRED FORMULA: [The formula — with variable definitions]

STEP-BY-STEP SOLUTION:
[Number every step]
[For each step: the mathematical expression AND the reason
 for that step in plain English]
[Never skip steps even if they seem obvious]

ANSWER VERIFICATION:
Check this answer by: [verification method]
Units check: [confirm units are correct throughout]
Reasonableness check: [does the magnitude make sense?]

EXAM DELIVERY FORMAT:
Show me exactly how a student should present this solution
in a {PROFESSOR_TYPE} professor's exam — including:
- Whether to state the formula before using it
- Whether to define variables
- What to box or underline
- How to present the final answer

SIMILAR QUESTION:
Generate one practice question of the same type with
different numbers. Provide solution.
```

---

## Category 14: Conceptual Mastery

### Template 14.1 — Feynman Technique Session (Claude Primary)

```
TEMPLATE ID: CM-001
TOOL: Claude
URGENCY: NORMAL, ACCELERATED
TARGET_MARKS: TOPPER, GOOD
PROFESSOR_TYPE: CONCEPTUAL, THEORY_HEAVY

---

I want to achieve genuine conceptual mastery of {TOPIC} in {SUBJECT}.
Use the Feynman Technique framework.

ROUND 1: TEACH ME FIRST
Explain {TOPIC} clearly and completely.
After your explanation, I will try to explain it back to you.

[Student explains — then submit the following]:

ROUND 2: DIAGNOSE MY EXPLANATION
Here is my explanation: {STUDENT_EXPLANATION}

Assess:
1. What did I understand correctly?
2. Where is my explanation shallow but not wrong?
3. Where is my explanation actually wrong?
4. What important aspect did I miss entirely?
5. Which part of my explanation would a {PROFESSOR_TYPE}
   professor find insufficient for an exam answer?

ROUND 3: TARGETED RELEARNING
For each weakness identified: re-explain only that specific part.
Use a different approach — if you used examples before, use logic.
If you used logic, use an analogy.

ROUND 4: MASTERY VERIFICATION
Give me 3 questions that test genuine understanding, not recall.
Questions where the answer cannot be retrieved from memory —
it must be constructed through understanding.
If I can answer all 3, I have mastered this topic.
```

---

# Part 3: Dynamic Prompt Generation Logic

---

## The Generation Pipeline

```
INPUT VARIABLES
     ↓
TEMPLATE SELECTION ENGINE
     ↓
VARIABLE INJECTION
     ↓
URGENCY MODIFIER APPLICATION
     ↓
PROFESSOR TYPE MODIFIER APPLICATION
     ↓
TARGET MARKS CALIBRATION
     ↓
TOOL-SPECIFIC OPTIMIZATION
     ↓
OUTPUT FORMATTING
     ↓
QUALITY GATE CHECK
     ↓
READY-TO-PASTE PROMPT
```

---

## Step 1: Template Selection Logic

```python
def select_template(
    task_type: TaskType,
    tool: Tool,
    urgency: UrgencyMode,
    target_marks: TargetMarks,
    professor_type: ProfessorType
) -> TemplateID:

    # Primary selection: task type × tool
    template = TEMPLATE_MATRIX[task_type][tool]

    # Urgency override: crisis mode selects compressed variant
    if urgency in [EMERGENCY, CRISIS]:
        if template.has_compressed_variant():
            template = template.compressed_variant()

    # Marks override: pass-only mode selects minimal depth variant
    if target_marks == PASS_ONLY:
        template = template.minimal_depth_variant()

    # Professor override: specific professor types have
    # dedicated template variants
    if professor_type in SPECIALIZED_TEMPLATES:
        template = template.apply_professor_variant(professor_type)

    return template.id
```

---

## Step 2: Urgency Modifier Block

Applied to all templates. Replaces {CONSTRAINT_BY_URGENCY} variable.

```
NORMAL (>72h available):
"Be thorough. Include conceptual depth, scholarly context,
 and edge cases where relevant. The student has time."

ACCELERATED (24-72h available):
"Be focused and efficient. Cover the core concept and main
 applications. Omit historical background and tangential content."

EMERGENCY (12-24h available):
"Be concise. Prioritize exam-relevant content only.
 No background, no tangents. Every sentence must help the student
 write a better exam answer."

CRISIS (<12h available):
"Be ruthlessly brief. Bullet points preferred over prose.
 Exam-critical facts only. Assume the student has no time
 to read anything non-essential."
```

---

## Step 3: Professor Type Modifier Blocks

Applied to output format and evaluation criteria sections.

```
THEORY_HEAVY modifier:
"The professor rewards: theoretical frameworks named correctly,
 scholarly thinkers cited, comparative analysis between schools,
 critical evaluation with a reasoned position.
 The professor penalizes: excessive examples without theory,
 personal opinion without scholarly grounding, informal vocabulary."

STRICT_CHECKING modifier:
"This professor marks against a detailed rubric. Every component
 of the question must be addressed explicitly. Conclusions are
 mandatory. Terminology must match the prescribed textbook.
 Missing any component costs marks even if the rest is perfect."

NUMERICAL_HEAVY modifier:
"Show every step of working. State the formula before applying it.
 Define all variables. Include units throughout. Box the final answer.
 This professor awards partial marks for correct method even
 if the final numerical answer is wrong."

DERIVATION_FOCUSED modifier:
"Every step must be shown and justified. Do not skip steps.
 State assumptions at the beginning. Note which law or theorem
 each step applies. The derivation must begin from the stated
 starting point, not from memory of the result."

APPLICATION_BASED modifier:
"The answer must apply the theory to the specific scenario given.
 Generic theory paragraphs without scenario reference lose marks.
 Must arrive at a concrete recommendation or conclusion.
 The professor rewards actionability over comprehensiveness."

DEFINITION_FOCUSED modifier:
"Definitions must use the precise formal wording, not paraphrase.
 Marker words must appear. Structure: define first, then illustrate,
 then distinguish from similar terms. Precision > comprehensiveness."
```

---

## Step 4: Target Marks Calibration

```
PASS_ONLY calibration:
  Depth instruction: "minimum viable coverage"
  Example requirement: 1 example maximum
  Evaluation criteria: "what earns 50% of available marks"
  Length: 60% of standard length
  Edge cases: exclude entirely

AVERAGE calibration:
  Depth instruction: "standard university depth"
  Example requirement: 1–2 examples
  Evaluation criteria: "what earns 65% of available marks"
  Length: 85% of standard length
  Edge cases: mention one if time allows

GOOD calibration:
  Depth instruction: "thorough coverage with nuance"
  Example requirement: 2–3 examples, at least one novel
  Evaluation criteria: "what earns 80% of available marks"
  Length: 100% of standard length
  Edge cases: include and acknowledge

TOPPER calibration:
  Depth instruction: "comprehensive with scholarly sophistication"
  Example requirement: 2–3 examples, at least one original
  Evaluation criteria: "what earns 90%+ of available marks"
  Length: 115% of standard length
  Edge cases: identify, analyze, and demonstrate awareness of limits
```

---

## Step 5: Tool-Specific Optimizations

```
CHATGPT optimizations:
- Open with role declaration (ChatGPT responds well to persona framing)
- Specify exact output format explicitly (bullet vs prose vs table)
- Add word count constraint (without it, ChatGPT often over-generates)
- Use numbered output sections (improves response structure reliability)
- Do NOT include "think carefully" — increases latency without quality gain

CLAUDE optimizations:
- Provide maximum context upfront (Claude extracts more value from context)
- Paste actual student work for evaluation (Claude's strongest use case)
- Use analytical framing, not task framing ("analyze" over "tell me")
- Do NOT add persona declarations for evaluation tasks (Claude evaluates
  more honestly without a strict persona)
- Include explicit evaluation criteria when asking for marking

GEMINI optimizations:
- Reference image/upload explicitly at the start when multimodal
- Ask for source integration ("include recent examples from [year]")
- Use Google ecosystem language when relevant ("As of [recent date]...")
- Specify if real-time information is needed
- For text-only tasks: add "based on established knowledge" to
  prevent hallucination-via-search on stable facts

NOTEBOOKLM optimizations:
- Never include general knowledge requests (it ignores them)
- Always reference "my uploaded materials" or "my notes"
- Ask for source citations on every response
- Request priority ranking based on exam relevance
- Use for quiz generation, not for concept explanation

PERPLEXITY optimizations:
- Always request sources ("with source links")
- Specify date range for currency ("from the last 2 years")
- Specify geographic scope when relevant ("in India", "in UK context")
- Use for fact verification, not for generation
- Ask for academic sources separately from news sources
```

---

# Part 4: Output Formatting System

---

## Output Format 1: The Prompt Card

The primary user-facing output. Every generated prompt is presented as a card.

```
┌─────────────────────────────────────────────────────────────┐
│  PROMPT CARD                                                 │
│  Task: Concept Learning | Tool: Claude | Topic: CAPM        │
│─────────────────────────────────────────────────────────────│
│  CALIBRATED FOR:                                             │
│  Professor: Theory-Heavy  │  Target: 80%  │  Time: 45 min   │
│─────────────────────────────────────────────────────────────│
│                                                             │
│  WHERE TO PASTE: Claude.ai                                   │
│  EXPECTED OUTPUT: Structured explanation with framework     │
│  TIME TO READ OUTPUT: ~8 minutes                            │
│                                                             │
│  ── PROMPT ─────────────────────────────────────────────── │
│                                                             │
│  [Full generated prompt text]                               │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [  Copy Prompt  ]  [  Open Claude  ]  [  Edit Variables  ]│
│                                                             │
│  AFTER USING THIS PROMPT:                                   │
│  → If concept is clear: mark complete, move to next         │
│  → If still confused: [load gap-repair prompt]              │
│  → Ready to practice: [load PYQ prompt for this topic]      │
└─────────────────────────────────────────────────────────────┘
```

---

## Output Format 2: The Prompt Sequence

When multiple prompts form a study session workflow.

```
SESSION: CAPM Theory — 45 Minutes
Professor: Theory-Heavy | Tool Sequence: ChatGPT → Claude → ChatGPT

┌─ PROMPT 1 of 3 ────────────────────────────────────────────┐
│  Tool: ChatGPT | Purpose: Initial concept load | Time: 15m  │
│  [Prompt text]                                               │
│  [Copy] [Open ChatGPT]                                      │
└────────────────────────────────────────────────────────────┘

┌─ PROMPT 2 of 3 ────────────────────────────────────────────┐
│  Tool: Claude | Purpose: Deep understanding | Time: 20m     │
│  PREREQUISITE: Complete Prompt 1 first                      │
│  BRING WITH YOU: Paste ChatGPT's output into this section   │
│  before running Prompt 2:                                   │
│  [PRIOR OUTPUT FIELD: _________________________________]     │
│  [Generated prompt with {PRIOR_TOOL_OUTPUT} injected]       │
│  [Copy] [Open Claude]                                       │
└────────────────────────────────────────────────────────────┘

┌─ PROMPT 3 of 3 ────────────────────────────────────────────┐
│  Tool: ChatGPT | Purpose: Practice questions | Time: 10m    │
│  [Prompt text]                                               │
│  [Copy] [Open ChatGPT]                                      │
└────────────────────────────────────────────────────────────┘
```

---

## Output Format 3: The Prompt Pack (Downloadable)

Full session prompt pack as a formatted document.

```
EXAM-CLUTCH PROMPT PACK
Subject: Financial Management
Exam: Tomorrow (18 hours remaining)
Mode: Emergency — Theory-Heavy Professor
Generated: [DATE/TIME]

════════════════════════════════════════════════

PHASE 1 PROMPTS — TRIAGE (Use first)

Prompt 1.1 | ChatGPT | Priority Ranking
[Full prompt]

════════════════════════════════════════════════

PHASE 2 PROMPTS — TOPIC COVERAGE (Use in order)

Prompt 2.1 | ChatGPT | Unit 4: CAPM — Concept Load
[Full prompt]

Prompt 2.2 | Claude | Unit 4: CAPM — Deep Understanding
[Full prompt]

Prompt 2.3 | ChatGPT | Unit 7: Bonds — Concept Load
[Full prompt]

[...continues for all topics]

════════════════════════════════════════════════

PHASE 3 PROMPTS — ACTIVE RECALL

Prompt 3.1 | ChatGPT | Topic Quiz — All Covered Topics
[Full prompt]

Prompt 3.2 | Claude | Answer Evaluation — Unit 4
[Full prompt]

[...continues]
```

---

# Part 5: Prompt Quality Optimization Strategies

---

## Strategy 1: Output Length Calibration

Every prompt includes an explicit length instruction derived from the time constraint and task type.

```
WORD COUNT MAPPING TABLE:

Marks  → Answer Words  → Prompt Output Target
2      → 60–80         → 100–150 (explanation + example)
5      → 150–200       → 300–400 (full explanation)
10     → 400–500       → 600–800 (comprehensive with structure)
15     → 600–700       → 800–1000 (essay-depth output)
20+    → 800–1000      → 1200–1500 (full analytical response)

TIME → PROMPT COMPLEXITY:
<10 min per topic  → Single-section prompt, bullet output
10–30 min          → 3-section prompt, structured output
30–60 min          → 5-section prompt, full analytical output
60+ min            → 7-section prompt, comprehensive output
```

---

## Strategy 2: Specificity Injection

The single most impactful quality lever. Generic prompts produce generic outputs. Every variable that can be made specific, must be.

```
GENERIC (low quality):
"Explain portfolio theory for my finance exam."

SPECIFIC (high quality):
"Explain Capital Asset Pricing Model (CAPM) for a
 Final Year B.Com Finance student at university level.
 My professor is Theory-Heavy and expects scholarly frameworks,
 named theorists, and comparative analysis in exam answers.
 I need to write a 10-mark essay answer on this tomorrow.
 I have 45 minutes to study this topic.
 My target is 80%+ marks."

QUALITY MULTIPLIER: Specific prompts produce outputs that are
on average 40–60% more directly usable for exam preparation.
```

---

## Strategy 3: Chain Prompting Architecture

Design prompts to flow into each other, with each output becoming input for the next.

```
CHAIN STRUCTURE:

PROMPT A (Understanding):
→ Produces: Concept explanation + key terms

PROMPT B (Practice) uses PROMPT A output:
→ "Based on the explanation you just gave me,
   generate 5 exam questions."
→ Produces: Practice questions calibrated to the just-explained content

PROMPT C (Evaluation) uses student answer:
→ "I wrote this answer to Question 3 from your previous response:
   [student answer]. Mark it."
→ Produces: Targeted feedback on the student's actual attempt

PROMPT D (Gap repair) uses PROMPT C feedback:
→ "You identified that I missed [specific gap].
   Re-explain only that component. Use a different approach."
→ Produces: Targeted explanation of the specific gap

CHAIN QUALITY RULE:
Each prompt in a chain must reference what came before.
Chains without context reference degrade to isolated prompts
and lose the quality compounding effect.
```

---

## Strategy 4: Quality Gate Suffix

Appended to every substantive prompt. Costs minimal tokens, significantly improves output relevance.

```
STANDARD QUALITY GATE SUFFIX:
"Before finishing: check that everything you've provided is
 (a) accurate at the {UNIVERSITY_LEVEL} level,
 (b) directly relevant to exam preparation rather than general knowledge,
 (c) calibrated to a {PROFESSOR_TYPE} professor's expectations.
 If any part isn't, revise it before presenting."

EVALUATION-SPECIFIC QUALITY GATE:
"Check that your marking is honest — do not give higher marks
 than the answer deserves because the student worked hard.
 A student who receives inflated evaluation will be surprised
 by their actual exam result. Be as strict as the examiner will be."

FACTUAL ACCURACY QUALITY GATE (for law/medicine):
"Note: if you are uncertain about any specific case name,
 statute, drug dosage, or factual detail, say so explicitly
 rather than providing an answer you're not certain of.
 In these subjects, a wrong specific detail is worse than
 a missing one."
```

---

## Strategy 5: Negative Instruction Set

Tell the AI what NOT to do. This prevents common prompt failure modes.

```
STANDARD NEGATIVE INSTRUCTIONS BY TOOL:

FOR CHATGPT:
"Do not: include historical background unless asked, exceed
 {MAX_WORDS} words, use casual language, recommend further
 reading, include disclaimers."

FOR CLAUDE:
"Do not: be unnecessarily cautious about providing specific
 content, hedge every statement, provide generic advice when
 specific guidance is needed."

FOR GEMINI:
"Do not: retrieve general web information when course-specific
 content is needed, include information from sources published
 before {RELEVANCE_DATE} unless foundational."

FOR NOTEBOOKLM:
"Do not: go beyond my uploaded materials, invent citations,
 add general knowledge not present in my documents."

FOR PERPLEXITY:
"Do not: use sources that are not from [academic / government /
 reputable news] outlets. Do not provide information without
 a source citation."
```

---

## Strategy 6: Adaptive Difficulty Prompt Modifier

Applied dynamically based on student performance signals.

```
PERFORMANCE SIGNAL: Student scored <50% on recall test

MODIFIER APPLIED TO NEXT PROMPT:
"The student has demonstrated difficulty with this topic.
 Adjust your explanation by:
 - Starting from a more foundational level than you normally would
 - Using more concrete examples before abstract principles
 - Checking comprehension more frequently within your response
 - Identifying the most likely source of confusion explicitly"

PERFORMANCE SIGNAL: Student marked topic as "fully understood" early

MODIFIER APPLIED:
"The student reports strong understanding of the basics.
 Adjust to:
 - Skip foundational explanation
 - Move directly to edge cases and nuances
 - Test with harder questions than standard
 - Connect to adjacent topics for cross-topic mastery"
```

---

# Part 6: Prompt Categories Database Structure

---

## Database Schema

```sql
TABLE: prompt_templates
  id                  TEXT PRIMARY KEY,   -- e.g., "CL-001"
  category            TEXT,               -- "concept_learning"
  subcategory         TEXT,               -- "first_encounter"
  target_tool         TEXT[],             -- ["CHATGPT", "CLAUDE"]
  urgency_modes       TEXT[],             -- ["NORMAL", "ACCELERATED"]
  professor_types     TEXT[],             -- ["ALL"] or specific types
  target_marks        TEXT[],             -- ["ALL"] or specific levels
  subject_types       TEXT[],             -- ["STEM"] or ["ALL"]
  template_body       TEXT,               -- Full template with {VARIABLES}
  variables_required  JSONB,              -- {variable: type, ...}
  variables_optional  JSONB,              -- {variable: type, default: ...}
  compressed_variant  TEXT,               -- ID of emergency version
  quality_gate        TEXT,               -- Appended quality gate text
  avg_output_words    INT,                -- Expected AI output length
  use_count           INT,                -- Usage tracking
  avg_quality_score   FLOAT,             -- From student feedback
  created_at          TIMESTAMP,
  last_optimized      TIMESTAMP

TABLE: prompt_performance
  template_id         TEXT,
  session_id          TEXT,
  variable_hash       TEXT,               -- Hash of injected variables
  student_rating      INT,                -- 1-5 from student feedback
  output_was_useful   BOOLEAN,
  exam_outcome        TEXT,               -- Post-exam feedback if captured
  tool_used           TEXT,
  timestamp           TIMESTAMP

TABLE: variable_mappings
  variable_name       TEXT,
  input_value         TEXT,               -- What student provides
  mapped_value        TEXT,               -- How it becomes prompt text
  context             TEXT,               -- Where this mapping is used
```

---

## Category Index

```
CATEGORY ID    NAME                    TEMPLATES    PRIMARY TOOL
────────────────────────────────────────────────────────────────
CL             Concept Learning        6            ChatGPT, Claude
DU             Derivation Understanding 4           Claude
PYQ            PYQ Solving             5            Claude, ChatGPT
FC             Flashcard Generation    4            ChatGPT, NotebookLM
RN             Revision Notes          4            Claude, ChatGPT
LMS            Last-Minute Summaries   3            ChatGPT
VP             Viva Preparation        4            Claude, ChatGPT
AR             Audio Revision          3            NotebookLM, ChatGPT
FM             Formula Memorization    3            ChatGPT
DP             Diagram Practice        3            Gemini, ChatGPT
LAW            Long-Answer Writing     4            Claude
DM             Definition Memorization 3            NotebookLM, Claude
NS             Numerical Solving       4            ChatGPT
CM             Conceptual Mastery      3            Claude

TOTAL: 57 base templates
       × average 2.3 variants per template
       = ~130 total prompt variants in the database
```

---

## Quality Improvement Loop

```
FEEDBACK COLLECTION:
After each study session:
1. "Was this prompt useful?" (Yes / Somewhat / No)
2. "Did the AI output help you understand/remember this better?"
3. After exam: "Did this topic appear? Did your preparation help?"

OPTIMIZATION TRIGGERS:
IF avg_quality_score < 3.5 for template_id:
  → Flag for human review
  → A/B test against alternative phrasing

IF exam_outcome correlation negative for template_id:
  → Deprioritize template, promote alternative

IF use_count high + quality_score high:
  → Promote to featured template
  → Use as foundation for new variants

CONTINUOUS LEARNING:
Monthly: Review top 20 highest-rated prompts.
Extract: What specific phrases, structures, and instructions
         correlate with high rating.
Apply: These patterns become the standard for new template creation.
```

---

*Prompt Generation Architecture — Complete Design Document*
*Exam-Clutch Internal — Version 1.0*
