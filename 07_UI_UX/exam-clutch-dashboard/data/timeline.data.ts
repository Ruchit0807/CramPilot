// ============================================================
// CramPilot — Premium Timeline Data
// Rich blocks: method, revision, urgency, checkpoints
// ============================================================

export type BlockType  = 'study' | 'break' | 'sleep' | 'exam' | 'checkpoint'
export type AITool     = 'claude' | 'chatgpt' | 'gemini' | 'notebooklm'
export type Urgency    = 'critical' | 'high' | 'moderate' | 'low'
export type StudyMethod = 'deep-learn' | 'practice' | 'revise' | 'recall' | 'simulate' | 'audio'

export interface TimelineBlock {
  id: string
  // Time
  startTime: string      // e.g. "6:30 PM"
  endTime: string        // e.g. "8:00 PM"
  durationMin: number
  // Content
  type: BlockType
  label: string
  topic: string
  subtopics?: string[]
  // AI
  tool: AITool | null
  promptHint?: string    // one-line prompt hint
  // Study
  method: StudyMethod | null
  revisionStrategy?: string
  // Urgency / meta
  urgency: Urgency
  isWeak?: boolean       // topic is a weak area
  isCheckpoint?: boolean
  checkpointLabel?: string
  pyqFrequency?: number  // 0–5 PYQ appearances
  // Progress
  isComplete?: boolean
}

// ── Tool metadata ────────────────────────────────────────────
export const TOOL_META: Record<AITool, { label: string; color: string; bg: string; url: string; emoji: string }> = {
  claude:     { label: 'Claude',     color: '#F97316', bg: 'rgba(249,115,22,0.1)',  url: 'https://claude.ai',                emoji: '🟠' },
  chatgpt:    { label: 'ChatGPT',   color: '#10B981', bg: 'rgba(16,185,129,0.1)',  url: 'https://chat.openai.com',          emoji: '🟢' },
  gemini:     { label: 'Gemini',    color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  url: 'https://gemini.google.com',        emoji: '🔵' },
  notebooklm: { label: 'NotebookLM',color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', url: 'https://notebooklm.google.com',   emoji: '🟣' },
}

export const METHOD_META: Record<StudyMethod, { label: string; icon: string; color: string }> = {
  'deep-learn': { label: 'Deep Learn',   icon: '🧠', color: '#818CF8' },
  'practice':   { label: 'Practice',     icon: '⚡', color: '#FBBF24' },
  'revise':     { label: 'Rapid Revise', icon: '🔄', color: '#4ADE80' },
  'recall':     { label: 'Active Recall',icon: '💡', color: '#F97316' },
  'simulate':   { label: 'Exam Sim',     icon: '📝', color: '#F87171' },
  'audio':      { label: 'Audio',        icon: '🎧', color: '#8B5CF6' },
}

export const URGENCY_META: Record<Urgency, { color: string; bg: string; label: string }> = {
  critical: { color: '#F87171', bg: 'rgba(248,113,113,0.1)', label: 'CRITICAL' },
  high:     { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)', label: 'HIGH'     },
  moderate: { color: '#818CF8', bg: 'rgba(129,140,248,0.08)',label: 'MODERATE' },
  low:      { color: '#4ADE80', bg: 'rgba(74,222,128,0.06)', label: 'LOW'      },
}

// ── Timeline blocks ──────────────────────────────────────────
export const TIMELINE_BLOCKS: TimelineBlock[] = [
  {
    id: 'b1',
    startTime: '6:30 PM', endTime: '7:00 PM', durationMin: 30,
    type: 'study', urgency: 'high',
    label: 'Triage & Plan Review',
    topic: 'Strategy Setup',
    subtopics: ['Read this roadmap', 'Open Claude', 'Bookmark prompts'],
    tool: 'claude', method: 'deep-learn',
    promptHint: '"Confirm my 18h DSA study plan and adjust if needed"',
    revisionStrategy: 'Commit the topic order to memory before starting',
    isCheckpoint: true, checkpointLabel: 'Plan locked ✓',
    pyqFrequency: 0,
  },
  {
    id: 'b2',
    startTime: '7:00 PM', endTime: '8:30 PM', durationMin: 90,
    type: 'study', urgency: 'critical',
    label: 'Sorting Algorithms',
    topic: 'Sorting Algorithms',
    subtopics: ['Merge Sort derivation', 'Quick Sort pivot analysis', 'Heap Sort + complexity proof'],
    tool: 'claude', method: 'deep-learn',
    promptHint: '"Teach Merge Sort, Quick Sort, Heap Sort with complexity derivation for exam"',
    revisionStrategy: 'After each algorithm: close Claude, write the recurrence from memory',
    pyqFrequency: 5, isWeak: false,
  },
  {
    id: 'b3',
    startTime: '8:30 PM', endTime: '8:45 PM', durationMin: 15,
    type: 'break', urgency: 'low',
    label: 'Break — Hydrate',
    topic: 'Walk, drink water, no screens',
    tool: null, method: null,
    revisionStrategy: 'Let Merge Sort consolidate in memory. Do NOT review notes.',
  },
  {
    id: 'b4',
    startTime: '8:45 PM', endTime: '10:15 PM', durationMin: 90,
    type: 'study', urgency: 'critical',
    label: 'Binary Search Trees',
    topic: 'Binary Search Trees',
    subtopics: ['Insertion, deletion, traversal', 'AVL rotations', 'BST vs Heap comparison'],
    tool: 'claude', method: 'deep-learn',
    promptHint: '"Walk me through BST operations step-by-step with Dr. Mehta exam style"',
    revisionStrategy: 'Draw the tree on paper for each operation — Dr. Mehta gives diagram marks',
    pyqFrequency: 4, isWeak: false,
    isCheckpoint: true, checkpointLabel: 'Sorting + BST covered ✓',
  },
  {
    id: 'b5',
    startTime: '10:15 PM', endTime: '11:45 PM', durationMin: 90,
    type: 'study', urgency: 'critical',
    label: 'Graph Traversal (Weak Area)',
    topic: 'Graph Traversal — BFS & DFS',
    subtopics: ['BFS with queue', 'DFS recursive + iterative', 'Cycle detection', 'Topological sort'],
    tool: 'chatgpt', method: 'practice',
    promptHint: '"Give me 4 Graph traversal problems — start easy, build to exam difficulty"',
    revisionStrategy: 'Solve each problem on paper before checking ChatGPT solution',
    pyqFrequency: 5, isWeak: true,
  },
  {
    id: 'b6',
    startTime: '11:45 PM', endTime: '12:05 AM', durationMin: 20,
    type: 'break', urgency: 'moderate',
    label: 'Break + Audio Revision',
    topic: 'NotebookLM podcast while resting',
    tool: 'notebooklm', method: 'audio',
    promptHint: 'Play the Graph Algorithms audio overview at 1.5×',
    revisionStrategy: 'Eyes closed, visualize the graph traversal paths as you listen',
  },
  {
    id: 'b7',
    startTime: '12:05 AM', endTime: '2:05 AM', durationMin: 120,
    type: 'study', urgency: 'critical',
    label: 'Dynamic Programming (Weak Area)',
    topic: 'Dynamic Programming',
    subtopics: ['Optimal substructure', 'Memoization vs tabulation', 'LCS, 0-1 Knapsack, LIS'],
    tool: 'chatgpt', method: 'practice',
    promptHint: '"5 DP problems ordered easy→hard. Show hints only if asked. Full derivation each."',
    revisionStrategy: 'Write the recurrence relation on paper BEFORE coding. Base cases first.',
    pyqFrequency: 4, isWeak: true,
    isCheckpoint: true, checkpointLabel: 'All critical topics covered ✓',
  },
  {
    id: 'b8',
    startTime: '2:05 AM', endTime: '6:00 AM', durationMin: 235,
    type: 'sleep', urgency: 'high',
    label: 'SLEEP — Non-negotiable',
    topic: 'Minimum 4h sleep — memory consolidation',
    subtopics: ['Set alarm for 6:00 AM', 'No reviewing notes in bed', 'Brain needs this'],
    tool: null, method: null,
    revisionStrategy: 'Sleep is revision. Neural consolidation happens during REM sleep.',
  },
  {
    id: 'b9',
    startTime: '6:00 AM', endTime: '7:00 AM', durationMin: 60,
    type: 'study', urgency: 'high',
    label: 'Hashing + Heaps (Rapid)',
    topic: 'Hashing & Heaps',
    subtopics: ['Hash collisions', 'Load factor + rehashing', 'Min/Max heap operations'],
    tool: 'gemini', method: 'revise',
    promptHint: '"Rapid cheat sheet: Hashing and Heaps — complexities, traps, key facts only"',
    revisionStrategy: 'Read only. No practice problems. Solidify what you know.',
    pyqFrequency: 3,
    isCheckpoint: true, checkpointLabel: 'Morning revision started ✓',
  },
  {
    id: 'b10',
    startTime: '7:00 AM', endTime: '7:30 AM', durationMin: 30,
    type: 'study', urgency: 'moderate',
    label: 'Flashcard Drill',
    topic: 'All Critical Topics — Recall',
    subtopics: ['30 flashcards', 'Self-test only — no re-reading'],
    tool: null, method: 'recall',
    revisionStrategy: 'If you blank on a card, mark it. Review those 3 marked cards once after.',
    pyqFrequency: 0,
  },
  {
    id: 'b11',
    startTime: '7:30 AM', endTime: '8:30 AM', durationMin: 60,
    type: 'study', urgency: 'high',
    label: 'PYQ Simulation — 2023 Paper',
    topic: 'Past Year Questions (2023)',
    subtopics: ['Attempt 3 key questions timed', 'Mark scheme check', 'Note patterns'],
    tool: 'gemini', method: 'simulate',
    promptHint: '"Evaluate my PYQ answer — point out missing steps Dr. Mehta would penalize"',
    revisionStrategy: 'Simulate exam pressure. Strict 20-min per question. No hints allowed.',
    pyqFrequency: 5,
  },
  {
    id: 'b12',
    startTime: '8:30 AM', endTime: '9:30 AM', durationMin: 60,
    type: 'study', urgency: 'moderate',
    label: 'Cheat Sheet Review',
    topic: 'Formula cards + Complexity reference',
    subtopics: ['All complexities', 'Recurrence relations', 'Edge cases checklist'],
    tool: null, method: 'recall',
    revisionStrategy: 'Read once. Trust it. Stop adding new information at this stage.',
    isCheckpoint: true, checkpointLabel: 'Pre-exam prep complete ✓',
  },
  {
    id: 'b13',
    startTime: '9:30 AM', endTime: '10:00 AM', durationMin: 30,
    type: 'break', urgency: 'low',
    label: 'Travel + Mental Reset',
    topic: 'No screens. Breathe. You\'ve done the work.',
    tool: null, method: null,
    revisionStrategy: 'Confidence is a skill. You covered 85% of the syllabus. Trust the plan.',
  },
  {
    id: 'b14',
    startTime: '10:00 AM', endTime: '1:00 PM', durationMin: 180,
    type: 'exam', urgency: 'critical',
    label: '📝 EXAM — Execute',
    topic: 'Data Structures & Algorithms',
    subtopics: ['Show all working', 'Write complexity unprompted', 'Draw diagrams for BST/Graph'],
    tool: null, method: null,
    revisionStrategy: 'Attempt critical topics first. Skip low-value questions if tight on time.',
  },
]

// ── Phase groupings (for legend) ────────────────────────────
export const PHASE_LEGEND = [
  { label: 'Learn',      color: '#818CF8', count: TIMELINE_BLOCKS.filter(b => b.method === 'deep-learn').length },
  { label: 'Practice',   color: '#FBBF24', count: TIMELINE_BLOCKS.filter(b => b.method === 'practice').length },
  { label: 'Revise',     color: '#4ADE80', count: TIMELINE_BLOCKS.filter(b => b.method === 'revise' || b.method === 'recall').length },
  { label: 'Break/Sleep',color: '#3B82F6', count: TIMELINE_BLOCKS.filter(b => b.type === 'break' || b.type === 'sleep').length },
  { label: 'Exam',       color: '#F87171', count: 1 },
]

export const TOTAL_STUDY_HOURS = TIMELINE_BLOCKS.filter(b => b.type === 'study').reduce((a, b) => a + b.durationMin, 0) / 60
export const TOTAL_BREAK_HOURS = TIMELINE_BLOCKS.filter(b => b.type === 'break').reduce((a, b) => a + b.durationMin, 0) / 60
export const TOTAL_SLEEP_HOURS = TIMELINE_BLOCKS.filter(b => b.type === 'sleep').reduce((a, b) => a + b.durationMin, 0) / 60
