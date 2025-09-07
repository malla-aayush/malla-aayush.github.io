import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

interface ScrollIndicatorProps {
  onClick: () => void;
  className?: string;
}

export function ScrollIndicator({ onClick, className }: ScrollIndicatorProps) {
  return (
    <div 
      className={cn(
        "fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce",
        "z-50 w-8 h-8 flex items-center justify-center",
        "text-gray-400/90 hover:text-cyan-400",
        "transition-colors duration-200",
        className
      )}
      onClick={onClick}
    >
      <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
    </div>
  );
}
