'use client';

import { useState, useEffect } from 'react';
import { FloatingNavigation } from './components/FloatingNavigation';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { WorkPage } from './components/pages/WorkPage';
import { ContactPage } from './components/pages/ContactPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { AltFrame } from './frames/AltFrame';
import { useUI } from './contexts/UIContext';
import { BackgroundController } from './rings/engine/BackgroundController';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const { isAltFrameActive } = useUI();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'work':
        return <WorkPage />;
      case 'contact':
        return <ContactPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="w-screen h-screen bg-background text-foreground overflow-hidden relative">
      <BackgroundController />
      {/* Main content area - no padding so content flows behind navigation */}
      <main className="w-full h-full relative">{renderCurrentPage()}</main>

      {/* Floating Navigation */}
      {!isAltFrameActive && (
        <FloatingNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}

      {/* Background grain effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Instructions overlay for first-time users */}
      {!isAltFrameActive && (
        <div className="fixed top-4 right-4 max-w-sm p-4 bg-black/50 backdrop-blur-sm rounded-xl text-white text-sm opacity-80 pointer-events-none">
          <p className="mb-2">
            {isMobile
              ? '👆 Swipe to navigate • Navigation at bottom'
              : '🖱️ Scroll or drag to navigate • Navigation on left'}
          </p>
          <p className="text-xs opacity-70">
            Experience endless scrolling with seamless loops
          </p>
        </div>
      )}

      {/* AltFrame overlay */}
      <AltFrame />
    </div>
  );
}
