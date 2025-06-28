'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollManager Component - waits for Next.js routing to complete
 */
const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    // 1. RESTORE scroll position after Next.js routing settles
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
    if (savedPosition) {
      const scrollTop = parseInt(savedPosition, 10);
      if (scrollTop > 0) {
        console.log(`Attempting to restore ${pathname} to:`, scrollTop);
        
        // Try multiple times to fight Next.js resetting
        let attempts = 0;
        const maxAttempts = 5;
        
        const tryRestore = () => {
          attempts++;
          mainElement.scrollTop = scrollTop;
          console.log(`Attempt ${attempts}: Set scroll to ${mainElement.scrollTop}`);
          
          // If it didn't stick and we have attempts left, try again
          if (mainElement.scrollTop !== scrollTop && attempts < maxAttempts) {
            requestAnimationFrame(tryRestore);
          }
        };
        
        // Start trying after a brief delay
        setTimeout(tryRestore, 10);
      }
    }

    // 2. SAVE scroll position when scrolling
    let saveTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScroll = mainElement.scrollTop;
      
      if (currentScroll > 0) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          sessionStorage.setItem(`scroll-${pathname}`, currentScroll.toString());
          console.log(`Saved scroll for ${pathname}:`, currentScroll);
        }, 100);
      }
    };

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(saveTimeout);
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
};

export default ScrollManager;