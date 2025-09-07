'use client';

import { useEffect, useRef } from 'react';

type NavigationDirection = 'up' | 'down';

interface ScrollRef {
  lastScrollTop: number;
  scrollTimeout: NodeJS.Timeout | null;
  isScrolling: boolean;
  lastWheelTime: number;
}

export function useScrollNavigation(
  onNavigate: (direction: NavigationDirection) => void,
  isEnabled: boolean = true
) {
  const scrollRef = useRef<ScrollRef>({
    lastScrollTop: 0,
    scrollTimeout: null,
    isScrolling: false,
    lastWheelTime: 0,
  });

  useEffect(() => {
    if (!isEnabled) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const now = Date.now();
      const touchDiff = touchStartY - touchEndY;
      const minSwipeDistance = 50; // minimum distance for swipe
      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      
      // Calculate exact scroll positions
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
      const isAtTop = scrollTop <= 0;
      const isScrollingPossible = scrollHeight > clientHeight;

      // Check if we're in a mobile viewport
      const isMobile = window.innerWidth <= 768;

      if (!isMobile || !isScrollingPossible) {
        // On desktop or when scrolling isn't possible, use normal navigation
        if (Math.abs(touchDiff) >= minSwipeDistance && now - scrollRef.current.lastWheelTime >= 500) {
          scrollRef.current.lastWheelTime = now;
          onNavigate(touchDiff > 0 ? 'down' : 'up');
        }
        return;
      }

      // On mobile with scrollable content
      if (Math.abs(touchDiff) >= minSwipeDistance) {
        // Check if we should navigate or allow normal scroll
        const shouldNavigateDown = touchDiff > 0 && isAtBottom;
        const shouldNavigateUp = touchDiff < 0 && isAtTop;

        if ((shouldNavigateDown || shouldNavigateUp) && now - scrollRef.current.lastWheelTime >= 500) {
          e.preventDefault();
          scrollRef.current.lastWheelTime = now;
          onNavigate(touchDiff > 0 ? 'down' : 'up');
        }
        // If not at extremes, allow normal scroll behavior
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
      const isAtTop = scrollTop <= 0;
      const isScrollingPossible = scrollHeight > clientHeight;
      const now = Date.now();
      const isMobile = window.innerWidth <= 768;
      
      // Prevent rapid successive wheel events
      if (now - scrollRef.current.lastWheelTime < 500) {
        return;
      }

      // On mobile with scrollable content, only navigate at extremes
      if (isMobile && isScrollingPossible) {
        if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
          e.preventDefault();
          scrollRef.current.lastWheelTime = now;
          
          // Special handling for contact page
          const isContactPage = document.querySelector('[data-section="contact"]') !== null;
          
          if (isAtBottom && isContactPage) {
            // When at bottom of contact page, go to home
            onNavigate('down'); // Using down to trigger the wrap-around logic
          } else {
            onNavigate(e.deltaY > 0 ? 'down' : 'up');
          }
        }
        // Allow normal scroll behavior when not at extremes
        return;
      }

      // On desktop or when content isn't scrollable, use normal navigation
      if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
        e.preventDefault();
        scrollRef.current.lastWheelTime = now;
        onNavigate(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    const handleScroll = () => {
      if (scrollRef.current.scrollTimeout) {
        clearTimeout(scrollRef.current.scrollTimeout);
      }

      scrollRef.current.isScrolling = true;

      scrollRef.current.scrollTimeout = setTimeout(() => {
        scrollRef.current.isScrolling = false;
        
        // Store last scroll position for reference
        const scrollingElement = document.scrollingElement || document.documentElement;
        scrollRef.current.lastScrollTop = scrollingElement.scrollTop;
      }, 100);
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('scroll', handleScroll);
      if (scrollRef.current.scrollTimeout) {
        clearTimeout(scrollRef.current.scrollTimeout);
      }
    };
  }, [isEnabled, onNavigate]);
}
