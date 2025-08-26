'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';

interface EndlessScrollContainerProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  angle?: number; // For diagonal scrolling in degrees
  speed?: number;
  className?: string;
}

export function EndlessScrollContainer({ 
  children, 
  direction = 'horizontal',
  angle = 0,
  speed = 1,
  className = ''
}: EndlessScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current && contentRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        
        setContainerSize({ 
          width: containerRect.width, 
          height: containerRect.height 
        });
        setContentSize({ 
          width: contentRect.width, 
          height: contentRect.height 
        });
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [children]);

  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!isMobile) return;

    const { velocity } = info;
    const velocityThreshold = 100;

    if (direction === 'horizontal') {
      if (Math.abs(velocity.x) > Math.abs(velocity.y) && Math.abs(velocity.x) > velocityThreshold) {
        const currentX = x.get();
        const newX = currentX + info.delta.x * speed;
        
        // Endless scrolling logic
        const maxScroll = contentSize.width - containerSize.width;
        if (newX > 0) {
          x.set(-maxScroll + (newX % maxScroll));
        } else if (newX < -maxScroll) {
          x.set(newX % maxScroll);
        } else {
          x.set(newX);
        }
      }
    } else if (direction === 'vertical') {
      if (Math.abs(velocity.y) > Math.abs(velocity.x) && Math.abs(velocity.y) > velocityThreshold) {
        const currentY = y.get();
        const newY = currentY + info.delta.y * speed;
        
        const maxScroll = contentSize.height - containerSize.height;
        if (newY > 0) {
          y.set(-maxScroll + (newY % maxScroll));
        } else if (newY < -maxScroll) {
          y.set(newY % maxScroll);
        } else {
          y.set(newY);
        }
      }
    } else if (direction === 'diagonal') {
      const angleRad = (angle * Math.PI) / 180;
      const alignedVelocity = velocity.x * Math.cos(angleRad) + velocity.y * Math.sin(angleRad);
      
      if (Math.abs(alignedVelocity) > velocityThreshold) {
        const deltaAligned = info.delta.x * Math.cos(angleRad) + info.delta.y * Math.sin(angleRad);
        const currentX = x.get();
        const currentY = y.get();
        
        const newX = currentX + deltaAligned * Math.cos(angleRad) * speed;
        const newY = currentY + deltaAligned * Math.sin(angleRad) * speed;
        
        x.set(newX);
        y.set(newY);
      }
    }
  }, [direction, angle, speed, isMobile, containerSize, contentSize, x, y]);

  const handleWheel = useCallback((event: WheelEvent) => {
    if (isMobile) return;
    
    event.preventDefault();
    
    if (direction === 'horizontal') {
      const currentX = x.get();
      const newX = currentX - event.deltaX * speed;
      
      const maxScroll = contentSize.width - containerSize.width;
      if (newX > 0) {
        x.set(-maxScroll);
      } else if (newX < -maxScroll) {
        x.set(0);
      } else {
        x.set(newX);
      }
    } else if (direction === 'vertical') {
      const currentY = y.get();
      const newY = currentY - event.deltaY * speed;
      
      const maxScroll = contentSize.height - containerSize.height;
      if (newY > 0) {
        y.set(-maxScroll);
      } else if (newY < -maxScroll) {
        y.set(0);
      } else {
        y.set(newY);
      }
    }
  }, [direction, speed, isMobile, containerSize, contentSize, x, y]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const transform = useTransform(
    [x, y],
    ([xVal, yVal]) => `translate3d(${xVal}px, ${yVal}px, 0)`
  );

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        cursor: direction === 'horizontal' ? 'grab' : 'default'
      }}
    >
      <motion.div
        ref={contentRef}
        drag={isMobile}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onPan={handlePan}
        style={{ 
          transform,
          display: direction === 'horizontal' ? 'flex' : 'block',
          flexDirection: direction === 'horizontal' ? 'row' : undefined,
          width: direction === 'horizontal' ? 'max-content' : '100%',
          height: direction === 'vertical' ? 'max-content' : '100%'
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}