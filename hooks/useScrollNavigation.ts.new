'use client';

import { useEffect, useRef } from 'react';

type NavigationDirection = 'up' | 'down';

interface TouchRef {
  startY: number;
  lastNavigationTime: number;
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

      // Don't handle navigation if we're still in cooldown or if the user was scrolling
      if (now - touchRef.current.lastNavigationTime < cooldownPeriod || touchRef.current.isScrolling) {
        return;
      }

      const scrollingElement = document.scrollingElement || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      
      // Strict boundary detection
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;

      console.log('Touch Debug:', {
        touchDiff,
        isAtTop,
        isAtBottom,
        scrollTop,
        scrollHeight,
        clientHeight,
        isScrolling: touchRef.current.isScrolling
      });

      // Only navigate if we have a significant swipe and we're at a boundary
      if (Math.abs(touchDiff) >= minSwipeDistance) {
        const isSwipingUp = touchDiff > 0;
        const isSwipingDown = touchDiff < 0;

        if ((isSwipingUp && isAtBottom) || (isSwipingDown && isAtTop)) {
          e.preventDefault();
          touchRef.current.lastNavigationTime = now;
          onNavigate(isSwipingUp ? 'down' : 'up');
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
