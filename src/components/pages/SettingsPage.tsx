'use client';

import { EndlessScrollContainer } from '../EndlessScrollContainer';
import { useState } from 'react';

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const settings = [
    {
      title: "Appearance",
      options: [
        {
          label: "Dark Mode",
          value: darkMode,
          onChange: setDarkMode,
          description: "Switch between light and dark themes"
        }
      ]
    },
    {
      title: "Navigation",
      options: [
        {
          label: "Auto Scroll",
          value: autoScroll,
          onChange: setAutoScroll,
          description: "Enable automatic content scrolling"
        }
      ]
    },
    {
      title: "Experience",
      options: [
        {
          label: "Sound Effects",
          value: soundEnabled,
          onChange: setSoundEnabled,
          description: "Enable audio feedback for interactions"
        }
      ]
    },
    {
      title: "Performance",
      options: [
        {
          label: "Reduced Motion",
          value: false,
          onChange: () => {},
          description: "Minimize animations for better performance"
        }
      ]
    }
  ];

  return (
    <EndlessScrollContainer direction="vertical" speed={0.8}>
      {settings.map((section, index) => (
        <div
          key={index}
          className={`
            w-screen h-screen flex items-center justify-center
            bg-gradient-to-br from-slate-100 to-slate-200
            dark:from-slate-800 dark:to-slate-900
            relative
          `}
        >
          <div className="max-w-lg w-full mx-auto px-8">
            <h2 className="text-4xl mb-8 text-center">{section.title}</h2>
            
            <div className="space-y-6">
              {section.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl">{option.label}</h3>
                    <button
                      onClick={() => option.onChange(!option.value)}
                      className={`
                        w-12 h-6 rounded-full transition-colors duration-200
                        ${option.value ? 'bg-primary' : 'bg-gray-300'}
                        relative
                      `}
                    >
                      <div
                        className={`
                          w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200
                          ${option.value ? 'translate-x-6' : 'translate-x-0.5'}
                        `}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Settings gear background pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-20 h-20 border-2 border-current rounded-full
                  animate-spin
                `}
                style={{
                  left: `${10 + (i * 15)}%`,
                  top: `${15 + (i * 12)}%`,
                  animationDuration: `${8 + (i * 2)}s`,
                  animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                }}
              >
                <div className="absolute inset-0 border-2 border-current rounded-full scale-50" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </EndlessScrollContainer>
  );
}