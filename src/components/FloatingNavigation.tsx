'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, User, Briefcase, Mail, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function FloatingNavigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      className={`
        fixed z-50 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-2xl
        shadow-xl shadow-black/10
        ${isMobile 
          ? 'bottom-6 left-1/2 -translate-x-1/2 px-6 py-4' 
          : 'left-6 top-1/2 -translate-y-1/2 px-4 py-8'
        }
      `}
      style={{
        backgroundColor: isMobile 
          ? 'rgba(245, 227, 66, 0.3)' 
          : 'rgba(245, 227, 66, 0.25)'
      }}
    >
      <div className={`
        flex gap-4
        ${isMobile ? 'flex-row items-center' : 'flex-col items-center'}
      `}>
        {/* Navigation Icons */}
        <div className={`
          flex gap-3
          ${isMobile ? 'flex-row' : 'flex-col'}
        `}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative p-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-white/40 dark:bg-white/20 text-primary' 
                    : 'hover:bg-white/30 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground'
                  }
                  ${isMobile ? 'p-3' : 'p-4'}
                `}
              >
                <Icon size={isMobile ? 22 : 26} />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`
                      absolute bg-primary rounded-full
                      ${isMobile 
                        ? 'bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5' 
                        : 'right-0 top-1/2 -translate-y-1/2 w-1.5 h-8'
                      }
                    `}
                  />
                )}

                {/* Tooltip for desktop */}
                {!isMobile && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-black/80 text-white rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Name section - only on desktop or as separate element on mobile */}
        {!isMobile && (
          <div className="border-t border-white/20 pt-6 mt-4 text-center">
            <div className="font-title text-sm leading-tight text-foreground/80">
              <div>Miguel</div>
              <div>DiLalla</div>
            </div>
          </div>
        )}

        {/* Name on mobile - positioned separately */}
        {isMobile && (
          <div className="border-l border-white/20 pl-4 ml-2 text-center">
            <div className="font-title text-xs leading-tight text-foreground/80">
              <div>Miguel</div>
              <div>DiLalla</div>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}