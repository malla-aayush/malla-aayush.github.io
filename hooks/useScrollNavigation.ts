'use client';

import { useEffect, useRef } from 'react';

type NavigationDirection = 'up' | 'down';

interface TouchRef {
  startY: number;
  lastNavigationTime: number;
  lastScrollTime: number;
  isScrolling: boolean;
  scrollTimeout: NodeJS.Timeout | null;
}

export function useScrollNavigation(
  onNavigate: (direction: NavigationDirection) => void,
  isEnabled: boolean = true
) {
  const touchRef = useRef<TouchRef>({
    startY: 0,
    lastNavigationTime: 0,
    lastScrollTime: 0,
    isScrolling: false,
    scrollTimeout: null
  });

  useEffect(() => {
    if (!isEnabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchRef.current.startY = e.touches[0].clientY;
      touchRef.current.isScrolling = false;
      if (touchRef.current.scrollTimeout) {
        clearTimeout(touchRef.current.scrollTimeout);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      const touchDiff = touchRef.current.startY - e.touches[0].clientY;
      
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;

      // Prevent default only at boundaries to allow normal scrolling elsewhere
      if ((isAtTop && touchDiff < 0) || (isAtBottom && touchDiff > 0)) {
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      touchRef.current.isScrolling = true;
      if (touchRef.current.scrollTimeout) {
        clearTimeout(touchRef.current.scrollTimeout);
      }
      touchRef.current.scrollTimeout = setTimeout(() => {
        touchRef.current.isScrolling = false;
      }, 150);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchRef.current.startY - touchEndY;
      const minSwipeDistance = 60;
      const cooldownPeriod = 500;

      // Get current section
      const homePage = document.querySelector('[data-section="home"]') !== null;
      const aboutPage = document.querySelector('[data-section="about"]') !== null;
      const resumePage = document.querySelector('[data-section="resume"]') !== null;
      const portfolioPage = document.querySelector('[data-section="portfolio"]') !== null;
      const contactPage = document.querySelector('[data-section="contact"]') !== null;
      
      const currentPage = homePage ? 'home' : 
                         aboutPage ? 'about' :
                         resumePage ? 'resume' :
                         portfolioPage ? 'portfolio' :
                         contactPage ? 'contact' : 'unknown';

      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      
      // More lenient boundary detection for mobile
      const topThreshold = 10; // pixels from top
      const bottomThreshold = 10; // pixels from bottom
      const isAtTop = scrollTop <= topThreshold;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= bottomThreshold;
      const isSwipingUp = touchDiff > 0;
      const isSwipingDown = touchDiff < 0;
      const hasSignificantSwipe = Math.abs(touchDiff) >= minSwipeDistance;

      // Debug information
      console.log('Touch Navigation Debug:', {
        page: currentPage,
        swipeDirection: isSwipingUp ? 'up' : 'down',
        swipeDistance: Math.abs(touchDiff),
        isAtTop,
        isAtBottom,
        scrollTop,
        scrollHeight,
        clientHeight,
        touchDiff,
        isScrolling: touchRef.current.isScrolling
      });

      // Reset scrolling state if enough time has passed
      if (now - touchRef.current.lastScrollTime > cooldownPeriod) {
        touchRef.current.isScrolling = false;
      }

      // Don't handle navigation if we're still in cooldown
      if (now - touchRef.current.lastNavigationTime < cooldownPeriod) {
        return;
      }

      // Handle navigation
      if (hasSignificantSwipe) {
        let shouldNavigate = false;

        if (homePage) {
          // On home page, allow swipe up anywhere
          shouldNavigate = isSwipingUp;
        } else {
          // On other pages
          // Allow navigation in both directions when at boundaries
          // Removed the isScrolling check to make it more responsive
          if ((isAtBottom && isSwipingUp) || (isAtTop && isSwipingDown)) {
            shouldNavigate = true;
          }
        }

        if (shouldNavigate) {
          e.preventDefault();
          touchRef.current.lastNavigationTime = now;
          onNavigate(isSwipingUp ? 'down' : 'up');
          console.log('Navigating:', isSwipingUp ? 'down' : 'up');
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;
      const isAtTop = scrollTop <= 0;
      const now = Date.now();

      // Prevent rapid successive wheel events
      if (now - touchRef.current.lastNavigationTime < 500) {
        return;
      }

      if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
        e.preventDefault();
        touchRef.current.lastNavigationTime = now;
        onNavigate(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('scroll', handleScroll);
      if (touchRef.current.scrollTimeout) {
        clearTimeout(touchRef.current.scrollTimeout);
      }
    };
  }, [isEnabled, onNavigate]);
}
