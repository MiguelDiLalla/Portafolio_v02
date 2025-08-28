'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../contexts/UIContext';
import { MiniNav } from './components/MiniNav';

/**
 * AltFrame renders a full-screen overlay for detailed content.
 * It appears above the ring interface with a mini navigation bar.
 */
export function AltFrame() {
  const { isAltFrameActive, altContent, closeAltFrame } = useUI();
  const frameRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isAltFrameActive) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusableSelectors =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      const frame = frameRef.current;
      if (!frame) return;

      if (e.key === 'Tab') {
        const focusable = Array.from(
          frame.querySelectorAll<HTMLElement>(focusableSelectors)
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeAltFrame();
      }
    };

    const frame = frameRef.current;
    const focusable = frame?.querySelectorAll<HTMLElement>(focusableSelectors);
    focusable && focusable[0]?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isAltFrameActive, closeAltFrame]);

  return (
    <AnimatePresence>
      {isAltFrameActive && (
        <motion.div
          ref={frameRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
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
