'use client';

import { ArrowLeft } from 'lucide-react';
import { FrostedPanel } from '../../components/static/FrostedPanel';
import { useUI } from '../../contexts/UIContext';

interface MiniNavProps {
  /** Optional title displayed next to the back button */
  title?: string;
}

/**
 * MiniNav provides a compact navigation bar for AltFrame
 * with a back button to exit the frame.
 */
export function MiniNav({ title }: MiniNavProps) {
  const { closeAltFrame } = useUI();

  return (
    <FrostedPanel className="flex items-center gap-2 p-4 h-14">
      <button

        onClick={closeAltFrame}
        className="flex items-center gap-1 text-sm"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
      {title && <span className="ml-2 text-sm font-medium">{title}</span>}
    </FrostedPanel>
  );
}
