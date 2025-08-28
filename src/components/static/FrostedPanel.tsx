'use client';

import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface FrostedPanelProps {
  /** Optional additional class names */
  className?: string;
  /** Panel content */
  children: ReactNode;
}

/**
 * FrostedPanel renders a translucent, blurred container
 * used for overlay navigation and other floating UI elements.
 */
export function FrostedPanel({ className, children }: FrostedPanelProps) {
  return (
    <div
      className={cn(
        'bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10',
        className
      )}
    >
      {children}
    </div>
  );
}
