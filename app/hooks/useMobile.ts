'use client';

import { useState, useEffect } from 'react';

interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  screenSize: 'sm' | 'md' | 'lg' | 'xl';
  orientation: 'portrait' | 'landscape';
}

export function useMobile(): MobileDetection {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    isIOS: false,
    isAndroid: false,
    screenSize: 'lg',
    orientation: 'landscape'
  });

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window === 'undefined') return;

      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Device detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // OS detection
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      
      // Screen size classification
      let screenSize: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
      if (width < 640) screenSize = 'sm';
      else if (width < 768) screenSize = 'md';
      else if (width < 1024) screenSize = 'lg';
      else screenSize = 'xl';
      
      // Orientation
      const orientation = height > width ? 'portrait' : 'landscape';

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        isIOS,
        isAndroid,
        screenSize,
        orientation
      });
    };

    // Initial check
    checkDevice();

    // Listen for resize events
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return detection;
}

// Utility functions for mobile optimization
export const mobileUtils = {
  // Optimize touch target size
  getTouchTargetSize: (isMobile: boolean) => isMobile ? 'min-h-[44px] min-w-[44px]' : '',
  
  // Get appropriate font sizes
  getFontSize: (size: 'sm' | 'md' | 'lg', isMobile: boolean) => {
    if (!isMobile) return '';
    
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    
    return sizes[size];
  },
  
  // Get appropriate spacing
  getSpacing: (size: 'sm' | 'md' | 'lg', isMobile: boolean) => {
    if (!isMobile) return '';
    
    const spacing = {
      sm: 'p-2',
      md: 'p-4', 
      lg: 'p-6'
    };
    
    return spacing[size];
  },
  
  // Check if should use reduced motion
  shouldReduceMotion: (isMobile: boolean) => {
    if (typeof window === 'undefined') return true;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isMobile || prefersReducedMotion;
  }
};
