// ============================================================
// CramPilot — Mock Prompt Templates
// 15 pre-built prompt templates for Corporate Law (demo)
// ============================================================

import type { PromptTemplate } from '@/types'

export const MOCK_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'CL-001',
    category: 'concept-learning',
    taskType: 'concept-load',
    targetTool: 'chatgpt',
    title: 'Contract Formation — Concept Overview',
    description: 'Get a structured overview of all essential elements needed to answer exam questions on contract formation.',
    templateBody: `You are a Corporate Law tutor preparing a final-year [DEGREE] student for an exam with a theory-heavy professor who rewards scholarly frameworks.

Explain the essential elements of a valid contract under the Indian Contract Act in exactly this structure:
1. Definition (one precise sentence citing the Act)
2. Each essential element — name it, define it, state the section number
3. A brief case law example for the 2 most important elements
4. One sentence on what happens if any element is missing

Keep each element explanation under 80 words. Use formal legal language. Do not include conversational preamble.

Subject: [SUBJECT]
Topic: Contract Formation`,
    variables: [
      { key: 'DEGREE', label: 'Degree Programme', defaultValue: 'LLB', isRequired: true },
      { key: 'SUBJECT', label: 'Subject Name', defaultValue: 'Corporate Law', isRequired: true },
    ],
    characterCount: 612,
    professorArchetypes: ['theory-scholar', 'pyq-repeater'],
    subjectTags: ['Corporate Law', 'Contract Law', 'Business Law'],
    isUniversal: false,
    isPaid: false,
    version: 1,
    usageCount: 847,
    rating: 4.8,
  },
  {
    id: 'CL-002',
    category: 'practice-questions',
    taskType: 'practice-questions',
    targetTool: 'chatgpt',
    title: 'Contract Formation — Practice Questions',
    description: 'Generate exam-style practice questions calibrated to your professor\'s marking style.',
    templateBody: `Generate 5 exam-style questions on Contract Formation under the Indian Contract Act for a final-year [DEGREE] exam.

Professor context: theory-heavy, marks on scholarly frameworks, expects definitions + case law + conclusions. Each answer is worth 10 marks.

For each question:
- Write the question as it would appear in the exam
- State the expected answer length (words)
- List 3 key points the model answer must include to score full marks

Questions should range: 2 definitional, 2 analytical, 1 application-based.

Do not write the full answers — just the questions and marking guidance.`,
    variables: [
      { key: 'DEGREE', label: 'Degree Programme', defaultValue: 'LLB', isRequired: true },
    ],
    characterCount: 541,
    professorArchetypes: ['theory-scholar'],
    subjectTags: ['Corporate Law', 'Contract Law'],
    isUniversal: false,
    isPaid: false,
    version: 1,
    usageCount: 612,
    rating: 4.7,
  },
  {
    id: 'CL-003',
    category: 'answer-framework',
    taskType: 'answer-framework',
    targetTool: 'claude',
    title: 'Directors\' Fiduciary Duties — Answer Framework',
    description: 'Build the exact answer structure that scores maximum marks for this topic.',
    templateBody: `I have a Corporate Law exam tomorrow with a strict, theory-heavy professor. Help me build the optimal answer framework for: Directors' Fiduciary Duties.

Create a fill-in template with:
1. Opening sentence structure (with blank for the precise definition)
2. The 5–6 key duties — in the order they should appear in the answer
3. For each duty: the exact legal name, section/case reference placeholder, 30-word explanation template
4. Transition phrases to use between duties
5. Required conclusion structure (2–3 sentences)

This is a 15-mark answer. Professor deducts 2 marks if there's no conclusion.

Format as a structured template I can memorize and reproduce in the exam.`,
    variables: [],
    characterCount: 598,
    professorArchetypes: ['theory-scholar', 'strict-marker'],
    subjectTags: ['Corporate Law'],
    isUniversal: false,
    isPaid: false,
    version: 1,
    usageCount: 423,
    rating: 4.9,
  },
  {
    id: 'CL-004',
    category: 'flashcards',
    taskType: 'flashcards',
    targetTool: 'chatgpt',
    title: 'Corporate Law — Core Definitions Flashcards',
    description: 'Generate 20 flashcards covering the most-tested definitions and sections.',
    templateBody: `Create 20 flashcard pairs for Corporate Law exam preparation.

Focus: definitions, section numbers, and landmark cases most likely to appear in a theory-heavy professor's exam on [TOPICS].

Format each card as:
Front: [The legal term or section number]
Back: [Precise definition (max 40 words) + Section/Act reference + 1 key case if applicable]

Prioritize: terms that appear in question papers, not just textbook definitions. Exclude obscure terms unlikely to be tested.

Make definitions crisp and exam-reproducible — not paraphrased.`,
    variables: [
      { key: 'TOPICS', label: 'Topics to Cover', defaultValue: 'Contract Formation, Directors\' Duties, Company Types', isRequired: true },
    ],
    characterCount: 534,
    isUniversal: false,
    isPaid: false,
    version: 1,
    usageCount: 1205,
    rating: 4.6,
  },
  {
    id: 'CL-005',
    category: 'last-minute-summary',
    taskType: 'last-minute-summary',
    targetTool: 'chatgpt',
    title: '10-Minute Last-Minute Summary',
    description: 'The absolute minimum you need to know for [TOPIC] — exam in under 2 hours.',
    templateBody: `My exam starts in 2 hours. I need the absolute minimum for [TOPIC] in [SUBJECT].

Give me exactly:
1. The 3 most likely exam questions on this topic
2. For each question: a 5-bullet point answer skeleton (not full prose)
3. The 3 terms I must define correctly or lose marks
4. One common mistake students make on this topic

Format as scannable bullets. No paragraphs. No preamble. I need to read this in 8 minutes.`,
    variables: [
      { key: 'TOPIC', label: 'Topic Name', defaultValue: 'Contract Formation', isRequired: true },
      { key: 'SUBJECT', label: 'Subject', defaultValue: 'Corporate Law', isRequired: true },
    ],
    characterCount: 412,
    isUniversal: true,
    isPaid: false,
    version: 1,
    usageCount: 2841,
    rating: 4.9,
  },
  {
    id: 'GEN-001',
    category: 'marks-trap-check',
    taskType: 'marks-trap-review',
    targetTool: 'gemini',
    title: 'Marks Trap Awareness Review',
    description: 'Identify the specific mistakes that cost marks with your professor type.',
    templateBody: `I'm preparing for a [PROFESSOR_TYPE] professor's exam on [SUBJECT]. Based on this professor type, what are the 5 most common student mistakes that cost marks — not content gaps, but structural/format/precision mistakes?

For each mistake:
- What the student does (specific behavior)
- How many marks it typically costs
- The exact correction (one sentence)

Be specific to [PROFESSOR_TYPE] grading patterns. Focus on things students with decent content knowledge still lose marks on.`,
    variables: [
      { key: 'PROFESSOR_TYPE', label: 'Professor Type', defaultValue: 'theory-heavy, strict marking', isRequired: true },
      { key: 'SUBJECT', label: 'Subject', defaultValue: 'Corporate Law', isRequired: true },
    ],
    characterCount: 487,
    isUniversal: true,
    isPaid: false,
    version: 1,
    usageCount: 934,
    rating: 4.7,
  },
  // Premium prompts
  {
    id: 'CL-006',
    category: 'examiner-perspective',
    taskType: 'deep-understanding',
    targetTool: 'claude',
    title: 'Examiner\'s Marking Perspective — Predicted Q1',
    description: 'Get the examiner\'s view on exactly what a full-marks answer looks like for the highest-probability question.',
    templateBody: `[PREMIUM PROMPT — PAID CONTENT]
Act as an examiner marking [SUBJECT] papers for a university final exam.

The question is: "[PREDICTED_QUESTION]"

Write a marking rubric from the examiner's perspective:
1. What 10-mark answer gets 10/10 (full marks criteria)
2. What a typical 7/10 answer looks like (what's missing)
3. What a typical 4/10 answer looks like (common failure)
4. The 3 phrases/concepts that flag a student as well-prepared

Then write the model 10/10 answer (400–500 words).`,
    variables: [
      { key: 'SUBJECT', label: 'Subject', defaultValue: 'Corporate Law', isRequired: true },
      { key: 'PREDICTED_QUESTION', label: 'Predicted Question', isRequired: true, hint: 'From your PYQ analysis' },
    ],
    characterCount: 598,
    isUniversal: false,
    isPaid: true,
    version: 1,
    usageCount: 412,
    rating: 4.9,
  },
]

export const MOCK_PROMPT_MAP: Record<string, PromptTemplate> = Object.fromEntries(
  MOCK_PROMPT_TEMPLATES.map((p) => [p.id, p])
)
