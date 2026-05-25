'use client'

import { motion } from 'framer-motion'

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-2 border-[rgba(129,140,248,0.2)] border-t-[#818CF8] rounded-full mb-6"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[14px] font-[500] text-[#F0EFE8] tracking-wide"
      >
        Initializing Command Center...
      </motion.p>
      <p className="text-[12px] text-[#706E67] mt-2 max-w-[280px]">
        Loading your local strategy persistence and past session history.
      </p>
    </div>
  )
}
