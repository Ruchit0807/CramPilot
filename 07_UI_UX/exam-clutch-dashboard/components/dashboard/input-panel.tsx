'use client'
// ============================================================
// CramPilot — Input Panel
// The 6 data-collection cards in the dashboard main column
// ============================================================

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  BarChart3,
  Search,
  Clock,
  Target,
  AlertTriangle,
  Upload,
  FileText,
  X,
  Plus,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'

// ── Types ────────────────────────────────────────────────────
interface InputPanelState {
  subject: string
  subjectCategory: string
  hoursRemaining: number | ''
  targetMarks: string
  weakTopics: string[]
  syllabusFile: File | null
  pyqFile: File | null
  professorName: string
  professorPatterns: string[]
}

interface InputPanelProps {
  value: InputPanelState
  onChange: (val: Partial<InputPanelState>) => void
}

// ── Popular subjects quick-select ────────────────────────────
const POPULAR_SUBJECTS = [
  'Organic Chemistry',
  'Data Structures',
  'Linear Algebra',
  'Thermodynamics',
  'Microeconomics',
  'Cell Biology',
  'Digital Electronics',
  'Fluid Mechanics',
]

// ── Target marks options ─────────────────────────────────────
const MARKS_OPTIONS = [
  { label: 'Just Pass', value: 'pass', desc: '≥ 40%', color: '#F87171' },
  { label: 'Decent', value: 'decent', desc: '60–70%', color: '#FBBF24' },
  { label: 'High Score', value: 'high', desc: '75–85%', color: '#818CF8' },
  { label: 'Full Marks', value: 'full', desc: '90%+', color: '#4ADE80' },
]

// ── Subject Categories ───────────────────────────────────────
const CATEGORY_OPTIONS = [
  { label: 'Derivation Heavy', value: 'derivation-heavy', desc: 'Proofs & theorems', color: '#F87171' },
  { label: 'Numerical Heavy', value: 'numerical-heavy', desc: 'Math & calculations', color: '#FBBF24' },
  { label: 'Conceptual', value: 'conceptual', desc: 'Core logic & theory', color: '#818CF8' },
  { label: 'Memorization', value: 'memorization-heavy', desc: 'Facts & definitions', color: '#4ADE80' },
  { label: 'Mixed', value: 'mixed', desc: 'Balanced topics', color: '#A78BFA' },
]

// ── Hours urgency mapping ────────────────────────────────────
function getUrgencyColor(hours: number | '') {
  if (hours === '') return '#706E67'
  if (hours <= 12) return '#F87171'
  if (hours <= 24) return '#FBBF24'
  if (hours <= 48) return '#818CF8'
  return '#4ADE80'
}

function getUrgencyLabel(hours: number | '') {
  if (hours === '') return ''
  if (hours <= 12) return 'CRITICAL'
  if (hours <= 24) return 'URGENT'
  if (hours <= 48) return 'MODERATE'
  return 'COMFORTABLE'
}

// ── Card Wrapper ─────────────────────────────────────────────
function InputCard({
  children,
  className,
  glowColor,
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        'relative rounded-xl border border-[rgba(255,255,255,0.07)] overflow-hidden',
        'bg-[rgba(28,28,26,0.8)] backdrop-blur-sm transition-all duration-200',
        'hover:border-[rgba(255,255,255,0.14)]',
        className
      )}
      style={{
        boxShadow: hovered && glowColor
          ? `0 0 0 1px ${glowColor}20, 0 8px 32px ${glowColor}08`
          : undefined,
      }}
    >
      {/* Subtle gradient overlay */}
      {hovered && glowColor && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-300"
          style={{ background: `radial-gradient(ellipse at top left, ${glowColor} 0%, transparent 70%)` }}
        />
      )}
      <div className="relative p-5">{children}</div>
    </motion.div>
  )
}

// ── Card Icon Badge ──────────────────────────────────────────
function IconBadge({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: `${color}14`, border: `1px solid ${color}28` }}
    >
      <Icon className="w-4 h-4" style={{ color }} />
    </div>
  )
}

// ── 1. Subject Card ──────────────────────────────────────────
function SubjectCard({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const filtered = POPULAR_SUBJECTS.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <InputCard glowColor="#818CF8">
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={BookOpen} color="#818CF8" />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Subject</h3>
          <p className="text-[12px] text-[#706E67]">What exam are you preparing for?</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#706E67] pointer-events-none" />
        <input
          id="input-subject"
          type="text"
          placeholder="e.g., Organic Chemistry, DBMS..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className={cn(
            'w-full h-11 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] rounded-lg',
            'pl-10 pr-4 text-[14px] text-[#F0EFE8] placeholder:text-[#706E67]',
            'focus:outline-none focus:border-[rgba(129,140,248,0.5)] focus:ring-1 focus:ring-[rgba(129,140,248,0.2)]',
            'transition-all duration-150'
          )}
        />
        <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[rgba(129,140,248,0.4)]" />
      </div>

      {/* Dropdown suggestions */}
      {showSuggestions && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 bg-[#1C1C1A] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden shadow-xl z-10"
        >
          {filtered.slice(0, 5).map((s) => (
            <button
              key={s}
              onMouseDown={() => onChange(s)}
              className="w-full px-4 py-2.5 text-[13px] text-[#9E9C96] hover:text-[#F0EFE8] hover:bg-[rgba(129,140,248,0.08)] text-left transition-colors"
            >
              {s}
            </button>
          ))}
        </motion.div>
      )}

      {/* Quick pills */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {POPULAR_SUBJECTS.slice(0, 5).map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={cn(
              'text-[11px] px-2.5 py-1 rounded-full border transition-all',
              value === s
                ? 'bg-[rgba(129,140,248,0.15)] border-[rgba(129,140,248,0.35)] text-[#818CF8]'
                : 'bg-transparent border-[rgba(255,255,255,0.07)] text-[#706E67] hover:border-[rgba(255,255,255,0.14)] hover:text-[#9E9C96]'
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </InputCard>
  )
}

// ── 1.5 Subject Category Card ────────────────────────────────
function SubjectCategoryCard({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <InputCard glowColor="#A78BFA">
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={BookOpen} color="#A78BFA" />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Subject Type</h3>
          <p className="text-[12px] text-[#706E67]">What kind of exam is it?</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative p-2.5 rounded-lg border text-left transition-all duration-150',
              value === opt.value
                ? 'border-current'
                : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]'
            )}
            style={
              value === opt.value
                ? {
                    borderColor: `${opt.color}50`,
                    background: `${opt.color}0C`,
                    boxShadow: `0 0 0 1px ${opt.color}20`,
                  }
                : {}
            }
          >
            <p
              className="text-[12px] font-[500]"
              style={{ color: value === opt.value ? opt.color : '#9E9C96' }}
            >
              {opt.label}
            </p>
            <p className="text-[10px] text-[#706E67] mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>
    </InputCard>
  )
}

// ── 2. Hours Remaining Card ──────────────────────────────────
function HoursCard({
  value,
  onChange,
}: {
  value: number | ''
  onChange: (v: number | '') => void
}) {
  const urgencyColor = getUrgencyColor(value)
  const urgencyLabel = getUrgencyLabel(value)

  const PRESETS = [6, 12, 24, 48, 72]

  return (
    <InputCard glowColor={urgencyColor}>
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={Clock} color={urgencyColor} />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Hours Remaining</h3>
          <p className="text-[12px] text-[#706E67]">Time until your exam</p>
        </div>
        {urgencyLabel && (
          <span
            className="ml-auto text-[10px] font-[700] px-2 py-0.5 rounded-sm tracking-wider"
            style={{
              color: urgencyColor,
              background: `${urgencyColor}15`,
              border: `1px solid ${urgencyColor}30`,
            }}
          >
            {urgencyLabel}
          </span>
        )}
      </div>

      {/* Big number input */}
      <div className="flex items-center gap-3 mb-4">
        <input
          id="input-hours"
          type="number"
          min={1}
          max={999}
          placeholder="24"
          value={value}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
          className={cn(
            'w-24 h-12 bg-[rgba(255,255,255,0.04)] border rounded-lg',
            'text-center text-[24px] font-[500] placeholder:text-[#706E67]',
            'focus:outline-none transition-all duration-150',
            'text-[#F0EFE8]'
          )}
          style={{
            borderColor: value !== '' ? `${urgencyColor}40` : 'rgba(255,255,255,0.09)',
          }}
        />
        <span className="text-[14px] text-[#706E67]">hours left</span>
      </div>

      {/* Progress bar */}
      {value !== '' && (
        <div className="mb-4">
          <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (Number(value) / 72) * 100)}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: urgencyColor }}
            />
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="flex gap-2">
        {PRESETS.map((h) => (
          <button
            key={h}
            onClick={() => onChange(h)}
            className={cn(
              'flex-1 h-8 rounded text-[12px] font-[500] border transition-all',
              value === h
                ? 'text-[#F0EFE8] border-current'
                : 'text-[#706E67] border-[rgba(255,255,255,0.08)] hover:text-[#9E9C96] hover:border-[rgba(255,255,255,0.15)]'
            )}
            style={
              value === h
                ? { color: urgencyColor, borderColor: `${urgencyColor}50`, background: `${urgencyColor}10` }
                : {}
            }
          >
            {h}h
          </button>
        ))}
      </div>
    </InputCard>
  )
}

// ── 3. Target Marks Card ─────────────────────────────────────
function TargetMarksCard({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <InputCard glowColor="#4ADE80">
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={Target} color="#4ADE80" />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Target Marks</h3>
          <p className="text-[12px] text-[#706E67]">What score are you aiming for?</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {MARKS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`target-${opt.value}`}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative p-3 rounded-lg border text-left transition-all duration-150 group',
              value === opt.value
                ? 'border-current'
                : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]'
            )}
            style={
              value === opt.value
                ? {
                    borderColor: `${opt.color}50`,
                    background: `${opt.color}0C`,
                    boxShadow: `0 0 0 1px ${opt.color}20`,
                  }
                : {}
            }
          >
            <p
              className="text-[13px] font-[500]"
              style={{ color: value === opt.value ? opt.color : '#9E9C96' }}
            >
              {opt.label}
            </p>
            <p className="text-[11px] text-[#706E67] mt-0.5">{opt.desc}</p>
            {value === opt.value && (
              <motion.div
                layoutId="marks-indicator"
                className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full"
                style={{ background: opt.color }}
              />
            )}
          </button>
        ))}
      </div>
    </InputCard>
  )
}

// ── 4. Weak Topics Card ──────────────────────────────────────
function WeakTopicsCard({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const [input, setInput] = useState('')

  const addTopic = () => {
    const trimmed = input.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
      setInput('')
    }
  }

  const removeTopic = (t: string) => onChange(value.filter((v) => v !== t))

  return (
    <InputCard glowColor="#F87171">
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={AlertTriangle} color="#F87171" />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">Weak Topics</h3>
          <p className="text-[12px] text-[#706E67]">Topics you struggle with most</p>
        </div>
        {value.length > 0 && (
          <span className="ml-auto text-[11px] font-[600] px-2 py-0.5 rounded bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.25)]">
            {value.length} added
          </span>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-3">
        <input
          id="input-weak-topic"
          type="text"
          placeholder="Add a weak topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTopic()}
          className={cn(
            'flex-1 h-10 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] rounded-lg',
            'px-3 text-[13px] text-[#F0EFE8] placeholder:text-[#706E67]',
            'focus:outline-none focus:border-[rgba(248,113,113,0.4)] transition-all duration-150'
          )}
        />
        <button
          onClick={addTopic}
          className="w-10 h-10 rounded-lg bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#F87171] hover:bg-[rgba(248,113,113,0.18)] transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((topic) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-full bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#F87171]"
            >
              {topic}
              <button
                onClick={() => removeTopic(topic)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <p className="text-[12px] text-[#706E67] italic">
          Press Enter to add topics (e.g., "Fourier Series", "Thermodynamic Cycles")
        </p>
      )}
    </InputCard>
  )
}

// ── 5 & 6. File Upload Card ──────────────────────────────────
function FileUploadCard({
  id,
  label,
  description,
  accept,
  icon: Icon,
  color,
  file,
  onChange,
}: {
  id: string
  label: string
  description: string
  accept: string
  icon: React.ElementType
  color: string
  file: File | null
  onChange: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const dropped = e.dataTransfer.files[0]
      if (dropped) onChange(dropped)
    },
    [onChange]
  )

  return (
    <InputCard glowColor={color}>
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={Icon} color={color} />
        <div>
          <h3 className="text-[14px] font-[500] text-[#F0EFE8]">{label}</h3>
          <p className="text-[12px] text-[#706E67]">{description}</p>
        </div>
        {file && (
          <button
            onClick={() => onChange(null)}
            className="ml-auto text-[#706E67] hover:text-[#F87171] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {file ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ background: `${color}0C`, border: `1px solid ${color}25` }}
        >
          <FileText className="w-5 h-5 shrink-0" style={{ color }} />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-[500] truncate" style={{ color }}>
              {file.name}
            </p>
            <p className="text-[11px] text-[#706E67]">
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </motion.div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center gap-2 h-24 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-150',
            isDragging
              ? 'border-current bg-current/5'
              : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.02)]'
          )}
          style={isDragging ? { borderColor: `${color}60`, background: `${color}06` } : {}}
        >
          <Upload className="w-5 h-5 text-[#706E67]" />
          <p className="text-[12px] text-[#706E67]">
            <span className="text-[#9E9C96] font-[500]">Click to upload</span> or drag & drop
          </p>
          <p className="text-[11px] text-[#706E67]">PDF, PNG, JPG (max 10MB)</p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </InputCard>
  )
}

// ── Main Export ──────────────────────────────────────────────
export function InputPanel({ value, onChange }: InputPanelProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 gap-3"
    >
      <SubjectCard value={value.subject} onChange={(v) => onChange({ subject: v })} />
      <SubjectCategoryCard value={value.subjectCategory} onChange={(v) => onChange({ subjectCategory: v })} />
      <HoursCard value={value.hoursRemaining} onChange={(v) => onChange({ hoursRemaining: v })} />
      <TargetMarksCard value={value.targetMarks} onChange={(v) => onChange({ targetMarks: v })} />
      <WeakTopicsCard value={value.weakTopics} onChange={(v) => onChange({ weakTopics: v })} />
      <FileUploadCard
        id="upload-syllabus"
        label="Syllabus Upload"
        description="Upload your course syllabus for AI analysis"
        accept=".pdf,.png,.jpg,.jpeg"
        icon={FileText}
        color="#818CF8"
        file={value.syllabusFile}
        onChange={(f) => onChange({ syllabusFile: f })}
      />
      <FileUploadCard
        id="upload-pyq"
        label="PYQ Upload"
        description="Past year question papers for pattern analysis"
        accept=".pdf,.png,.jpg,.jpeg"
        icon={BarChart3}
        color="#FBBF24"
        file={value.pyqFile}
        onChange={(f) => onChange({ pyqFile: f })}
      />
    </motion.div>
  )
}

export type { InputPanelState }
