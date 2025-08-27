'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../contexts/UIContext';
import { MiniNav } from './components/MiniNav';

/**
 * AltFrame renders a full-screen overlay for detailed content.
 * It appears above the ring interface with a mini navigation bar.
 */
export function AltFrame() {
  const { isAltFrameActive, altContent } = useUI();

  return (
    <AnimatePresence>
      {isAltFrameActive && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          <MiniNav title={altContent?.title} />
          <div className="flex-1 overflow-auto p-6">
            {altContent?.node ?? 'Content goes here...'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
