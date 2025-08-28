'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ringsData from '../rings/config/rings.json';

interface BackgroundSpec {
  mode: 'color' | 'gradient' | 'image' | 'video' | 'shader' | 'react';
  followsIndex?: boolean;
  config: any;
}

interface RingConfig {
  id: string;
  name?: string;
  background?: BackgroundSpec;
}

interface RingsContextValue {
  activeRingId: string;
  setActiveRingId: (id: string) => void;
  activeRing: RingConfig | undefined;
  rings: Record<string, RingConfig>;
  ringIndexProgress: number;
  setRingIndexProgress: (p: number) => void;
}

const RingsContext = createContext<RingsContextValue | undefined>(undefined);

interface RingsProviderProps {
  children: ReactNode;
}

/**
 * RingsProvider supplies ring configuration and active ring state.
 */
export function RingsProvider({ children }: RingsProviderProps) {
  const ringOrder: string[] = (ringsData as any).ringOrder;
  const rings: Record<string, RingConfig> = (ringsData as any).rings;

  const [activeRingId, setActiveRingId] = useState(ringOrder[0]);
  const [ringIndexProgress, setRingIndexProgress] = useState(0);

  const activeRing = rings[activeRingId];

  return (
    <RingsContext.Provider
      value={{
        activeRingId,
        setActiveRingId,
        activeRing,
        rings,
        ringIndexProgress,
        setRingIndexProgress,
      }}
    >
      {children}
    </RingsContext.Provider>
  );
}

/**
 * Hook to access ring configuration and state.
 */
export function useRings() {
  const context = useContext(RingsContext);
  if (!context) {
    throw new Error('useRings must be used within a RingsProvider');
  }
  return context;
}
