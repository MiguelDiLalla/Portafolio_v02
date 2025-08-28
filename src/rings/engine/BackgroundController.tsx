'use client';

import { ReactNode } from 'react';
import { useRings } from '../../contexts/RingsContext';

/**
 * BackgroundController renders a full-viewport background based on the active ring.
 */
export function BackgroundController(): ReactNode {
  const { activeRing } = useRings();
  const spec = activeRing?.background;

  if (!spec) return null;

  const baseClass = 'fixed inset-0 -z-10 pointer-events-none';

  switch (spec.mode) {
    case 'color': {
      const color = spec.config?.color ?? '#000';
      return <div className={baseClass} style={{ backgroundColor: color }} />;
    }
    case 'gradient': {
      const { from = '#000', to = '#fff', angle = 0 } = spec.config || {};
      const background = `linear-gradient(${angle}deg, ${from}, ${to})`;
      return <div className={baseClass} style={{ background }} />;
    }
    default:
      return <div className={baseClass} />;
  }
}
