'use client';

import { useEffect } from 'react';
import { useMobile } from '../hooks/useMobile';

/**
 * MobileOptimizations component - Handles global mobile-specific optimizations
 * This component applies mobile-specific settings and behaviors
 */
export default function MobileOptimizations() {
    const mobile = useMobile();

    useEffect(() => {
        // Prevent zoom on double tap for iOS
        if (mobile.isIOS) {
            const preventDefault = (e: TouchEvent) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            };

            let lastTouchEnd = 0;
            const preventDoubleTapZoom = (e: TouchEvent) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            };

            document.addEventListener('touchstart', preventDefault, { passive: false });
            document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

            return () => {
                document.removeEventListener('touchstart', preventDefault);
                document.removeEventListener('touchend', preventDoubleTapZoom);
            };
        }
    }, [mobile.isIOS]);

    useEffect(() => {
        // Add mobile-specific CSS classes to body
        if (mobile.isMobile) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }

        if (mobile.isTouchDevice) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.remove('touch-device');
        }

        // Set viewport height CSS variable for mobile
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        if (mobile.isMobile) {
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);

            return () => {
                window.removeEventListener('resize', setVH);
                window.removeEventListener('orientationchange', setVH);
            };
        }
    }, [mobile.isMobile, mobile.isTouchDevice]);

    // This component doesn't render anything visible
    return null;
}
