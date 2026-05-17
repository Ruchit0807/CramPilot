// ============================================================
// CramPilot — Mock PYQ Analysis & Roadmaps
// Realistic PYQ data for Corporate Law (demo)
// ============================================================

import type { PYQAnalysis, StudyRoadmap } from '@/types'

export const MOCK_PYQ_ANALYSIS: PYQAnalysis = {
  sessionId: 'session_demo_cl_001',
  papersAnalyzed: 4,
  yearsRange: '2020–2023',
  frequencyTable: [
    { topic: 'Contract Formation & Essential Elements', appearances: 4, years: ['2020', '2021', '2022', '2023'], probability: 98 },
    { topic: 'Breach of Contract & Remedies', appearances: 4, years: ['2020', '2021', '2022', '2023'], probability: 95 },
    { topic: "Directors' Fiduciary Duties", appearances: 3, years: ['2021', '2022', '2023'], probability: 85 },
    { topic: 'Company Formation & Types', appearances: 3, years: ['2020', '2021', '2022'], probability: 78 },
    { topic: 'Shareholder Rights & Meetings', appearances: 2, years: ['2021', '2023'], probability: 55 },
    { topic: 'Tortious Liability', appearances: 1, years: ['2020'], probability: 30 },
    { topic: 'Quasi-Contracts (Sections 68–72)', appearances: 0, years: [], probability: 5 },
    { topic: 'Historical Development of Company Law', appearances: 0, years: [], probability: 3 },
    { topic: 'Comparative International Company Law', appearances: 0, years: [], probability: 2 },
  ],
  topPredictions: [
    {
      id: 'pred_01',
      question: 'Explain the essential elements of a valid contract with reference to the Indian Contract Act.',
      probability: 'high',
      stars: 3,
      appearedYears: ['2021', '2022', '2023'],
      estimatedPrepMinutes: 45,
      topicId: 'topic_cl_01',
      isPaid: false,
    },
    {
      id: 'pred_02',
      question: "Analyze the fiduciary duties of company directors with reference to relevant case law.",
      probability: 'high',
      stars: 3,
      appearedYears: ['2021', '2022', '2023'],
      estimatedPrepMinutes: 40,
      topicId: 'topic_cl_03',
      isPaid: false,
    },
    {
      id: 'pred_03',
      question: 'Distinguish between void, voidable, and unenforceable contracts with examples.',
      probability: 'moderate',
      stars: 2,
      appearedYears: ['2021', '2022'],
      estimatedPrepMinutes: 30,
      topicId: 'topic_cl_01',
      isPaid: false,
    },
    {
      id: 'pred_04',
      question: 'What are the remedies available for breach of contract? Explain with case illustrations.',
      probability: 'high',
      stars: 3,
      appearedYears: ['2020', '2021', '2022', '2023'],
      estimatedPrepMinutes: 40,
      topicId: 'topic_cl_02',
      isPaid: true,
    },
    {
      id: 'pred_05',
      question: 'Explain the different types of companies under the Companies Act 2013.',
      probability: 'moderate',
      stars: 2,
      appearedYears: ['2020', '2021'],
      estimatedPrepMinutes: 30,
      topicId: 'topic_cl_04',
      isPaid: true,
    },
  ],
  safeToSkip: [
    'Quasi-Contracts (Sections 68–72)',
    'Historical Development of Company Law',
    'Comparative International Company Law',
    'Pre-Independence Case Law',
  ],
  patternSummary:
    'This professor consistently tests Contract Formation and Director Duties across all 4 years analyzed. The 10-mark essay format dominates — preparation should focus on structured, definition-led answers with case law citations. Quasi-Contracts and historical topics have never appeared and can be safely skipped.',
  confidence: 78,
  analyzedAt: new Date(),
}

export const MOCK_ROADMAP: StudyRoadmap = {
  sessionId: 'session_demo_cl_001',
  emergencyLevel: 'medium',
  totalHours: 18,
  examDatetime: new Date(Date.now() + 18 * 3600000).toISOString(),
  startDatetime: new Date().toISOString(),
  days: [
    {
      label: 'today',
      date: new Date().toISOString(),
      blocks: [
        {
          id: 'b_01', order: 1,
          startTime: '09:00 PM', endTime: '09:45 PM', durationMinutes: 45,
          type: 'study', phase: 'coverage', topicName: 'Contract Formation & Essential Elements',
          topicPriority: 'critical', taskType: 'concept-load', toolRecommended: 'chatgpt',
          isCompleted: false, icon: 'BookOpen', label: 'Contract Formation — Concept Load',
          promptId: 'CL-001',
        },
        {
          id: 'b_02', order: 2,
          startTime: '09:45 PM', endTime: '10:15 PM', durationMinutes: 30,
          type: 'study', phase: 'coverage', topicName: 'Contract Formation & Essential Elements',
          topicPriority: 'critical', taskType: 'deep-understanding', toolRecommended: 'claude',
          isCompleted: false, icon: 'Brain', label: 'Contract Formation — Deep Understanding',
        },
        {
          id: 'b_03', order: 3,
          startTime: '10:15 PM', endTime: '10:35 PM', durationMinutes: 20,
          type: 'study', phase: 'coverage', topicName: 'Contract Formation & Essential Elements',
          topicPriority: 'critical', taskType: 'practice-questions', toolRecommended: 'chatgpt',
          isCompleted: false, icon: 'PenLine', label: 'Contract Formation — Practice Qs',
          promptId: 'CL-002',
        },
        {
          id: 'b_break_01', order: 4,
          startTime: '10:35 PM', endTime: '10:45 PM', durationMinutes: 10,
          type: 'break', isCompleted: false, icon: 'Coffee', label: 'Short Break',
        },
        {
          id: 'b_04', order: 5,
          startTime: '10:45 PM', endTime: '11:30 PM', durationMinutes: 45,
          type: 'study', phase: 'coverage', topicName: 'Breach of Contract & Remedies',
          topicPriority: 'critical', taskType: 'concept-load', toolRecommended: 'chatgpt',
          isCompleted: false, icon: 'BookOpen', label: 'Breach & Remedies — Concept Load',
        },
        {
          id: 'b_05', order: 6,
          startTime: '11:30 PM', endTime: '12:00 AM', durationMinutes: 30,
          type: 'study', phase: 'coverage', topicName: 'Breach of Contract & Remedies',
          topicPriority: 'critical', taskType: 'answer-framework', toolRecommended: 'claude',
          isCompleted: false, icon: 'FileText', label: 'Breach — Answer Framework',
          promptId: 'CL-003',
        },
        {
          id: 'b_stop', order: 7,
          startTime: '02:30 AM', endTime: '02:30 AM', durationMinutes: 0,
          type: 'stop', isCompleted: false, icon: 'Moon',
          label: 'Stop studying. Sleep now.',
        },
      ],
      totalStudyMinutes: 170,
      totalBreakMinutes: 10,
      topicsCovered: ['Contract Formation & Essential Elements', 'Breach of Contract & Remedies'],
    },
    {
      label: 'exam-day',
      date: new Date(Date.now() + 86400000).toISOString(),
      blocks: [
        {
          id: 'b_exam_01', order: 8,
          startTime: '08:00 AM', endTime: '08:10 AM', durationMinutes: 10,
          type: 'study', topicName: undefined, taskType: 'last-minute-summary', toolRecommended: 'chatgpt',
          isCompleted: false, icon: 'Zap', label: 'Final 10-min flash review',
          promptId: 'CL-005',
        },
        {
          id: 'b_exam', order: 9,
          startTime: '09:30 AM', endTime: '12:30 PM', durationMinutes: 180,
          type: 'exam-day', isCompleted: false, icon: 'GraduationCap',
          label: 'Exam time. Arrive early. You\'re prepared.',
        },
      ],
      totalStudyMinutes: 10,
      totalBreakMinutes: 0,
      topicsCovered: [],
    },
  ],
  skipList: [
    'Historical Development of Company Law',
    'Comparative International Company Law',
    'Pre-Independence Case Law',
  ],
  criticalPath: ['topic_cl_01', 'topic_cl_02', 'topic_cl_03'],
  estimatedCoveragePercent: 85,
  timeCalculation: {
    hoursAvailable: 18,
    criticalTopicCount: 3,
    hoursPerTopic: 3,
    message: 'You have 18 hours and 3 critical topics — that\'s 3h per topic. This plan is achievable.',
  },
  generatedAt: new Date(),
}
