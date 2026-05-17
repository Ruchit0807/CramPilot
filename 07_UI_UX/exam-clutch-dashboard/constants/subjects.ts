// ============================================================
// CramPilot — Subject Constants
// Pre-defined subjects with metadata for autocomplete
// ============================================================

export type SubjectDomain =
  | 'law'
  | 'engineering'
  | 'medicine'
  | 'commerce'
  | 'arts'
  | 'science'
  | 'management'

export interface SubjectOption {
  id: string
  name: string
  domain: SubjectDomain
  commonTopicCount: number   // typical syllabus size
  avgHoursForMVP: number     // average hours needed to cover critical content
  tags: string[]
}

export const SUBJECT_OPTIONS: SubjectOption[] = [
  // Law
  { id: 'corporate-law', name: 'Corporate Law', domain: 'law', commonTopicCount: 14, avgHoursForMVP: 20, tags: ['LLB', 'Law', 'Companies Act'] },
  { id: 'contract-law', name: 'Contract Law', domain: 'law', commonTopicCount: 10, avgHoursForMVP: 16, tags: ['LLB', 'Law', 'Indian Contract Act'] },
  { id: 'constitutional-law', name: 'Constitutional Law', domain: 'law', commonTopicCount: 16, avgHoursForMVP: 24, tags: ['LLB', 'Law', 'Constitution'] },
  { id: 'criminal-law', name: 'Criminal Law', domain: 'law', commonTopicCount: 12, avgHoursForMVP: 18, tags: ['LLB', 'Law', 'IPC'] },
  { id: 'tort-law', name: 'Law of Torts', domain: 'law', commonTopicCount: 10, avgHoursForMVP: 15, tags: ['LLB', 'Law'] },

  // Engineering
  { id: 'thermodynamics', name: 'Thermodynamics', domain: 'engineering', commonTopicCount: 12, avgHoursForMVP: 18, tags: ['Mech', 'Engineering'] },
  { id: 'data-structures', name: 'Data Structures & Algorithms', domain: 'engineering', commonTopicCount: 14, avgHoursForMVP: 20, tags: ['CS', 'IT', 'Engineering'] },
  { id: 'dbms', name: 'Database Management Systems', domain: 'engineering', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['CS', 'IT'] },
  { id: 'os', name: 'Operating Systems', domain: 'engineering', commonTopicCount: 12, avgHoursForMVP: 16, tags: ['CS', 'IT'] },
  { id: 'cn', name: 'Computer Networks', domain: 'engineering', commonTopicCount: 12, avgHoursForMVP: 16, tags: ['CS', 'IT'] },
  { id: 'digital-circuits', name: 'Digital Circuits & Logic Design', domain: 'engineering', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['ECE', 'EE'] },
  { id: 'signals', name: 'Signals & Systems', domain: 'engineering', commonTopicCount: 10, avgHoursForMVP: 16, tags: ['ECE', 'EE'] },

  // Commerce
  { id: 'financial-accounting', name: 'Financial Accounting', domain: 'commerce', commonTopicCount: 12, avgHoursForMVP: 16, tags: ['B.Com', 'CA', 'Finance'] },
  { id: 'macroeconomics', name: 'Macroeconomics', domain: 'commerce', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['Economics', 'B.Com', 'BA'] },
  { id: 'microeconomics', name: 'Microeconomics', domain: 'commerce', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['Economics', 'B.Com', 'BA'] },
  { id: 'business-law', name: 'Business Law', domain: 'commerce', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['B.Com', 'BBA'] },
  { id: 'cost-accounting', name: 'Cost Accounting', domain: 'commerce', commonTopicCount: 10, avgHoursForMVP: 16, tags: ['B.Com', 'CA'] },

  // Management
  { id: 'marketing-management', name: 'Marketing Management', domain: 'management', commonTopicCount: 10, avgHoursForMVP: 14, tags: ['MBA', 'BBA'] },
  { id: 'hrm', name: 'Human Resource Management', domain: 'management', commonTopicCount: 10, avgHoursForMVP: 12, tags: ['MBA', 'BBA'] },
  { id: 'ob', name: 'Organizational Behaviour', domain: 'management', commonTopicCount: 10, avgHoursForMVP: 12, tags: ['MBA', 'BBA'] },
  { id: 'strategic-management', name: 'Strategic Management', domain: 'management', commonTopicCount: 8, avgHoursForMVP: 12, tags: ['MBA'] },

  // Science
  { id: 'organic-chemistry', name: 'Organic Chemistry', domain: 'science', commonTopicCount: 14, avgHoursForMVP: 20, tags: ['BSc', 'Chemistry'] },
  { id: 'quantum-mechanics', name: 'Quantum Mechanics', domain: 'science', commonTopicCount: 10, avgHoursForMVP: 18, tags: ['BSc', 'Physics'] },
  { id: 'microbiology', name: 'Microbiology', domain: 'science', commonTopicCount: 12, avgHoursForMVP: 16, tags: ['BSc', 'Biology', 'MBBS'] },

  // Medicine
  { id: 'anatomy', name: 'Anatomy', domain: 'medicine', commonTopicCount: 20, avgHoursForMVP: 30, tags: ['MBBS', 'Medicine'] },
  { id: 'physiology', name: 'Physiology', domain: 'medicine', commonTopicCount: 18, avgHoursForMVP: 28, tags: ['MBBS', 'Medicine'] },
  { id: 'pharmacology', name: 'Pharmacology', domain: 'medicine', commonTopicCount: 16, avgHoursForMVP: 24, tags: ['MBBS', 'Medicine'] },
]

export const SUBJECT_DOMAINS: Record<SubjectDomain, { label: string; color: string }> = {
  law: { label: 'Law', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  engineering: { label: 'Engineering', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  medicine: { label: 'Medicine', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  commerce: { label: 'Commerce', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  arts: { label: 'Arts', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  science: { label: 'Science', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  management: { label: 'Management', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
}
