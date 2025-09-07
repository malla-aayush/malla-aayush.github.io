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

  const touchRef = useRef({
    startY: 0,
    startTime: 0,
    lastNavigationTime: 0,
  });

  useEffect(() => {
    if (!isEnabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchRef.current.startY = e.touches[0].clientY;
      touchRef.current.startTime = Date.now();
      scrollRef.current.isScrolling = false;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const now = Date.now();
      const touchDuration = now - touchRef.current.startTime;
      const touchDiff = touchRef.current.startY - touchEndY;
      
      // Adjust these values to fine-tune the touch sensitivity
      const minSwipeDistance = 75; // Increased minimum swipe distance
      const maxSwipeDuration = 300; // Maximum time for a swipe to be considered intentional
      const navigationCooldown = 800; // Increased cooldown between navigations

      // Don't process if we're in a navigation cooldown
      if (now - touchRef.current.lastNavigationTime < navigationCooldown) {
        return;
      }

      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      
      // More precise boundary detection with a small threshold
      const threshold = 2;
      const isAtBottom = scrollHeight - scrollTop - clientHeight <= threshold;
      const isAtTop = scrollTop <= threshold;
      const isScrollingPossible = scrollHeight > clientHeight + threshold;

      // Only consider fast, intentional swipes
      const isValidSwipe = 
        Math.abs(touchDiff) >= minSwipeDistance && 
        touchDuration <= maxSwipeDuration &&
        !scrollRef.current.isScrolling;

      // Handle navigation
      if (isValidSwipe) {
        const isMobile = window.innerWidth <= 768;
        const isSwipingUp = touchDiff > 0;
        const isSwipingDown = touchDiff < 0;

        // On mobile with scrollable content
        if (isMobile && isScrollingPossible) {
          if ((isSwipingUp && isAtBottom) || (isSwipingDown && isAtTop)) {
            e.preventDefault();
            touchRef.current.lastNavigationTime = now;
            onNavigate(isSwipingUp ? 'down' : 'up');
          }
          // Allow normal scroll behavior when not at boundaries
          return;
        }

        // On desktop or non-scrollable content, always navigate
        if (!isScrollingPossible || !isMobile) {
          touchRef.current.lastNavigationTime = now;
          onNavigate(isSwipingUp ? 'down' : 'up');
        }
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

      // Use a longer timeout to ensure we capture the end of momentum scrolling
      scrollRef.current.scrollTimeout = setTimeout(() => {
        scrollRef.current.isScrolling = false;
        
        // Store last scroll position for reference
        const scrollingElement = document.scrollingElement || document.documentElement;
        scrollRef.current.lastScrollTop = scrollingElement.scrollTop;
      }, 150);
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
