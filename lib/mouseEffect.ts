"use client";

export function initMouseEffect() {
  if (typeof document === 'undefined') return;

  // Create trail element
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);

  let animationFrame: number;
  let lastX = 0;
  let lastY = 0;
  const smoothFactor = 0.35; // Increased for even faster response

  const updateTrailPosition = (x: number, y: number) => {
    // Smooth interpolation between current and target positions
    lastX += (x - lastX) * smoothFactor;
    lastY += (y - lastY) * smoothFactor;

    trail.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%)`;

    animationFrame = requestAnimationFrame(() => updateTrailPosition(x, y));
  };

  const handleElementMouseMove = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / target.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / target.clientHeight) * 100;
    
    target.style.setProperty('--x', `${x}%`);
    target.style.setProperty('--y', `${y}%`);
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => updateTrailPosition(e.clientX, e.clientY));
  };

  const addHoverEffect = (element: Element) => {
    element.addEventListener('mousemove', handleElementMouseMove as EventListener);
    element.addEventListener('mouseenter', () => {
      trail.classList.add('hovering');
    });
    element.addEventListener('mouseleave', () => {
      element.removeEventListener('mousemove', handleElementMouseMove as EventListener);
      (element as HTMLElement).style.setProperty('--x', '50%');
      (element as HTMLElement).style.setProperty('--y', '50%');
      trail.classList.remove('hovering');
    });
  };

  // Add effect to existing elements
  document.querySelectorAll('a, button, [role="button"]').forEach(addHoverEffect);

  // Add global mouse trail effect
  document.addEventListener('mousemove', handleGlobalMouseMove);

  // Watch for new elements being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.matches('a, button, [role="button"]')) {
            addHoverEffect(node);
          }
          node.querySelectorAll('a, button, [role="button"]').forEach(addHoverEffect);
        }
      });
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
    document.querySelectorAll('a, button, [role="button"]').forEach(element => {
      element.removeEventListener('mousemove', handleElementMouseMove as EventListener);
    });
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    cancelAnimationFrame(animationFrame);
    trail.remove();
  };
}