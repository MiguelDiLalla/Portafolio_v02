'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AltContent {
  /** Optional type identifier for routing different content components */
  type?: string;
  /** Optional title displayed in AltFrame's navigation */
  title?: string;
  /** React node rendered inside the AltFrame */
  node: ReactNode;
}

interface UIContextValue {
  isAltFrameActive: boolean;
  altContent: AltContent | null;
  /** Open the AltFrame with provided content */
  openAltFrame: (content: AltContent) => void;
  closeAltFrame: () => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

/**
 * UIProvider manages global UI state such as AltFrame visibility.
 */
export function UIProvider({ children }: UIProviderProps) {
  const [isAltFrameActive, setAltFrameActive] = useState(false);
  const [altContent, setAltContent] = useState<AltContent | null>(null);

  const openAltFrame = (content: AltContent) => {
    setAltContent(content);
    setAltFrameActive(true);
  };

  const closeAltFrame = () => {
    setAltFrameActive(false);
    setAltContent(null);
  };

  return (
    <UIContext.Provider
      value={{ isAltFrameActive, altContent, openAltFrame, closeAltFrame }}
    >
      {children}
    </UIContext.Provider>
  );
}

/**
 * Hook to access global UI state.
 */
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
