'use client'

import { motion } from 'framer-motion'

export default function SessionLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Soft radar pulse effect */}
      <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 bg-[#818CF8] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 bg-[#818CF8] rounded-full"
        />
        <div className="relative w-4 h-4 bg-[#818CF8] rounded-full shadow-[0_0_15px_rgba(129,140,248,0.6)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[15px] font-[500] text-[#F0EFE8] tracking-wide"
      >
        Accessing Survival Co-Pilot...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[12px] text-[#706E67] mt-2 max-w-[300px] mx-auto"
      >
        Take a deep breath. We are assembling your tools and preparing the workspace.
      </motion.p>
    </div>
  )
}
