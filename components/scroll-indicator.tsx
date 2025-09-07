import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/utils";

interface ScrollIndicatorProps {
  onClick: () => void;
  className?: string;
  direction?: 'up' | 'down';
}

export function ScrollIndicator({ onClick, className, direction = 'down' }: ScrollIndicatorProps) {
  const Icon = direction === 'up' ? ChevronUp : ChevronDown;
  
  return (
    <div 
      className={cn(
        // Positioning
        "fixed left-1/2 -translate-x-1/2 cursor-pointer",
        direction === 'up' ? "top-16 sm:top-8" : "bottom-16 sm:bottom-8",
        "z-50 flex items-center justify-center",
        // Clean arrow design for both mobile and desktop
        "text-gray-400/90 hover:text-cyan-400 transition-colors duration-300 animate-bounce",
        className
      )}
      onClick={onClick}
    >
      <Icon 
        className="w-8 h-8" // Mobile size only since it's hidden on desktop
        strokeWidth={1.5} // Matches the image exactly
      />
    </div>
  );
}

