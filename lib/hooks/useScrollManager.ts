'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Simple scroll position manager that hides page until positioned
 */
export const useScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Find the main scrollable container
    const mainElement = document.querySelector('main');
    if (!mainElement) {
      console.log('Main element not found!');
      return;
    }

    // HIDE the page immediately while we position it
    mainElement.style.visibility = 'hidden';

    // 1. RESTORE: Get saved scroll position for this page
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
    
    if (savedPosition) {
      const scrollTop = parseInt(savedPosition, 10);
      console.log(`Restoring scroll for ${pathname}:`, scrollTop);
      
      if (scrollTop > 0) {
        // Position immediately
        mainElement.scrollTop = scrollTop;
        console.log(`Positioned to:`, mainElement.scrollTop);
      }
    }

    // SHOW the page after positioning (next frame)
    requestAnimationFrame(() => {
      mainElement.style.visibility = 'visible';
      console.log(`Page visible for ${pathname}`);
    });

    // 2. SAVE: Save scroll position when scrolling (throttled)
    let saveTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScroll = mainElement.scrollTop;
      
      // Only save if position is greater than 0
      if (currentScroll > 0) {
        // Throttle saves to avoid too many sessionStorage writes
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          sessionStorage.setItem(`scroll-${pathname}`, currentScroll.toString());
          console.log(`Saved scroll for ${pathname}:`, currentScroll);
        }, 100);
      }
    };

    // 3. LISTEN: Listen to scroll events on the main element
    mainElement.addEventListener('scroll', handleScroll);

    // 4. CLEANUP: Don't save on cleanup since position gets reset
    return () => {
      console.log(`Cleanup for ${pathname} - not saving position`);
      clearTimeout(saveTimeout);
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);
};